import { StrategyCard, NewsletterIssue } from '../types';

export const INITIAL_STRATEGIES: StrategyCard[] = [
  {
    id: 'strat-1',
    title: 'Règle des 3 secondes & Structure du Hook',
    category: 'Hook',
    tags: ['accroche', 'conversion', 'lisibilité', 'scroll-stopper'],
    summary: 'Le hook est la phrase la plus critique de votre publication. Il détermine si l\'utilisateur va cliquer sur "...voir plus" ou continuer de scroller.',
    content: `### Pourquoi le Hook est crucial ?
Sur LinkedIn, le bouton **"...voir plus"** n'apparaît qu'après les 2 ou 3 premières lignes (environ 140-210 caractères selon le format). 

Si vos premières lignes ne suscitent pas immédiatement une impulsion émotionnelle (curiosité, contre-intuition, gain concret), votre post échouera, quelle que soit la qualité du contenu.

### 5 Formules de Hooks à Fort Impact :
1. **La Contre-intuition** : *"J'ai arrêté de poster 5 fois par semaine sur LinkedIn. Voici ce qui s'est passé (+42% de reach)."*
2. **Le Défi Personnel / Résultat** : *"En 90 jours, nous avons généré 120k€ avec 0€ de budget pub. Le guide étape par étape :"*
3. **Le Statu Quo Cassé** : *"Tout le monde vous dit de créer du contenu quotidien. C'est faux. Voici pourquoi."*
4. **La Liste de Ressources Filtrées** : *"9 outils IA que les top 1% des créateurs utilisent (et que vous ne connaissez pas)."*
5. **Le Storytelling Vulnérable** : *"Il y a 6 mois, ma boîte a failli fermer. Voici la leçon à 50 000€ qui a tout changé."*

### À éviter absolument :
- Commencer par *"Je suis ravi d'annoncer que..."* (Zero curiosité)
- Mettre un bonjour ou une formule de politesse en première ligne.
- Ne pas sauter de ligne entre le hook et le corps.`,
    examples: [
      "J'ai analysé 1 000 posts LinkedIn viraux. Voici les 5 règles d'or qui reviennent systématiquement :",
      "Ne lancez PAS votre newsletter avant d'avoir lu ceci (3 erreurs qui coûtent cher).",
      "Comment j'ai gagné 15 000 abonnés en 6 mois sans jamais prospecter par message privé."
    ],
    is_pinned: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'strat-2',
    title: 'Algorithme LinkedIn 2.0 : Les Nouveaux facteurs de Reach',
    category: 'Algorithme',
    tags: ['algorithme', 'reach', 'd dwell time', 'commentaires', 'dwall-time'],
    summary: 'Comprendre comment l\'algorithme classe vos posts : Dwell Time, règles sur les liens externes, et l\'importance primordiale de la 1ère heure.',
    content: `### Les 4 Piliers de l'Algorithme LinkedIn :

1. **Le Dwell Time (Temps de lecture sur le post)** :
   LinkedIn privilégie les contenus qui retiennent l'attention des utilisateurs. Les carrousels (PDF) et les longs textes structurés augmentent mécaniquement le Dwell Time.

2. **La Règle d'or de la Première Heure (Golden Hour)** :
   Les interactions (commentaires de plus de 5 mots, enregistrements, partages) reçues dans les **60 premières minutes** envoient un signal fort à l'algorithme pour élargir le cercle de diffusion.

3. **La Gestion des Liens Externes** :
   *Ne mettez jamais de lien dans le corps du post principal.* LinkedIn pénalise le reach de 30% à 50% car cela fait quitter sa plateforme. 
   **Bonnes pratiques :**
   - Mettez le lien en 1er commentaire (et épinglez-le).
   - Ou utilisez la fonctionnalité "Ajouter un lien sur votre profil".

4. **Les Réponses de l'Auteur** :
   Répondez à TOUS les commentaires sous vos posts dans les 2 premières heures. Chaque réponse prolonge la dynamique du post.`,
    examples: [
      "💡 Astuce : Répondre à un commentaire par une question relance la conversation et double le nombre de commentaires.",
      "⚠️ Attention : Évitez de modifier votre post dans les 10 minutes suivant sa publication (cela réinitialise le score d'évaluation algorithmique)."
    ],
    is_pinned: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'strat-3',
    title: 'Plages Horaires & Jours Optimaux de Publication',
    category: 'Planning',
    tags: ['timing', 'horaires', 'engagement', 'planning', 'semaine'],
    summary: 'Optimiser vos heures de publication selon les habitudes de consultation des professionnels B2B.',
    content: `### Matrice de Publication LinkedIn :

- **Mardi, Mercredi & Jeudi** (Jours Premium) :
  - **07:30 - 08:45** : Avant le début des réunions, durant le trajet domicile-travail.
  - **11:45 - 13:15** : Pause déjeuner.
  - **17:30 - 18:30** : Fin de journée de bureau.

- **Lundi & Vendredi** (Jours Modérés) :
  - Lundi matin : privilégier entre 08:30 et 10:00 (tri des e-mails).
  - Vendredi : privilégier la matinée (08:00 - 11:00). Éviter le vendredi après-midi.

- **Samedi & Dimanche** (Contenu Personal / Inspiration) :
  - Dimanche soir (18:00 - 20:00) : Idéal pour des réflexions stratégiques ou personnelles avant le début de semaine.`,
    examples: [
      "📅 Fréquence idéale : 3 à 4 publications par semaine de haute valeur valent mieux qu'un post quotidien bâclé."
    ],
    is_pinned: false,
    created_at: new Date().toISOString(),
  },
  {
    id: 'strat-4',
    title: 'Format Carrousel PDF : Les Secrets de Conception',
    category: 'Format',
    tags: ['carrousel', 'pdf', 'design', 'canva', 'dwell-time'],
    summary: 'Le format carrousel génère jusqu\'à 3x plus d\'impressions et 5x plus d\'enregistrements que les posts texte simple.',
    content: `### Structure d'un Carrousel Gagnant (8-12 slides) :

1. **Slide 1 (Couverture)** : Titre choc, police très lisible, visuel sobre, promesse forte.
2. **Slide 2 (Le Problème)** : Pourquoi ce sujet est critique pour votre cible.
3. **Slides 3-9 (La Solution étape par étape)** : 1 idée claire par slide. Texte court (max 30-40 mots par slide).
4. **Slide Avant-Dernière (Récapitulatif)** : Résumé visuel sous forme de checklist.
5. **Slide Finale (Call-To-Action)** : Demander d'aimer, de partager, de commenter ou de s'abonner à la newsletter.

### Recommandations Techniques :
- Format carré (1080x1080) ou vertical (1080x1350 px).
- Poids du PDF : Moins de 10 Mo.
- Ratio texte/vide : Laissez 40% d'espace blanc pour aérer la lecture sur smartphone.`,
    examples: [
      "📌 Conseil Canva : Créez une flèche constante vers la droite en bas de slide pour inciter au swipe."
    ],
    is_pinned: false,
    created_at: new Date().toISOString(),
  },
  {
    id: 'strat-5',
    title: 'Stratégie de Commentaires & Pods Naturels',
    category: 'Engagement',
    tags: ['networking', 'commentaires', 'outreach', 'visibilité'],
    summary: 'Comment développer son audience en commentant chez les top créateurs de son industrie.',
    content: `### La Règle des 80/20 de la Visibilité :
80% de votre croissance sur LinkedIn provient des commentaires pertinents que vous laissez sur les posts des autres, pas seulement de vos propres publications.

### La Méthode des "3C" :
1. **Complimenter** : Reconnaître la pertinence du point de l'auteur.
2. **Compléter** : Ajouter un contre-exemple, une anecdote ou un chiffre complémentaire.
3. **Questionner** : Poser une question ouverte pour inciter l'auteur et la communauté à répondre.

### Routine Quotidienne (15 minutes/jour) :
- Commenter 5 à 10 posts de comptes stratégiques dans votre niche avant de poster votre propre contenu.
- Les commentaires apportant une réelle valeur d'expert captent l'attention des profils qualifiés.`,
    examples: [
      "Exemple de mauvais commentaire : 'Super post ! Merci du partage.' (Zero valeur)",
      "Exemple de bon commentaire : 'Point très juste sur l'IA. De notre côté, nous avons remarqué que coupler cela avec de l'A/B testing augmentait le taux de conversion de 18%. Qu'en penses-tu @Auteur ?'"
    ],
    is_pinned: false,
    created_at: new Date().toISOString(),
  }
];

