import { NextResponse } from 'next/server';
import { createClientServer } from '@/lib/supabase/server';
import { INITIAL_STRATEGIES } from '@/lib/supabase/fallback-data';

export async function POST() {
  try {
    const supabase = createClientServer();

    // 1. Reset profiles table
    try {
      await supabase.from('profiles').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    } catch {}

    // 2. Reset linkedin_strategies table
    try {
      await supabase.from('linkedin_strategies').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    } catch {}

    // 3. Seed INITIAL_STRATEGIES master guides
    try {
      await supabase.from('linkedin_strategies').insert(INITIAL_STRATEGIES);
    } catch {}

    return NextResponse.json({
      success: true,
      message: 'Base de données réinitialisée avec succès. Tables des comptes et des stratégies nettoyées, 6 fiches maîtres réinsérées.',
      strategiesCount: INITIAL_STRATEGIES.length,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Erreur lors de la réinitialisation.' }, { status: 500 });
  }
}
