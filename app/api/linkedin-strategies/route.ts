import { NextResponse } from 'next/server';
import { createClientServer } from '@/lib/supabase/server';
import { INITIAL_STRATEGIES } from '@/lib/supabase/fallback-data';

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'LinkedIn_Pro2026!Secured';

function verifyAdminPermission(request: Request, body?: any): boolean {
  const headerPass = request.headers.get('x-admin-password');
  const bodyPass = body?.adminPassword;
  return headerPass === ADMIN_PASSWORD || bodyPass === ADMIN_PASSWORD;
}

function checkArticleSimilarity(
  newTitle: string,
  existingArticles: Array<{ title: string; summary?: string }>
): { isSimilar: boolean; matchingTitle?: string } {
  const normalize = (str: string) =>
    (str || '').toLowerCase().replace(/[^a-z0-9àâçéèêëîïôûùüÿñæœ]/gi, ' ').trim();

  const cleanNewTitle = normalize(newTitle);
  const wordsNew = new Set(cleanNewTitle.split(/\s+/).filter((w) => w.length > 3));

  for (const art of existingArticles) {
    const cleanExistingTitle = normalize(art.title);

    // Exact or direct inclusion match
    if (cleanNewTitle === cleanExistingTitle) {
      return { isSimilar: true, matchingTitle: art.title };
    }

    // Keyword overlap similarity check
    const wordsExisting = new Set(cleanExistingTitle.split(/\s+/).filter((w) => w.length > 3));
    if (wordsNew.size > 0 && wordsExisting.size > 0) {
      let intersection = 0;
      wordsNew.forEach((w) => {
        if (wordsExisting.has(w)) intersection++;
      });
      const minLength = Math.min(wordsNew.size, wordsExisting.size);
      if (intersection / minLength >= 0.75) {
        return { isSimilar: true, matchingTitle: art.title };
      }
    }
  }

  return { isSimilar: false };
}

export async function GET() {
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

    // 1. Admin authorization guard
    if (!verifyAdminPermission(request, body)) {
      return NextResponse.json(
        { error: 'Accès refusé : Seul un administrateur authentifié peut créer ou publier des articles.' },
        { status: 403 }
      );
    }

    // 2. Anti-duplication / similarity check against existing articles
    const supabase = createClientServer();
    let existingList = INITIAL_STRATEGIES;
    try {
      const { data: dbData } = await supabase.from('linkedin_strategies').select('title, summary');
      if (dbData && dbData.length > 0) existingList = dbData as any;
    } catch {}

    const similarityCheck = checkArticleSimilarity(body.title || '', existingList);
    if (similarityCheck.isSimilar) {
      return NextResponse.json(
        {
          error: `⚠️ Article similaire détecté ("${similarityCheck.matchingTitle}"). Afin d'éviter la réplication, modifiez le titre ou l'angle de votre article.`,
          isDuplicate: true,
        },
        { status: 400 }
      );
    }

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

    // Admin authorization guard
    if (!verifyAdminPermission(request, body)) {
      return NextResponse.json(
        { error: 'Accès refusé : Seul un administrateur authentifié peut modifier les articles du site.' },
        { status: 403 }
      );
    }

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
    // Admin authorization guard
    if (!verifyAdminPermission(request)) {
      return NextResponse.json(
        { error: 'Accès refusé : Seul un administrateur peut supprimer un article du site.' },
        { status: 403 }
      );
    }

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
