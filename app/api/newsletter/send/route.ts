import { NextResponse } from 'next/server';
import { sendNewsletterEmail } from '@/lib/resend';
import { createClientServer } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const { to, issue } = await request.json();

    if (!to || !issue) {
      return NextResponse.json({ error: 'Champs requis manquants.' }, { status: 400 });
    }

    const result = await sendNewsletterEmail({
      to,
      subject: issue.subject_line || issue.title || 'Newsletter Tech',
      title: issue.title || 'Newsletter Tech',
      previewText: issue.preview_text,
      contentMarkdown: issue.content_markdown || '',
      articles: issue.articles || [],
    });

    // Update status in Supabase if issue.id exists
    if (issue.id && !issue.id.startsWith('issue-')) {
      try {
        const supabase = createClientServer();
        await supabase
          .from('newsletter_issues')
          .update({ status: 'sent', sent_at: new Date().toISOString() })
          .eq('id', issue.id);
      } catch {
        // Ignored if offline
      }
    }

    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Erreur lors de l\'envoi.' }, { status: 500 });
  }
}
