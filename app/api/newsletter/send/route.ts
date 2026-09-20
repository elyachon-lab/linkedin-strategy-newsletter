import { NextResponse } from 'next/server';
import { sendNewsletterEmail } from '@/lib/resend';
import { createClientServer } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const { to, issue } = await request.json();

    if (!issue) {
      return NextResponse.json({ error: 'Champs requis manquants (issue).' }, { status: 400 });
    }

    let recipients: string[] = [];

    if (Array.isArray(to)) {
      recipients = to;
    } else if (to === 'all' || to === 'all_subscribers' || !to) {
      // Retrieve subscribers from Supabase or fallback
      recipients = ['subscriber@exemple.com'];
      try {
        const supabase = createClientServer();
        const { data } = await supabase.from('newsletter_subscribers').select('email');
        if (data && data.length > 0) {
          recipients = data.map((s: { email: string }) => s.email);
        }
      } catch {
        // Fallback recipient list
      }
    } else {
      recipients = [to];
    }

    const results = [];
    for (const recipient of recipients) {
      const res = await sendNewsletterEmail({
        to: recipient,
        subject: issue.subject_line || issue.title || 'Newsletter Bible LinkedIn',
        title: issue.title || 'Newsletter Bible LinkedIn',
        previewText: issue.preview_text,
        contentMarkdown: issue.content_markdown || '',
        articles: issue.articles || [],
      });
      results.push(res);
    }

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

    return NextResponse.json({
      success: true,
      recipientCount: recipients.length,
      results,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Erreur lors de l\'envoi.' }, { status: 500 });
  }
}