export const INITIAL_NEWSLETTERS: NewsletterIssue[] = [
  {
    id: 'issue-1',
    issue_number: 1,
    title: 'Veille Tech #01 - L\'IA dans les workflows créatifs & les nouveautés Next.js 14',
    subject_line: '⚡ Veille Tech #01 : Les pépites de la semaine & l\'IA créative',
    preview_text: 'Découvrez les dernières avancées IA, les bonnes pratiques de prompt engineering et notre dossier LinkedIn.',
    status: 'sent',
    content_markdown: `Bienvenue dans cette 1ère édition de notre Newsletter de Veille Tech ! 🚀

Cette semaine, nous décryptons les évolutions majeures du secteur tech, le déploiement des agents IA autonomes et nos retours d'expérience sur la création de contenu B2B.

---

### 📰 Au Sommaire de cette semaine :
1. **IA & Web** : Les nouveaux modèles de génération de code et d'interfaces.
2. **Next.js & Supabase** : Pourquoi ce stack est devenu le standard indiscutable pour les projets SaaS.
3. **LinkedIn Growth** : Comment structurer son hook pour multiplier par 3 l'engagement.

---

Bonne lecture et excellente semaine !`,
    articles: [
      {
        id: 'art-1',
        title: 'OpenAI GPT-4o & Les interfaces génératives',
        url: 'https://openai.com',
        category: 'IA & Tech',
        summary: 'Présentation des nouvelles capacités multimédias en temps réel et de la baisse des coûts API.',
        takeaway: 'L\'intégration de LLM dans les applications SaaS devient un incontournable pour l\'expérience utilisateur.'
      },
      {
        id: 'art-2',
        title: 'Supabase SSR & Next.js App Router',
        url: 'https://supabase.com',
        category: 'Outillage',
        summary: 'Guide complet sur l\'authentification basée sur les cookies et la synchronisation du state serveur.',
        takeaway: 'Adopter `@supabase/ssr` permet une gestion parfaite des sessions sur les composants serveur Next.js.'
      }
    ],
    sent_at: '2026-09-10T10:00:00Z',
    created_at: '2026-09-08T14:30:00Z'
  },
  {
    id: 'issue-2',
    issue_number: 2,
    title: 'Veille Tech #02 - Optimisation des performances Web Vitals & Stratégie Content',
    subject_line: '📦 Veille Tech #02 : Optimiser vos apps & booster votre reach LinkedIn',
    preview_text: 'Au programme : Core Web Vitals 2026, stratégie carrousel PDF et sélection d\'outils dev.',
    status: 'draft',
    content_markdown: `Bienvenue dans la 2ème édition de notre newsletter !

Dans ce numéro, nous faisons le point sur la performance frontend et les règles de classement des moteurs de recherche et des réseaux professionnels.

---

### 💡 À ne pas manquer :
- **Optimisation LCP / CLS** : Les réflexes pour maintenir votre score Lighthouse à 100/100.
- **LinkedIn Strategy** : Anatomie d'un carrousel à 500k impressions.

N'hésitez pas à nous envoyer vos retours !`,
    articles: [
      {
        id: 'art-3',
        title: 'Core Web Vitals & INP (Interaction to Next Paint)',
        url: 'https://web.dev',
        category: 'Étude & Dataviz',
        summary: 'Analyse de l\'impact du temps de réponse UI sur la rétention des utilisateurs.',
        takeaway: 'Réduire le JavaScript bloquant au démarrage est la priorité n°1 pour une expérience fluide.'
      }
    ],
    sent_at: null,
    created_at: new Date().toISOString()
  }
];
