import { NextResponse } from 'next/server';
import { AIAuditResult } from '@/lib/types';

function autoDetectIndustry(textToAnalyze: string): string {
  const text = textToAnalyze.toLowerCase();

  if (/rh|recrut|hr|talent|people|drh|headhunter|staffing|hiring|job|carri/i.test(text)) {
    return 'RH & Recrutement';
  }
  if (/tech|saas|software|dev|developer|cto|code|ia|ai|data|cyber|cloud|product|eng/i.test(text)) {
    return 'SaaS & Tech';
  }
  if (/market|growth|seo|content|media|brand|cmo|digital|pub|acquisition|copywrit/i.test(text)) {
    return 'Marketing & Growth';
  }
  if (/finan|fintech|bank|invest|vc|fund|compta|tréso|impo|assurance|trader/i.test(text)) {
    return 'FinTech & Finance';
  }
  if (/ecom|retail|shop|boutique|vente|d2c|logist|store/i.test(text)) {
    return 'E-Commerce & Retail';
  }
  if (/conseil|consult|adviso|agency|agence|stratég|freelance|coach/i.test(text)) {
    return 'Conseil & Consulting';
  }
  if (/immo|estate|property|fonci|logement/i.test(text)) {
    return 'Immobilier';
  }
  if (/sant|med|health|pharma|bio|clinic|docteur/i.test(text)) {
    return 'Santé & MedTech';
  }
  if (/creator|créat|youtube|podcast|influenc|design|art|video/i.test(text)) {
    return 'Création de Contenu';
  }

  return 'SaaS & Tech';
}

export async function POST(request: Request) {
  try {
    const { username, fullName, role, followerCount, industry: userProvidedIndustry } = await request.json();

    const count = parseInt(followerCount) || 2500;

    // AI Auto-Detection of Industry
    const combinedText = `${username || ''} ${fullName || ''} ${role || ''}`;
    const detectedIndustry = userProvidedIndustry || autoDetectIndustry(combinedText);

    let score = 84;
    if (count > 5000) score += 5;
    if (count > 20000) score += 6;

    const auditResult: AIAuditResult = {
      score: Math.min(98, score),
      industry: detectedIndustry,
      audienceTier: count < 2000 ? 'Émergent (< 2k abonnés)' : count < 10000 ? 'En Croissance (2k - 10k abonnés)' : 'Influenceur B2B (> 10k abonnés)',
      tailoredHooks: [
        `"Comment nous avons résolu [Problème Majeur en ${detectedIndustry}] en 30 jours sans augmenter notre budget."`,
        `"90% des professionnels en ${detectedIndustry} commettent encore cette erreur. Voici comment l'éviter :"`,
        `"J'ai analysé les 5 meilleures campagnes B2B en ${detectedIndustry}. Voici les 3 règles d'or à copier immédiatement :"`
      ],
      formatStrategy: count < 5000
        ? `Secteur ${detectedIndustry} : Privilégiez 2 carrousels PDF verticaux (1080x1350 px) par semaine pour maximiser le Dwell Time + 2 posts texte avec storytelling personnel.`
        : `Secteur ${detectedIndustry} : Publiez 3 carrousels d'analyse sectorielle approfondie + 1 vidéo short de 60s et 1 sondage interactif par semaine.`,
      bestPostingWindows: [
        'Mardi à 07h45 (Avant le premier café)',
        'Mercredi à 12h15 (Pause déjeuner sectorielle)',
        'Jeudi à 17h45 (Fin de journée)'
      ],
      recommendedHashtags: [
        `#${detectedIndustry.replace(/[^a-zA-Z0-9]/g, '')}`,
        '#LinkedInB2B',
        '#GrowthStrategy',
        '#ContentMarketing'
      ],
      growthActionPlan: [
        `1. Repositionnez votre titre de profil : "J'aide [Cible ${detectedIndustry}] à obtenir [Résultat] grâce à [Méthode]".`,
        '2. Rédigez le 1er commentaire sous vos posts avec le lien direct vers votre produit/newsletter.',
        '3. Engagez-vous en laissant 5 commentaires à forte valeur chez les décideurs de votre secteur avant de publier.'
      ]
    };

    return NextResponse.json({
      success: true,
      detectedIndustry,
      auditResult
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Erreur d\'audit IA' }, { status: 500 });
  }
}
