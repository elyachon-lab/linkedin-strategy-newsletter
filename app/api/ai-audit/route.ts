import { NextResponse } from 'next/server';
import { AIAuditResult } from '@/lib/types';

export async function POST(request: Request) {
  try {
    const { username, fullName, industry, role, followerCount } = await request.json();

    const count = parseInt(followerCount) || 1000;
    const cleanIndustry = industry || 'SaaS & Tech';

    // Sector-based intelligence customization
    let score = 82;
    if (count > 5000) score += 6;
    if (count > 20000) score += 7;

    const auditResult: AIAuditResult = {
      score: Math.min(98, score),
      industry: cleanIndustry,
      audienceTier: count < 2000 ? 'Émergent (< 2k abonnés)' : count < 10000 ? 'En Croissance (2k - 10k abonnés)' : 'Influenceur B2B (> 10k abonnés)',
      tailoredHooks: [
        `"Comment nous avons résolu [Problème Majeur en ${cleanIndustry}] en 30 jours sans augmenter notre budget."`,
        `"90% des professionnels en ${cleanIndustry} commettent encore cette erreur. Voici comment l'éviter :"`,
        `"J'ai analysé les 5 meilleures campagnes B2B en ${cleanIndustry}. Voici les 3 règles d'or à copier immédiatement :"`
      ],
      formatStrategy: count < 5000
        ? 'Privilégiez 2 carrousels PDF verticaux (1080x1350 px) par semaine pour maximiser le Dwell Time + 2 posts texte avec storytelling personnel.'
        : 'Publiez 3 carrousels d\'analyse sectorielle approfondie + 1 vidéo short de 60s et 1 sondage interactif par semaine.',
      bestPostingWindows: [
        'Mardi à 07h45 (Avant le premier café)',
        'Mercredi à 12h15 (Pause déjeuner sectorielle)',
        'Jeudi à 17h45 (Fin de journée)'
      ],
      recommendedHashtags: [
        `#${cleanIndustry.replace(/[^a-zA-Z0-9]/g, '')}`,
        '#LinkedInB2B',
        '#GrowthStrategy',
        '#ContentMarketing'
      ],
      growthActionPlan: [
        `1. Repositionnez votre titre de profil : "J'aide [Cible ${cleanIndustry}] à obtenir [Résultat] grâce à [Méthode]".`,
        '2. Rédigez le 1er commentaire sous vos posts avec le lien direct vers votre produit/newsletter.',
        '3. Engagez-vous en laissant 5 commentaires à forte valeur chez les décideurs de votre secteur avant de publier.'
      ]
    };

    return NextResponse.json({ success: true, auditResult });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Erreur d\'audit IA' }, { status: 500 });
  }
}
