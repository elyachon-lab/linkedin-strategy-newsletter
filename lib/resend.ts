import { NewsArticle } from './types';

export interface SendNewsletterOptions {
  to: string;
  subject: string;
  title: string;
  previewText?: string;
  contentMarkdown: string;
  articles: NewsArticle[];
}

export function generateEmailHtml({
  title,
  previewText,
  contentMarkdown,
  articles,
}: {
  title: string;
  previewText?: string;
  contentMarkdown: string;
  articles: NewsArticle[];
}): string {
  const articlesHtml = articles
    .map(
      (art) => `
    <div style="background-color: #f8fafc; border-left: 4px solid #0A66C2; border-radius: 6px; padding: 16px; margin-bottom: 16px;">
      <div style="font-size: 12px; font-weight: 600; color: #0A66C2; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;">
        ${art.category}
      </div>
      <h3 style="margin: 0 0 8px 0; font-size: 16px; color: #0f172a;">
        ${art.url ? `<a href="${art.url}" target="_blank" style="color: #0f172a; text-decoration: underline;">${art.title}</a>` : art.title}
      </h3>
      <p style="margin: 0 0 10px 0; font-size: 14px; color: #475569; line-height: 1.5;">
        ${art.summary}
      </p>
      ${
        art.takeaway
          ? `<div style="font-size: 13px; font-weight: 500; color: #1e293b; background-color: #e2e8f0; padding: 8px 12px; border-radius: 4px;">
              <strong>💡 À retenir :</strong> ${art.takeaway}
            </div>`
          : ''
      }
    </div>
  `
    )
    .join('');

  // Simple Markdown to HTML paragraph conversion
  const parsedMarkdown = contentMarkdown
    .split('\n\n')
    .map((paragraph) => {
      if (paragraph.startsWith('### ')) {
        return `<h3 style="color: #0f172a; font-size: 18px; margin-top: 24px; margin-bottom: 12px;">${paragraph.replace('### ', '')}</h3>`;
      }
      if (paragraph.startsWith('## ')) {
        return `<h2 style="color: #0f172a; font-size: 22px; margin-top: 28px; margin-bottom: 14px;">${paragraph.replace('## ', '')}</h2>`;
      }
      if (paragraph.startsWith('---')) {
        return `<hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 24px 0;" />`;
      }
      return `<p style="color: #334155; font-size: 15px; line-height: 1.6; margin-bottom: 16px;">${paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</p>`;
    })
    .join('');

  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; margin: 0; padding: 20px; color: #334155;">
  <!-- Preview Text -->
  ${previewText ? `<div style="display: none; max-height: 0px; overflow: hidden;">${previewText}</div>` : ''}
  
  <div style="max-width: 640px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
    
    <!-- Header -->
    <div style="background-color: #0A66C2; padding: 32px 24px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">
        ${title}
      </h1>
      <p style="color: #e0f2fe; margin: 8px 0 0 0; font-size: 14px;">
        Curations & Veille Tech Semaine
      </p>
    </div>

    <!-- Main Content -->
    <div style="padding: 32px 24px;">
      ${parsedMarkdown}

      ${
        articles.length > 0
          ? `<h3 style="color: #0f172a; font-size: 18px; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; margin-top: 32px; margin-bottom: 16px;">
              📌 Actualités & Ressources Curation
             </h3>
             ${articlesHtml}`
          : ''
      }
    </div>

    <!-- Footer -->
    <div style="background-color: #f8fafc; padding: 20px 24px; text-align: center; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b;">
      <p style="margin: 0 0 8px 0;">
        Envoyé depuis votre <strong>Centre de Stratégie & Veille Tech</strong>.
      </p>
      <p style="margin: 0;">
        Propulsé par Next.js, Supabase & Resend.
      </p>
    </div>

  </div>
</body>
</html>
  `;
}

export async function sendNewsletterEmail(options: SendNewsletterOptions) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

  const html = generateEmailHtml({
    title: options.title,
    previewText: options.previewText,
    contentMarkdown: options.contentMarkdown,
    articles: options.articles,
  });

  if (!apiKey || apiKey.startsWith('re_123456789')) {
    console.log('Simulating email dispatch via Resend (RESEND_API_KEY not configured)...');
    return {
      success: true,
      simulated: true,
      id: 'sim_' + Math.random().toString(36).substring(2, 9),
      message: 'E-mail simulé avec succès ! Ajoutez votre RESEND_API_KEY réelle dans .env.local pour les envois de production.',
      html,
    };
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [options.to],
      subject: options.subject,
      html,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Échec d\'envoi d\'email via Resend.');
  }

  return {
    success: true,
    simulated: false,
    id: data.id,
    message: 'Newsletter envoyée avec succès via Resend !',
    html,
  };
}
