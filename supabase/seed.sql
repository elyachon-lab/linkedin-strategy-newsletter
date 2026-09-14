-- ====================================================================
-- SUPABASE SEED DATA FOR LINKEDIN STRATEGY & NEWSLETTER APP
-- Execute this SQL script in the Supabase Dashboard SQL Editor
-- ====================================================================

INSERT INTO linkedin_strategies (title, category, tags, summary, content, examples, is_pinned)
VALUES 
(
  'Règle des 3 secondes & Structure du Hook',
  'Hook',
  ARRAY['accroche', 'conversion', 'lisibilité', 'scroll-stopper'],
  'Le hook est la phrase la plus critique de votre publication. Il détermine si l''utilisateur va cliquer sur "...voir plus" ou continuer de scroller.',
  '### Pourquoi le Hook est crucial ?
Sur LinkedIn, le bouton **"...voir plus"** n''apparaît qu''après les 2 ou 3 premières lignes (environ 140-210 caractères selon le format). 

Si vos premières lignes ne suscitent pas immédiatement une impulsion émotionnelle (curiosité, contre-intuition, gain concret), votre post échouera, quelle que soit la qualité du contenu.

### 5 Formules de Hooks à Fort Impact :
1. **La Contre-intuition** : *"J''ai arrêté de poster 5 fois par semaine sur LinkedIn. Voici ce qui s''est passé (+42% de reach)."*
2. **Le Défi Personnel / Résultat** : *"En 90 jours, nous avons généré 120k€ avec 0€ de budget pub. Le guide étape par étape :"*
3. **Le Statu Quo Cassé** : *"Tout le monde vous dit de créer du contenu quotidien. C''est faux. Voici pourquoi."*
4. **La Liste de Ressources Filtrées** : *"9 outils IA que les top 1% des créateurs utilisent (et que vous ne connaissez pas)."*
5. **Le Storytelling Vulnérable** : *"Il y a 6 mois, ma boîte a failli fermer. Voici la leçon à 50 000€ qui a tout changé."*',
  ARRAY[
    'J''ai analysé 1 000 posts LinkedIn viraux. Voici les 5 règles d''or qui reviennent systématiquement :',
    'Ne lancez PAS votre newsletter avant d''avoir lu ceci (3 erreurs qui coûtent cher).',
    'Comment j''ai gagné 15 000 abonnés en 6 mois sans jamais prospecter par message privé.'
  ],
  TRUE
),
(
  'Algorithme LinkedIn 2.0 : Les Nouveaux facteurs de Reach',
  'Algorithme',
  ARRAY['algorithme', 'reach', 'dwell time', 'commentaires', 'dwall-time'],
  'Comprendre comment l''algorithme classe vos posts : Dwell Time, règles sur les liens externes, et l''importance primordiale de la 1ère heure.',
  '### Les 4 Piliers de l''Algorithme LinkedIn :

1. **Le Dwell Time (Temps de lecture sur le post)** :
   LinkedIn privilégie les contenus qui retiennent l''attention des utilisateurs. Les carrousels (PDF) et les longs textes structurés augmentent mécaniquement le Dwell Time.

2. **La Règle d''or de la Première Heure (Golden Hour)** :
   Les interactions (commentaires de plus de 5 mots, enregistrements, partages) reçues dans les **60 premières minutes** envoient un signal fort à l''algorithme pour élargir le cercle de diffusion.

3. **La Gestion des Liens Externes** :
   *Ne mettez jamais de lien dans le corps du post principal.* LinkedIn pénalise le reach de 30% à 50% car cela fait quitter sa plateforme. 
   **Bonnes pratiques :**
   - Mettez le lien en 1er commentaire (et épinglez-le).
   - Ou utilisez la fonctionnalité "Ajouter un lien sur votre profil".',
  ARRAY[
    '💡 Astuce : Répondre à un commentaire par une question relance la conversation et double le nombre de commentaires.',
    '⚠️ Attention : Évitez de modifier votre post dans les 10 minutes suivant sa publication.'
  ],
  TRUE
),
(
  'Plages Horaires & Jours Optimaux de Publication',
  'Planning',
  ARRAY['timing', 'horaires', 'engagement', 'planning', 'semaine'],
  'Optimiser vos heures de publication selon les habitudes de consultation des professionnels B2B.',
  '### Matrice de Publication LinkedIn :

- **Mardi, Mercredi & Jeudi** (Jours Premium) :
  - **07:30 - 08:45** : Avant le début des réunions, durant le trajet domicile-travail.
  - **11:45 - 13:15** : Pause déjeuner.
  - **17:30 - 18:30** : Fin de journée de bureau.

- **Lundi & Vendredi** (Jours Modérés) :
  - Lundi matin : privilégier entre 08:30 et 10:00 (tri des e-mails).
  - Vendredi : privilégier la matinée (08:00 - 11:00). Éviter le vendredi après-midi.',
  ARRAY['📅 Fréquence idéale : 3 à 4 publications par semaine de haute valeur valent mieux qu''un post quotidien bâclé.'],
  FALSE
);

-- Seed Initial Newsletter
INSERT INTO newsletter_issues (issue_number, title, subject_line, preview_text, status, content_markdown, articles, sent_at)
VALUES (
  1,
  'Veille Tech #01 - L''IA dans les workflows créatifs & les nouveautés Next.js 14',
  '⚡ Veille Tech #01 : Les pépites de la semaine & l''IA créative',
  'Découvrez les dernières avancées IA, les bonnes pratiques de prompt engineering et notre dossier LinkedIn.',
  'sent',
  'Bienvenue dans cette 1ère édition de notre Newsletter de Veille Tech ! 🚀

Cette semaine, nous décryptons les évolutions majeures du secteur tech et l''architecture Next.js / Supabase.

---

### 📰 Au Sommaire :
1. **IA & Web** : Les nouveaux modèles de génération de code.
2. **Next.js & Supabase** : Pourquoi ce stack est devenu le standard indiscutable.',
  '[{"id": "art-1", "title": "OpenAI GPT-4o & Les interfaces génératives", "category": "IA & Tech", "summary": "Présentation des nouvelles capacités multimédias en temps réel.", "takeaway": "L''intégration de LLM dans les applications SaaS devient un incontournable."}]'::jsonb,
  NOW()
);
