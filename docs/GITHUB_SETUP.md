# Guide de Versionnement GitHub 🐙

Ce guide vous explique pas à pas comment connecter votre projet local à un dépôt GitHub public ou privé.

---

## Étape 1 : Initialiser Git en local

Ouvrez votre terminal dans le dossier du projet et exécutez :

```bash
# 1. Initialiser le dépôt Git
git init

# 2. Vérifier les fichiers suivis (le fichier .gitignore exclut automatiquement node_modules et .env.local)
git status

# 3. Ajouter l'ensemble des fichiers du projet
git add .

# 4. Effectuer votre premier commit
git commit -m "feat: initialisation du Centre de Stratégie LinkedIn & Newsletter Tech"
```

---

## Étape 2 : Créer un Dépôt sur GitHub

1. Connectez-vous à votre compte [GitHub.com](https://github.com).
2. Cliquez sur le bouton **"+"** en haut à droite -> **New repository**.
3. Nommez votre dépôt (ex: `linkedin-strategy-newsletter`).
4. Choisissez la visibilité (Public ou Privé).
5. **Ne cochez pas** "Add a README file" ni ".gitignore" (car nous les avons déjà créés).
6. Cliquez sur **Create repository**.

---

## Étape 3 : Lier le Dépôt Local à GitHub & Pousser le Code

Copiez l'URL de votre dépôt GitHub (ex: `https://github.com/votre-compte/linkedin-strategy-newsletter.git`) et exécutez dans le terminal :

```bash
# Modifier la branche par défaut en main
git branch -M main

# Ajouter l'origin distante
git remote add origin https://github.com/VOTRE-NOM-UTILISATEUR/linkedin-strategy-newsletter.git

# Pousser le code vers GitHub
git push -u origin main
```

---

## Mises à jour ultérieures

Chaque fois que vous modifiez votre application :

```bash
git add .
git commit -m "chores: mise à jour des composants"
git push
```
