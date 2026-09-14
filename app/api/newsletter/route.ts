import { NextResponse } from 'next/server';
import { createClientServer } from '@/lib/supabase/server';
import { INITIAL_NEWSLETTERS } from '@/lib/supabase/fallback-data';

export async function GET() {
  try {
    const supabase = createClientServer();
    const { data, error } = await supabase
      .from('newsletter_issues')
      .select('*')
      .order('issue_number', { ascending: false });

    if (error || !data || data.length === 0) {
      return NextResponse.json({ newsletters: INITIAL_NEWSLETTERS, fallback: true });
    }

    return NextResponse.json({ newsletters: data, fallback: false });
  } catch {
    return NextResponse.json({ newsletters: INITIAL_NEWSLETTERS, fallback: true });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const supabase = createClientServer();

    const { data, error } = await supabase
      .from('newsletter_issues')
      .insert([
        {
          issue_number: body.issue_number || 1,
          title: body.title,
          subject_line: body.subject_line,
          preview_text: body.preview_text,
          status: body.status || 'draft',
          content_markdown: body.content_markdown || '',
          articles: body.articles || [],
          sent_at: body.status === 'sent' ? new Date().toISOString() : null,
        },
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: error.message, simulated: true, issue: { ...body, id: 'issue-' + Date.now() } },
        { status: 200 }
      );
    }

    return NextResponse.json({ issue: data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
