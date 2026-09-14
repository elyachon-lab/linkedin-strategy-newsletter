const url = 'https://dxaxfxzpttiadfekksrx.supabase.co/rest/v1/linkedin_strategies';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR4YXhmeHpwdHRpYWRmZWtrc3J4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg2OTA4NzAsImV4cCI6MjEwNDI2Njg3MH0.xl9cqS2LqcqfKTOxHv_bjkjvnAhGH1bOhgE72A1eDLY';

const articles = [
  {
    title: 'Le Social Selling B2B : La Méthode Inbound pour Générer des Leads',
    category: 'Engagement',
    tags: ['social selling', 'leads', 'b2b', 'prospection', 'ssi'],
    summary: 'Comment attirer des prospects qualifiés sur votre profil LinkedIn sans envoyer de messages de prospection à froid.',
    content: `### Qu'est-ce que le Social Selling B2B ?
Le Social Selling consiste à utiliser LinkedIn pour écouter, interagir et apporter de la valeur à vos prospects cibles avant même de tenter une vente. L'objectif est d'être la première personne à laquelle votre prospect pense lorsqu'il ressent un besoin.

### Les 4 Piliers du Social Selling Index (SSI) :
1. **Créer une marque professionnelle forte** (profil optimisé client-centric).
2. **Trouver les bonnes personnes** (recherche ciblée de décideurs).
3. **Échanger des informations** (partager du contenu à forte valeur ajoutée).
4. **Construire des relations de confiance** (commenter et échanger en message privé avec empathie).

### La Méthode des Triggers (Déclencheurs d'Achat) :
- Surveillez les mouvements dans les entreprises cibles (levées de fonds, recrutements, nominations).
- Réagissez aux publications de vos prospects dans les 30 minutes avec un commentaire d'expert.
- Envoyez un message privé contextualisé uniquement APRÈS avoir interagi avec leur contenu.`,
    examples: [
      'Exemple de premier message privé : "Bonjour [Prénom], j\'ai adoré votre réflexion sur [Sujet]. De notre côté, nous avons remarqué que [Donnée]. Au plaisir d\'échanger !"'
    ],
    is_pinned: false
  },
  {
    title: 'Comment Rédiger des Posts Storytelling Captivants (La Structure en 5 Actes)',
    category: 'Copywriting',
    tags: ['storytelling', 'émotion', 'rédaction', 'histoire', 'conversion'],
    summary: 'Le storytelling est l\'outil le plus puissant pour humaniser votre marque et susciter l\'empathie de vos lecteurs.',
    content: `### La Structure en 5 Actes d'un Storytelling LinkedIn Virant :

1. **L'Élément Déclencheur (Slide / Ligne 1)** : Présenter la situation initiale et la rupture ("En 2022, j'ai pris la pire décision de ma carrière d'entrepreneur").
2. **L'Épreuve / Le Creux de la Vague** : Montrer la vulnérabilité et les obstacles rencontrés ("0 client pendant 4 mois, un solde bancaire au plus bas").
3. **La Prise de Conscience / Le Délicat Pivot** : L'élément clé qui a tout débloqué ("Puis j'ai compris la règle fondamentale du positionnement B2B").
4. **Les Résultats Concrets** : Chiffres et preuves à l'appui (+150k€ de CA générés).
5. **La Leçon pour le Lecteur & CTA** : Ce que votre réseau doit retenir pour éviter la même erreur.`,
    examples: [
      '💡 Règle de vulnérabilité : Soyez authentique mais ne vous victimisez pas. Montrez toujours comment vous avez surmonté l\'obstacle.'
    ],
    is_pinned: false
  },
  {
    title: 'LinkedIn Ads vs Portée Organique : Quand et Comment Combiner les Deux',
    category: 'Algorithme',
    tags: ['ads', 'thought-leader-ads', 'budget', 'acquisition', 'retargeting'],
    summary: 'Comment coupler l\'acquisition payante et la création de contenu organique pour maximiser le ROI.',
    content: `### La Synergie Organique + Ads sur LinkedIn :

1. **Format Thought Leader Ads (TLA)** :
   C'est le format publicitaire le plus performant en 2026. Il permet de booster le post organique d'un dirigeant ou d'un employé directement auprès d'une audience ciblée. Le taux de clic (CTR) est 3x supérieur à une pub d'entreprise classique.

2. **Stratégie de Retargeting Vidéo** :
   Publiez des vidéos courtes en organique, puis créez une campagne Ads ciblée uniquement sur les utilisateurs qui ont visionné plus de 50% de vos vidéos.

3. **Test des Hooks en Organique** :
   Utilisez la portée organique pour tester vos visuels et titres. Prenez vos 10% de posts organiques les plus viraux et transformez-les en campagnes Ads payantes.`,
    examples: [
      '📌 Budget de départ conseillé : 500€/mois sur le format Thought Leader Ads pour valider vos premières conversions.'
    ],
    is_pinned: false
  },
  {
    title: 'Le Guide Ultime des Hashtags sur LinkedIn en 2026',
    category: 'Algorithme',
    tags: ['hashtags', 'référencement', 'mots-clés', 'découvrabilité'],
    summary: 'Les règles actualisées sur l\'usage des hashtags pour ne plus jamais pénaliser votre reach.',
    content: `### Les Nouvelles Règles des Hashtags :

- **Le Nombre Idéal** : Entre **3 et 5 hashtags max**. En mettre plus de 6 dilue le signal algorithmique et fait ressembler votre post à du spam.
- **L'Emplacement** : Placez toujours vos hashtags à la toute fin de votre publication (pas au milieu des phrases).
- **Structure de la Sélection** :
  - 1 Hashtag Généraliste (#Marketing, #Tech, #Leadership)
  - 2 Hashtags Métier / Spécifiques (#SocialSelling, #Nextjs)
  - 1 Hashtag de Niche ou de Marque (#NomDeVotreEntreprise)`,
    examples: [
      'Exemple parfait : #LinkedInStrategy #CopywritingB2B #SocialMedia'
    ],
    is_pinned: false
  },
  {
    title: 'Employee Advocacy : Transformer ses Collaborateurs en Ambassadeurs',
    category: 'Engagement',
    tags: ['employee-advocacy', 'marque-employeur', 'équipe', 'reach-cumulé'],
    summary: 'Multipliez par 10 la portée de votre entreprise en formant vos équipes à publier sur LinkedIn.',
    content: `### Pourquoi l'Employee Advocacy est imbattable ?
Les profils personnels d'employés génèrent en moyenne **8x plus d'engagement** que la page entreprise officielle de la société.

### Programme en 4 Étapes pour Rallier vos Équipes :
1. **Créer un Guide Éditorial Souple** : Donner des cadres et exemples sans imposer de copier-coller stricts.
2. **Organiser des Ateliers de Formations (1h/mois)** : Apprendre aux équipes à structurer des hooks et utiliser Canva.
3. **Mettre à disposition une Banque d'Accroches** : Partager un document interne avec 20 structures de posts prêts à être personnalisés.
4. **Célébrer les Victories** : Mettre en avant le post de l'employé ayant généré le plus d'impressions de la semaine.`,
    examples: [
      '💡 Astuce : Encourager les employés à raconter leurs projets quotidiens plutôt que de repartager les communiqués de presse.'
    ],
    is_pinned: false
  },
  {
    title: 'Comment Créer du Contenu Viral à partir de Dataviz et Graphiques',
    category: 'Format',
    tags: ['dataviz', 'graphiques', 'chiffres', 'preuves', 'infographie'],
    summary: 'Les visuels de données chiffrées génèrent un taux d\'enregistrement et de partage record.',
    content: `### Pourquoi les Graphiques Cartonnent sur LinkedIn ?
Les professionnels adorent consommer et partager des données synthétiques qui les font paraître informés auprès de leur propre réseau.

### Les 3 Types de Graphiques qui Fonctionnent le Mieux :
1. **Le Graphique 'Avant / Après'** : Comparer des méthodes anciennes vs nouvelles.
2. **La Matrice en 4 Quadrants** : Classer des outils ou compétences selon 2 axes (ex: Effort vs Impact).
3. **La Checklist Visuelle avec Graphique en Camembert** : Révéler les statistiques réelles d'une industrie.`,
    examples: [
      '📌 Outils recommandés : Figma, Canva ou Miro pour concevoir des diagrammes épurés aux couleurs de votre marque.'
    ],
    is_pinned: false
  },
  {
    title: 'La Stratégie de Repurposing : 1 Seul Contenu Décliné en 7 Formats',
    category: 'Format',
    tags: ['repurposing', 'productivité', 'recyclage', 'content-engine'],
    summary: 'Ne réinventez pas la roue à chaque post. Maximisez le rendement de chaque idée forte.',
    content: `### Comment Décliner un Seul Article ou Podcast en 7 Contenus :

- **Jour 1** : 1 Carrousel PDF synthèse des 5 points clés.
- **Jour 2** : 1 Post Texte axé sur la contre-intuition (Le Hook choc).
- **Jour 3** : 1 Vidéo courte / Short (60 secondes résumant l'idée 1).
- **Jour 4** : 1 Post Storytelling sur les coulisses de cette découverte.
- **Jour 5** : 1 Sondage interactif pour faire réagir votre communauté.
- **Jour 6** : 1 Édition de Newsletter récapitulative.
- **Jour 7** : 1 Citation visuelle forte sous forme d'image.`,
    examples: [
      '💡 Gain de temps : 2 heures de création de contenu le lundi suffisent pour alimenter toute votre semaine.'
    ],
    is_pinned: false
  },
  {
    title: 'Créer des Sondages LinkedIn à Fort Taux d\'Engagement (Poll Strategy)',
    category: 'Engagement',
    tags: ['sondage', 'poll', 'engagement', 'interactions', 'étude'],
    summary: 'Utiliser les sondages interactifs pour stimuler les réponses et qualifier des prospects.',
    content: `### Les Règles du Sondage LinkedIn Performant :

1. **Proposer 3 à 4 Options Maximum** : Des choix clairs et sans ambiguïté.
2. **Rédiger un Post Texte d'Accompagnement** : Ne laissez jamais un sondage sans contexte texte au-dessus.
3. **Ajouter l'Option 'Voir les résultats'** pour ne pas biaiser les personnes indécises.
4. **Relancer les Votants en MP** : Envoyez un message amical aux personnes ayant répondu pour engager la discussion.`,
    examples: [
      'Exemple de question : "Quelle est votre plus grande difficulté en création de contenu LinkedIn ? A) Trouver des idées B) Structurer le hook C) La régularité"'
    ],
    is_pinned: false
  },
  {
    title: 'La Psychologie du Clic : Pourquoi les Gens Liken, Commentent et Partagent',
    category: 'Copywriting',
    tags: ['psychologie', 'virabilité', 'émotions', 'partages', 'virale'],
    summary: 'Comprendre les facteurs déclencheurs d\'engagement social pour écrire des contenus irrésistibles.',
    content: `### Les 4 Déclencheurs Psychologiques Majeurs :

1. **L'Élévation de Statut (Validation Sociale)** : Les gens partagent ce qui les fait paraître intelligents, experts ou avant-gardistes.
2. **L'Utilité Pratique Immédiate** : Les guides et checklists sauvegardés car ils résolvent un problème concret.
3. **La Polarisation & Débat Structuré** : Défendre une opinion tranchée suscite la prise de parole de la communauté.
4. **La Reconstitution d'Empathie** : Les récits d'échecs et d'apprentissage qui rappellent que nous sommes tous humains.`,
    examples: [
      '💡 Question à se poser avant de publier : "En quoi ce post apporte-t-il de la valeur à la personne qui va le lire ou le reposter ?"'
    ],
    is_pinned: false
  },
  {
    title: 'Comment Gérer un Bad Buzz ou des Commentaires Négatifs sur LinkedIn',
    category: 'Engagement',
    tags: ['bad-buzz', 'commentaires-négatifs', 'modération', 'réputation'],
    summary: 'Transformer des critiques ou objections en opportunité de démonstration de professionnalisme.',
    content: `### Les 4 Étapes de Modération Professionnelle :

1. **Garder son Sang-Froid (Ne jamais répondre sous l'émotion)** : Attendez 30 minutes avant de répondre à un commentaire agressif.
2. **Remercier pour la Remarque** : "Merci pour ton retour d'expérience @Nom".
3. **Apporter des Précisions Chiffrées et Courtoises** : Recadrer les faits sans attaquer la personne.
4. **Proposer de Poursuivre en Privé si nécessaire** : Désamorcer la polémique publique tout en montrant votre ouverture d'esprit.`,
    examples: [
      'Exemple de réponse exemplaire : "Excellente remarque @Jean. Effectivement cette méthode s\'applique aux entreprises B2B ayant déjà validé leur Product-Market Fit. Dans le cas contraire, l\'approche B concerne plutôt..."'
    ],
    is_pinned: false
  }
];

fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'apikey': key,
    'Authorization': 'Bearer ' + key,
    'Prefer': 'return=representation'
  },
  body: JSON.stringify(articles)
})
.then(r => r.json())
.then(d => console.log('Advanced Articles Insert Result:', Array.isArray(d) ? d.length + ' additional articles inserted successfully!' : d))
.catch(e => console.error(e));
