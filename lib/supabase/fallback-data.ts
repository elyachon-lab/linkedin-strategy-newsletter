import { StrategyCard, NewsletterIssue } from '../types';

export const INITIAL_STRATEGIES: StrategyCard[] = [
  {
    id: 'strat-1',
    title: 'Guide Master : L\'Algorithme LinkedIn 2026 & le Score SSI',
    category: 'Algorithme',
    tags: ['algorithme', 'reach', 'ssi', 'dwell time', 'golden hour'],
    summary: 'Comprendre précisément comment l\'algorithme classe vos posts : Dwell Time, règles d\'interaction dans la Golden Hour et calcul de l\'index SSI.',
    content: `### Les 4 Piliers Fondamentaux de l'Algorithme LinkedIn 2026 :

1. **Le Dwell Time (Temps de rétention)** :
   LinkedIn valorise avant tout le temps passé par un utilisateur sur votre post. Les carrousels PDF cliquables et les textes aérés avec des pépites à forte valeur augmentent mécaniquement cette métrique.

2. **La Règle d'Or de la Golden Hour (La 1ère Heure)** :
   Les signaux d'engagement reçus dans les **60 premières minutes** (commentaires qualifiés de plus de 5 mots, partages avec texte, enregistrements) déclenchent la diffusion du post auprès du 2ème et 3ème cercle.

3. **La Pénalisation des Liens Externes dans le Corps de Post** :
   Insérer un lien externe dans le corps du texte réduit le reach de 35% à 50%. La stratégie validée consiste à placer les liens exclusivement dans le **1er commentaire** ou commentaire épinglé.

4. **Le Social Selling Index (SSI)** :
   Votre score SSI (sur 100) détermine votre coefficient de distribution de départ. Plus votre SSI est élevé, plus le premier palier d'affichage de votre post est large.`,
    examples: [
      "💡 Astuce : Répondre à un commentaire par une question relance la conversation et prolonge la distribution sur 48h.",
      "⚠️ Attention : Évitez d'éditer votre post dans les 10 minutes suivant sa publication (réinitialisation de l'évaluation)."
    ],
    is_pinned: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'strat-2',
    title: 'Le Format Carrousel PDF (4:5) & Optimisation du Dwell Time',
    category: 'Format',
    tags: ['carrousel', 'pdf', 'dwell time', 'design', 'conversion'],
    summary: 'Le carrousel PDF génère jusqu\'à 3x plus d\'impressions et 5x plus d\'enregistrements qu\'un simple post texte.',
    content: `### Architecture d'un Carrousel PDF Virant (8 à 12 slides) :

1. **Slide 1 (La Couverture)** : Titre provocateur ou ultra-spécifique, typographie XXL, contrastes forts.
2. **Slide 2 (Le Problème / Constat)** : Expliciter la douleur ou la fausse croyance de votre cible.
3. **Slides 3 à 9 (La Méthodologie pas-à-pas)** : 1 seule idée claire par slide. Moins de 30 mots par visuel.
4. **Slide Avant-Dernière (La Récapitulatif / Checklist)** : Résumé condensé prêt à être screenshoté.
5. **Slide Finale (Call-to-Action)** : Inviter explicitement à commenter, enregistrer le post ou s'abonner.

### Spécifications Techniques Optimales :
- **Dimensions** : 1080 x 1350 px (format vertical 4:5) pour occuper plus d'espace sur l'écran smartphone.
- **Poids** : Moins de 10 Mo en format PDF.
- **Indicateur de balayage** : Ajoutez une flèche visuelle au bas de chaque slide pour inciter au swipe.`,
    examples: [
      "📌 Pensez à ajouter un rappel 'Enregistrez ce carrousel pour le consulter plus tard' sur la dernière slide."
    ],
    is_pinned: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'strat-3',
    title: 'Les 10 Formules d\'Accroches (Hooks) B2B Infaillibles',
    category: 'Hook',
    tags: ['accroche', 'hook', 'conversion', 'lisibilité', 'scroll-stopper'],
    summary: 'Le hook détermine si l\'utilisateur va cliquer sur "...voir plus" ou continuer de scroller. 80% du succès d\'un post dépend des 3 premières lignes.',
    content: `### Pourquoi le Hook est la clé de voûte de votre portée ?
Sur LinkedIn, le bouton **"...voir plus"** s'intercale après les 140 à 210 premiers caractères. Si votre phrase d'ouverture n'éveille pas une émotion immédiate, 80% des utilisateurs passeront leur chemin.

### 5 Formules de Hooks à Fort Taux d'Ouverture :
1. **La Contre-intuition** : *"J'ai arrêté de poster 5 fois par semaine sur LinkedIn. Voici ce qui s'est passé (+42% d'impressions)."*
2. **Le Résultat Chiffré** : *"En 90 jours, nous avons généré 120k€ avec 0€ de budget pub. Le guide étape par étape :"*
3. **Le Statu Quo Cassé** : *"Tout le monde vous dit de créer du contenu quotidien. C'est la pire erreur B2B. Voici pourquoi."*
4. **La Curation d'Outils** : *"9 outils IA que les top 1% des créateurs utilisent en secret (et qui vous font gagner 10h/semaine)."*
5. **Le Storytelling de Crise** : *"Il y a 6 mois, mon entreprise a failli fermer. Voici la leçon à 50 000€ qui a tout changé."*

### 💡 Règles de Formatage :
- Pas de formules de politesse ("Bonjour à tous") en première ligne.
- Saut de ligne obligatoire après la phrase choc.
- 8 à 12 mots maximum sur la première ligne pour être parfaitement lisible sur mobile.`,
    examples: [
      "J'ai analysé 1 000 posts LinkedIn viraux. Voici les 5 règles d'or qui reviennent systématiquement :",
      "Ne lancez PAS votre newsletter avant d'avoir lu ceci (3 erreurs qui coûtent très cher)."
    ],
    is_pinned: false,
    created_at: new Date().toISOString(),
  },
  {
    id: 'strat-4',
    title: 'Matrice Éditoriale & Horaires Stratégiques B2B',
    category: 'Planning',
    tags: ['timing', 'horaires', 'planning', 'audience', 'engagement'],
    summary: 'Analyse des fenêtres de tir stratégiques et de la cadence de publication optimale pour maximiser la visibilité auprès des décideurs B2B.',
    content: `### Le Calendrier Stratégique de Publication B2B :

- **Mardi, Mercredi & Jeudi (Les Jours Champions B2B)** :
  - **07:30 - 08:45** : Avant les réunions, pendant les transports. Taux d'ouverture maximal.
  - **11:45 - 13:15** : Pause déjeuner. Moment privilégié pour les carrousels et articles synthétiques.
  - **17:30 - 18:30** : Fin de journée de bureau.

- **Lundi & Vendredi (Jours Intermédiaires)** :
  - Lundi matin : privilégier entre 08:30 et 10:00 (après le dépouillement des e-mails).
  - Vendredi : privilégier la matinée (08:00 - 11:00). Éviter l'après-midi.

- **Dimanche soir (Fenêtre Reflexion & Storytelling)** :
  - Dimanche (18:00 - 20:30) : Excellent créneau pour le storytelling d'entrepreneur, les bilans de semaine et réflexions.`,
    examples: [
      "📅 Fréquence recommandée : 2 à 3 publications de haute valeur par semaine valent mieux que 7 posts sans saveur."
    ],
    is_pinned: false,
    created_at: new Date().toISOString(),
  },
  {
    id: 'strat-5',
    title: 'Optimisation de Profil Client-Centric & Conversion 1er Commentaire',
    category: 'Copywriting',
    tags: ['profil', 'bio', 'titre', 'liens', 'conversion'],
    summary: 'Transformer votre profil LinkedIn d\'un simple CV en une page de vente haute conversion centrée sur le bénéfice client.',
    content: `### La Formule du Titre de Profil HAUTE CONVERSION :
Évitez les intitulés génériques ("Manager chez Company"). Utilisez la structure :
**"J'aide [Cible] à [Résultat désiré] grâce à [Méthode / Solution]"**.

### La Stratégie du 1er Commentaire :
Pour contourner la pénalisation des liens externes :
1. Rédigez votre post de manière 100% native (texte + carrousel).
2. Ajoutez à la fin du post : *"🔗 Lien d'accès complet disponible dans le 1er commentaire !"*.
3. Publiez le post, puis commentez immédiatement avec le lien et la description.
4. Épinglez le commentaire.`,
    examples: [
      "Titre recommandé : 'J'aide les fondateurs SaaS B2B à passer de 10k€ à 100k€ MRR grâce au Social Selling LinkedIn.'"
    ],
    is_pinned: false,
    created_at: new Date().toISOString(),
  },
  {
    id: 'strat-6',
    title: 'Méthode Inbound Social Selling & Prospection Douce',
    category: 'Engagement',
    tags: ['social selling', 'inbound', 'prospection', 'commentaires', 'networking'],
    summary: 'Comment attirer des prospects qualifiés sur votre profil sans envoyer de messages de prospection à froid intempestifs.',
    content: `### La Méthode des 3C pour vos Commentaires :
80% de votre visibilité découle des commentaires laissés sous les posts d'acteurs de votre marché.
1. **Complimenter** : Saluer la pertinence de l'analyse.
2. **Compléter** : Apporter une donnée chiffrée ou un contre-exemple constructif.
3. **Questionner** : Poser une question ouverte incitant l'auteur et la communauté à répondre.

### La Prospection Douce en 3 Étapes :
1. Identifiez vos prospects cibles.
2. Laissez 2 ou 3 commentaires qualifiés sur leurs publications pendant 2 semaines.
3. Envoyez un message privé contextualisé uniquement APRÈS ces interactions.`,
    examples: [
      "Exemple de message privé doux : 'Bonjour [Prénom], j'ai adoré votre réflexion sur [Sujet]. De notre côté, nous observons [Donnée]. Au plaisir d'échanger !'"
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

export const INITIAL_SUBSCRIBERS = [
  { id: 'sub-1', email: 'abonne.tech@exemple.com', status: 'active', created_at: new Date().toISOString() },
  { id: 'sub-2', email: 'contact.growth@entreprise.com', status: 'active', created_at: new Date().toISOString() },
  { id: 'sub-3', email: 'dev.lead@societe.fr', status: 'active', created_at: new Date().toISOString() }
];
