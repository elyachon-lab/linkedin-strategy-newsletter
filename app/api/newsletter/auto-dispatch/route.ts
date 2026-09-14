import { NextResponse } from 'next/server';
import { createClientServer } from '@/lib/supabase/server';
import { sendNewsletterEmail } from '@/lib/resend';
import { INITIAL_NEWSLETTERS, INITIAL_SUBSCRIBERS } from '@/lib/supabase/fallback-data';

export async function POST(request: Request) {
  try {
    const supabase = createClientServer();

    // 1. Fetch active subscribers from Supabase (or fallback)
    let subscribersList = INITIAL_SUBSCRIBERS.map((s) => s.email);
    try {
      const { data: dbSubs, error: subErr } = await supabase
        .from('newsletter_subscribers')
        .select('email')
        .eq('status', 'active');

      if (!subErr && dbSubs && dbSubs.length > 0) {
        subscribersList = dbSubs.map((s) => s.email);
      }
    } catch {
      // Use fallback subscribers
    }

    // 2. Fetch latest issue or use active tech watch issue
    let targetIssue = INITIAL_NEWSLETTERS[0];
    try {
      const { data: dbIssues, error: issueErr } = await supabase
        .from('newsletter_issues')
        .select('*')
        .order('issue_number', { ascending: false })
        .limit(1);

      if (!issueErr && dbIssues && dbIssues.length > 0) {
        targetIssue = dbIssues[0];
      }
    } catch {
      // Use fallback issue
    }

    // 3. Dispatch newsletter email to all registered subscribers
    const dispatchResults = [];
    for (const email of subscribersList) {
      const res = await sendNewsletterEmail({
        to: email,
        subject: targetIssue.subject_line || targetIssue.title,
        title: targetIssue.title,
        previewText: targetIssue.preview_text,
        contentMarkdown: targetIssue.content_markdown || '',
        articles: targetIssue.articles || [],
      });
      dispatchResults.push({ email, status: res.success ? 'sent' : 'failed' });
    }

    // 4. Update status in Supabase if issue exists
    try {
      await supabase
        .from('newsletter_issues')
        .update({ status: 'sent', sent_at: new Date().toISOString() })
        .eq('id', targetIssue.id);
    } catch {}

    return NextResponse.json({
      success: true,
      message: `Envoi automatique exécuté avec succès vers ${subscribersList.length} abonné(s) !`,
      issueTitle: targetIssue.title,
      totalRecipients: subscribersList.length,
      recipients: subscribersList,
      dispatchedAt: new Date().toISOString(),
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Erreur lors de l\'envoi automatique.' }, { status: 500 });
  }
}

export async function GET() {
  return POST(new Request('https://localhost/api/newsletter/auto-dispatch'));
}
