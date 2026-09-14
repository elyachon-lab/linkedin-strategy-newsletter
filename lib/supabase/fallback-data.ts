import { StrategyCard, NewsletterIssue } from '../types';

export const INITIAL_STRATEGIES: StrategyCard[] = [
  {
    id: 'strat-1',
    title: 'Règle des 3 secondes & Structure du Hook',
    category: 'Hook',
    tags: ['accroche', 'conversion', 'lisibilité', 'scroll-stopper'],
    summary: 'Le hook est la phrase la plus critique de votre publication. Il détermine si l\'utilisateur va cliquer sur "...voir plus" ou continuer de scroller.',
    content: `### Pourquoi le Hook est la clé de voûte de votre portée ?
Sur LinkedIn, le bouton **"...voir plus"** s'intercale après les 140 à 210 premiers caractères (selon l'écran). Si votre phrase d'ouverture n'éveille pas une émotion immédiate (curiosité, rupture de croyance, gain concret), 80% des utilisateurs passeront leur chemin sans lire votre contenu.

### 5 Formules de Hooks Infaillibles :
1. **La Contre-intuition** : *"J'ai arrêté de poster 5 fois par semaine sur LinkedIn. Voici ce qui s'est passé (+42% d'impressions)."*
2. **Le Résultat Chiffré** : *"En 90 jours, nous avons généré 120k€ avec 0€ de budget pub. Le guide étape par étape :"*
3. **Le Statu Quo Cassé** : *"Tout le monde vous dit de créer du contenu quotidien. C'est la pire erreur B2B. Voici pourquoi."*
4. **La Curation d'Outils** : *"9 outils IA que les top 1% des créateurs utilisent en secret (et qui vous font gagner 10h/semaine)."*
5. **Le Storytelling de Crise** : *"Il y a 6 mois, mon entreprise a failli fermer. Voici la leçon à 50 000€ qui a tout changé."*

### 💡 Les Règles d'Or du Formatage :
- Ne mettez JAMAIS de politesse ("Bonjour à tous", "Ravi de vous retrouver") en première ligne.
- Laissez une ligne vide entre votre hook et votre première phrase explicative.
- Limitez la première ligne à 8-12 mots maximum pour être lisible sur mobile.`,
    examples: [
      "J'ai analysé 1 000 posts LinkedIn viraux. Voici les 5 règles d'or qui reviennent systématiquement :",
      "Ne lancez PAS votre newsletter avant d'avoir lu ceci (3 erreurs qui coûtent très cher).",
      "Comment j'ai gagné 15 000 abonnés qualifiés en 6 mois sans jamais démarcher en MP."
    ],
    is_pinned: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'strat-2',
    title: 'Algorithme LinkedIn 2.0 : Les Nouveaux Facteurs de Reach',
    category: 'Algorithme',
    tags: ['algorithme', 'reach', 'dwell time', 'commentaires', 'golden hour'],
    summary: 'Comprendre précisément comment l\'algorithme classe vos posts : Dwell Time, règles strictes sur les liens externes, et l\'importance absolue de la 1ère heure.',
    content: `### Les 4 Piliers Fondamentaux de l'Algorithme :

1. **Le Dwell Time (Temps de rétention sur la publication)** :
   LinkedIn valorise avant tout le temps passé par un utilisateur sur votre post. Les carrousels PDF cliquables et les textes aérés avec des pépites à forte valeur augmentent mécaniquement cette métrique.

2. **La Règle d'Or de la Golden Hour (La 1ère Heure)** :
   Les signaux d'engagement reçus dans les **60 premières minutes** (commentaires de plus de 5 mots, partages avec texte, enregistrements) déclenchent la diffusion du post auprès du 2ème et 3ème cercle de votre réseau.

3. **La Pénalisation des Liens Externes** :
   LinkedIn souhaite conserver ses utilisateurs sur sa plateforme. Placer un lien vers un site externe dans le corps du post réduit la portée initiale de 30% à 50%.
   **Solution** : Placez votre lien en **1er commentaire** et épinglez-le.

4. **L'Interaction de l'Auteur** :
   Répondre à TOUS les commentaires dans les 2 heures suivant la publication prolonge la courbe de distribution du post de 24 à 48 heures.`,
    examples: [
      "💡 Astuce : Répondre à un commentaire par une question relance la conversation et double le nombre total de commentaires.",
      "⚠️ Attention : Évitez d'éditer votre post dans les 10 minutes suivant sa publication (cela réinitialise le score d'évaluation algorithmique)."
    ],
    is_pinned: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'strat-3',
    title: 'Plages Horaires & Jours Optimaux de Publication B2B',
    category: 'Planning',
    tags: ['timing', 'horaires', 'planning', 'audience', 'engagement'],
    summary: 'Analyse des fenêtres de tir stratégiques pour publier au moment où vos prospects B2B sont actifs sur leur fil d\'actualité.',
    content: `### Le Calendrier Stratégique de Publication :

- **Mardi, Mercredi & Jeudi (Les Jours Champions B2B)** :
  - **07:30 - 08:45** : Avant les réunions, pendant les transports. Taux d'ouverture maximal.
  - **11:45 - 13:15** : Pause déjeuner. Moment privilégié pour les carrousels et articles synthétiques.
  - **17:30 - 18:30** : Fin de journée de bureau.

- **Lundi & Vendredi (Jours Intermédiaires)** :
  - Lundi matin : privilégier entre 08:30 et 10:00 (après le dépouillement des e-mails).
  - Vendredi : privilégier la matinée (08:00 - 11:00). Éviter l'après-midi.

- **Samedi & Dimanche (La Fenêtre Personnelle & Reflexion)** :
  - Dimanche soir (18:00 - 20:30) : Excellent créneau pour le storytelling d'entrepreneur, les bilans de semaine et les réflexions stratégiques.`,
    examples: [
      "📅 Fréquence recommandée : 3 à 4 publications de haute valeur par semaine valent mieux que 7 posts médiocres."
    ],
    is_pinned: false,
    created_at: new Date().toISOString(),
  },
  {
    id: 'strat-4',
    title: 'Format Carrousel PDF : Secrets de Conception & Dwell Time',
    category: 'Format',
    tags: ['carrousel', 'pdf', 'canva', 'design', 'conversion'],
    summary: 'Le carrousel PDF génère jusqu\'à 3x plus d\'impressions et 5x plus d\'enregistrements qu\'un simple post texte.',
    content: `### Architecture d'un Carrousel Virant (8 à 12 slides) :

1. **Slide 1 (La Couverture)** : Titre provocateur ou ultra-spécifique, typographie XXL, contrastes forts.
2. **Slide 2 (Le Problème / Constat)** : Expliciter la douleur ou la fausse croyance de votre cible.
3. **Slides 3 à 9 (La Méthodologie pas-à-pas)** : 1 seule idée claire par slide. Moins de 30 mots par visuel.
4. **Slide Avant-Dernière (La Récapitulatif / Checklist)** : Résumé condensé prêt à être screenshoté.
5. **Slide Finale (Call-to-Action)** : Inviter explicitement à commenter, enregistrer le post ou s'abonner.

### Spécifications Techniques Optimales :
- **Dimensions** : 1080 x 1350 px (format vertical 4:5) pour occuper plus d'espace sur l'écran smartphone.
- **Poids** : Moins de 10 Mo en format PDF.
- **Canva Tip** : Ajoutez une petite flèche visuelle qui pointe vers la droite au bas de chaque slide pour inciter au balayage.`,
    examples: [
      "📌 Pensez à ajouter un rappel 'Enregistrez ce carrousel pour le consulter plus tard' sur la dernière slide."
    ],
    is_pinned: false,
    created_at: new Date().toISOString(),
  },
  {
    id: 'strat-5',
    title: 'Stratégie de Commentaires & La Méthode des 3C',
    category: 'Engagement',
    tags: ['commentaires', 'networking', 'outreach', 'visibilité'],
    summary: '80% de votre visibilité sur LinkedIn provient des commentaires pertinents que vous laissez chez les autres.',
    content: `### La Règle des 80/20 du Réseau :
La croissance de votre compte ne dépend pas uniquement de vos propres publications, mais de votre présence sous les posts des leaders d'opinion de votre marché.

### La Structure des 3C pour vos Commentaires :
1. **Complimenter** : Saluer l'originalité ou la pertinence du point soulevé.
2. **Compléter** : Apporter une donnée chiffrée, une anecdote concrète ou un contre-exemple constructif.
3. **Questionner** : Poser une question ouverte qui invite l'auteur et la communauté à réagir.

### Routine Quotidienne recommandée (15 min/jour) :
- Commentez 5 posts cibles avant de publier votre propre contenu.
- Les commentaires apportant une réelle valeur d'expert captent naturellement des dizaines de visites sur votre profil.`,
    examples: [
      "Exemple de mauvais commentaire : 'Super post, merci !' (Portée nulle)",
      "Exemple de bon commentaire : 'Point très juste sur le Dwell Time. De notre côté, nous avons remarqué que coupler le carrousel à un sondage augmentait l'engagement de +24%. As-tu observé le même phénomène @Auteur ?'"
    ],
    is_pinned: false,
    created_at: new Date().toISOString(),
  },
  {
    id: 'strat-6',
    title: 'Copywriting B2B : Les Formules AIDA & PAS',
    category: 'Copywriting',
    tags: ['copywriting', 'conversion', 'structure', 'rédaction'],
    summary: 'Comment structurer le corps de vos posts pour transformer des lecteurs passifs en clients engagés.',
    content: `### Formule 1 : La Méthode PAS (Problem - Agitate - Solve)
- **Problem (Problème)** : Identifier clairement le point de douleur ("Vous passez des heures à rédiger sans obtenir de rdv ?").
- **Agitate (Agitation)** : Montrer les conséquences d'ignorer ce problème ("Résultat : votre prospect va chez vos concurrents et votre budget s'épuise").
- **Solve (Solution)** : Apporter votre cadre ou méthodologie en 3 points clairs.

### Formule 2 : La Méthode AIDA (Attention - Intérêt - Désir - Action)
- **Attention** : Le Hook visuel et textuel.
- **Intérêt** : Une histoire ou une statistique frappante.
- **Désir** : La transformation concrète offerte par votre conseil.
- **Action** : Un Call-to-Action unique et simple ("Donnez votre avis en commentaire").`,
    examples: [
      "💡 Règle de clarté : 1 post = 1 seule idée principale = 1 seul appel à l'action."
    ],
    is_pinned: false,
    created_at: new Date().toISOString(),
  },
  {
    id: 'strat-7',
    title: 'Optimisation du Profil LinkedIn : Convertir les Vues en Leads',
    category: 'Format',
    tags: ['profil', 'conversion', 'bannière', 'titre', 'leads'],
    summary: 'Transformez votre profil personnel en une page de vente haute conversion.',
    content: `### Les 5 Éléments Clés d'un Profil Vendeur :

1. **Le Titre de Profil (Headline)** :
   Ne vous contentez pas de votre poste ("CEO chez X"). Utilisez la formule : *J'aide [Cible] à obtenir [Résultat] grâce à [Méthode].*

2. **La Bannière Visuelle** :
   Elle constitue votre panneau publicitaire principal. Affichez votre proposition de valeur, votre preuve sociale (logos clients) et un CTA vers votre lien.

3. **La Section Sélection (Featured)** :
   Mettez en avant votre meilleur carrousel, votre lien de prise de rendez-vous ou l'inscription à votre newsletter.

4. **Le Mode Créateur & Lien de Profil** :
   Activez le bouton de lien personnalisé sous votre titre (ex: "Recevoir ma newsletter gratuite").

5. **La Section À propos (About)** :
   Racontez votre histoire avec la structure : Problème constaté -> Votre mission -> Résultats obtenus -> Prochaine étape pour le lecteur.`,
    examples: [
      "Exemple de titre efficace : 'J'aide les fondateurs SaaS à doubler leur ARR avec du contenu LinkedIn B2B | Top Voice Content 2026'"
    ],
    is_pinned: false,
    created_at: new Date().toISOString(),
  },
  {
    id: 'strat-8',
    title: 'Format Vidéo & Native Shorts : Les Règles 2026',
    category: 'Format',
    tags: ['vidéo', 'shorts', 'tiktok-style', 'engagement', 'algorithme'],
    summary: 'La vidéo verticale courte prend une place prépondérante dans l\'algorithme LinkedIn.',
    content: `### Les Bonnes Pratiques de la Vidéo LinkedIn :

1. **Durée Idéale** : 45 à 90 secondes maximum. Les vidéos trop longues ont un taux d'abandon élevé.
2. **Format Vertical (9:16 ou 4:5)** : Optimisé pour la consultation sur smartphone.
3. **Sous-titres Obligatoires** : 85% des vidéos sur LinkedIn sont visionnées SANS LE SON.
4. **Hook visuel dans les 2 premières secondes** : Mouvement, texte à l'écran ou question directe.
5. **Texte d'accompagnement** : Rédigez tout de même un résumé sous forme de post texte pour les utilisateurs qui préfèrent lire.`,
    examples: [
      "📌 Outil conseillé : Utilisez CapCut ou Submagic pour générer des sous-titres dynamiques et animés."
    ],
    is_pinned: false,
    created_at: new Date().toISOString(),
  },
  {
    id: 'strat-9',
    title: 'Les 7 Erreurs Fatales qui Détruisent la Portée d\'un Post',
    category: 'Algorithme',
    tags: ['erreurs', 'pénalités', 'portée', 'algorithme', 'bonnes-pratiques'],
    summary: 'Évitez les pièges classiques qui bloquent la diffusion algorithmique de vos contenus.',
    content: `### Les 7 Péchés Capitaux sur LinkedIn :

1. **Mettre un lien externe dans le corps du post** (réduit le reach de 40%).
2. **Modifier le texte dans les 15 minutes après publication**.
3. **Utiliser des pods d'engagement artificiels ou des robots de likes** (LinkedIn détecte et shadowban les comptes concernés).
4. **Ne pas répondre aux commentaires sous son post**.
5. **Publier 2 posts à moins de 4 heures d'intervalle** (le 2ème post cannibalise la portée du 1er).
6. **Mettre plus de 5 à 6 hashtags** (la recommandation actuelle est de 3 à 5 hashtags très ciblés).
7. **Rédiger de gros pavés de texte non aérés** sans sauts de ligne.`,
    examples: [
      "🚫 À bannir : Les groupes WhatsApp / Telegram de 'like pour like' qui dénaturent votre algorithme d'audience."
    ],
    is_pinned: false,
    created_at: new Date().toISOString(),
  },
  {
    id: 'strat-10',
    title: 'Stratégie de Newsletter LinkedIn : Créer une Audience Captive',
    category: 'Copywriting',
    tags: ['newsletter', 'audience', 'email', 'fidélisation'],
    summary: 'Comment utiliser le format Newsletter natif de LinkedIn pour envoyer une notification à 100% de vos abonnés.',
    content: `### Pourquoi lancer une Newsletter LinkedIn ?
Lorsqu'un membre s'abonne à votre Newsletter LinkedIn, il reçoit **une notification Push ET un e-mail automatique** à chaque nouvelle édition. C'est l'un des rares canaux à fort taux de délivrabilité.

### Les Règles d'une Newsletter à Succès :
- **Périodicité constante** : Publiez une fois par semaine ou tous les 15 jours à jour fixe.
- **Titre clair et accrocheur** : Donnez un nom explicite (ex: *La Veille B2B*, *Le Decodeur IA*).
- **Structure éditoriale récurrente** :
  1. Édito d'ouverture (200 mots)
  2. 3 Actualités ou Ressources analysées
  3. Le conseil de la semaine
  4. Appel à l'action vers votre produit/service.`,
    examples: [
      "💡 Astuce : Recyclez vos meilleures éditions de newsletter en carrousels PDF pour maximiser votre retour sur investissement."
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
