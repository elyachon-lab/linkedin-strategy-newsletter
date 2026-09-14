# Guide de Déploiement Vercel & Configuration Supabase 🚀

Ce guide vous accompagne pour déployer votre application full-stack Next.js 14 sur Vercel avec la base de données Supabase et l'API d'envoi d'e-mails Resend.

---

## Étape 1 : Configurer Supabase

1. Créez un compte gratuit sur [Supabase.com](https://supabase.com).
2. Créez un nouveau projet (ex: `linkedin-strategy-app`).
3. Allez dans le **SQL Editor** dans le menu latéral Supabase.
4. Ouvrez le fichier local [`supabase/schema.sql`](../supabase/schema.sql), copiez son contenu et exécutez-le dans le SQL Editor.
5. (Optionnel) Ouvrez le fichier local [`supabase/seed.sql`](../supabase/seed.sql), copiez son contenu et exécutez-le pour insérer les premières fiches stratégiques et newsletters exemples.
6. Récupérez vos identifiants dans **Project Settings -> API** :
   - `Project URL` -> `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public key` -> `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role key` -> `SUPABASE_SERVICE_ROLE_KEY`

---

## Étape 2 : Importer le Projet sur Vercel

1. Connectez-vous sur [Vercel.com](https://vercel.com) avec votre compte GitHub.
2. Cliquez sur **Add New... -> Project**.
3. Sélectionnez votre dépôt GitHub `linkedin-strategy-newsletter` et cliquez sur **Import**.

---

## Étape 3 : Configurer les Variables d'Environnement sur Vercel

Dans la section **Environment Variables** du formulaire d'import Vercel, ajoutez les clés suivantes :

| Clé Variable | Valeur Existant | Description |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxxx.supabase.co` | URL API de votre projet Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGci...` | Clé publique anonyme Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGci...` | Clé rôle de service Supabase |
| `RESEND_API_KEY` | `re_123456789...` | Clé API Resend (pour envoi e-mails réels) |
| `RESEND_FROM_EMAIL` | `newsletter@votredomaine.com` | Adresse d'expédition e-mail (ou `onboarding@resend.dev`) |

---

## Étape 4 : Lancer le Déploiement !

1. Cliquez sur **Deploy**.
2. Vercel compile automatiquement le projet Next.js (TypeScript checks + Tailwind compilation).
3. En moins d'une minute, votre site est en ligne avec un nom de domaine gratuit SSL `.vercel.app` !

---

## Déploiements automatiques (CI/CD)

Chaque fois que vous faites un `git push` sur la branche `main` de GitHub, Vercel redéploiera automatiquement la nouvelle version de votre application.
