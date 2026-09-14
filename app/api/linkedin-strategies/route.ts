import { NextResponse } from 'next/server';
import { createClientServer } from '@/lib/supabase/server';
import { INITIAL_STRATEGIES } from '@/lib/supabase/fallback-data';

export async function GET(request: Request) {
  try {
    const supabase = createClientServer();
    const { data, error } = await supabase
      .from('linkedin_strategies')
      .select('*')
      .order('is_pinned', { ascending: false })
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return NextResponse.json({ strategies: INITIAL_STRATEGIES, fallback: true });
    }

    return NextResponse.json({ strategies: data, fallback: false });
  } catch {
    return NextResponse.json({ strategies: INITIAL_STRATEGIES, fallback: true });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const supabase = createClientServer();

    const { data, error } = await supabase
      .from('linkedin_strategies')
      .insert([
        {
          title: body.title,
          category: body.category,
          tags: body.tags || [],
          summary: body.summary,
          content: body.content,
          examples: body.examples || [],
          is_pinned: body.is_pinned || false,
        },
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: error.message, simulated: true, item: { ...body, id: 'strat-' + Date.now() } },
        { status: 200 }
      );
    }

    return NextResponse.json({ strategy: data });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message, simulated: true },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;
    const supabase = createClientServer();

    const { data, error } = await supabase
      .from('linkedin_strategies')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message, simulated: true }, { status: 200 });
    }

    return NextResponse.json({ strategy: data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID requis' }, { status: 400 });

    const supabase = createClientServer();
    const { error } = await supabase.from('linkedin_strategies').delete().eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message, simulated: true });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
