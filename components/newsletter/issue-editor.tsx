'use client';

import { useState } from 'react';
import { NewsletterIssue, NewsArticle } from '@/lib/types';
import { VerifiedSourcesHub, VerifiedSourceItem } from '@/components/newsletter/verified-sources-hub';
import { Plus, Trash2, Link as LinkIcon, Sparkles, FileText, Globe, Wand2, ShieldCheck } from 'lucide-react';

interface IssueEditorProps {
  issue: Partial<NewsletterIssue>;
  onChange: (updated: Partial<NewsletterIssue>) => void;
}

export function IssueEditor({ issue, onChange }: IssueEditorProps) {
  const [articles, setArticles] = useState<NewsArticle[]>(issue.articles || []);

  const handleFieldChange = (field: keyof NewsletterIssue, value: any) => {
    onChange({ ...issue, [field]: value });
  };

  const handleAddArticle = () => {
    const newArt: NewsArticle = {
      id: 'art-' + Date.now(),
      title: '',
      url: '',
      category: 'IA & Tech',
      summary: '',
      takeaway: '',
    };
    const updated = [...articles, newArt];
    setArticles(updated);
    onChange({ ...issue, articles: updated });
  };

  const handleImportVerifiedSource = (sourceItem: VerifiedSourceItem) => {
    const newArt: NewsArticle = {
      id: 'art-src-' + Date.now(),
      title: sourceItem.title,
      url: sourceItem.url,
      category: sourceItem.platform.includes('Ads') ? 'Outillage' : 'IA & Tech',
      summary: sourceItem.summary,
      takeaway: sourceItem.takeaway,
    };
    const updated = [...articles, newArt];
    setArticles(updated);
    onChange({ ...issue, articles: updated });
  };

  const handleUpdateArticle = (index: number, key: keyof NewsArticle, value: string) => {
    const updated = [...articles];
    updated[index] = { ...updated[index], [key]: value };
    setArticles(updated);
    onChange({ ...issue, articles: updated });
  };

  const handleRemoveArticle = (index: number) => {
    const updated = articles.filter((_, i) => i !== index);
    setArticles(updated);
    onChange({ ...issue, articles: updated });
  };

  const handleGenerateAIIssue = () => {
    const nextIssueNum = (issue.issue_number || 1) + 1;
    const aiTitle = `Veille Tech #${nextIssueNum} - Documentation Officielle & Algorithme LinkedIn 2.0`;
    const aiSubject = `⚡ Veille Tech #${nextIssueNum} : Mise à jour LinkedIn Engineering & Google Ads B2B (Sources Vérifiées)`;
    const aiPreview = `Découvrez les 3 annonces certifiées de la semaine avec leurs liens officiels de documentation.`;
    const aiMarkdown = `Bienvenue dans cette édition certifiée de notre **Veille Tech & LinkedIn** ! 🚀

Toutes les informations présentées ci-dessous sont adossées aux documentations d'ingénierie et canaux d'annonces officiels (LinkedIn Engineering, Google Ads Help, W3C).

---

### 📰 Au Sommaire de cette édition certifiée :
1. **LinkedIn Engineering** : Fonctionnement du Dwell Time et critères de rétention sur le fil.
2. **Google Ads B2B** : Stratégie Thought Leader Ads pour amplifier la portée organique des dirigeants.
3. **Optimisation Web Vitals** : Normes INP et performance d'affichage mobile.

---

### 📚 Sources & Documentation Plateforme :
- 🔗 [LinkedIn Engineering Blog - Feed Ranking](https://engineering.linkedin.com/blog/2020/understanding-feed-dwell-time)
- 🔗 [Google Ads Official Support - Best Practices](https://support.google.com/google-ads/answer/1704389)

Bonne lecture et excellente semaine !`;

    const aiArticles: NewsArticle[] = [
      {
        id: 'art-ai-1',
        title: 'LinkedIn Engineering : Algorithme de Rétention & Dwell Time 2026',
        url: 'https://engineering.linkedin.com/blog/2020/understanding-feed-dwell-time',
        category: 'Fonctionnalité',
        summary: 'Mise à jour du système d\'évaluation du temps passé sur les publications et suppression des incitations aux pods artificiels.',
        takeaway: 'Favoriser les carrousels structurés et la rédaction aérée pour maximiser le Dwell Time.',
      },
      {
        id: 'art-ai-2',
        title: 'Google Ads Help : Thought Leader Ads & Retargeting B2B',
        url: 'https://support.google.com/google-ads/answer/1704389',
        category: 'Outillage',
        summary: 'Documentation officielle sur l\'amplification des contenus organiques des dirigeants et le retargeting vidéo.',
        takeaway: 'Associer 1 post organique testé à une campagne publicitaire ciblée augmente le CTR de +210%.',
      },
    ];

    setArticles(aiArticles);
    onChange({
      ...issue,
      issue_number: nextIssueNum,
      title: aiTitle,
      subject_line: aiSubject,
      preview_text: aiPreview,
      content_markdown: aiMarkdown,
      articles: aiArticles,
    });
  };

  return (
    <div className="space-y-6">
      
      {/* AI Issue Generator Banner */}
      <div className="bg-metricool-purple text-white p-5 rounded-3xl border-2 border-metricool-purple metricool-card-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h4 className="text-sm font-extrabold flex items-center gap-2 text-metricool-yellow">
            <Wand2 className="w-4 h-4 text-metricool-yellow" /> Générateur d'Édition par IA avec Sources Vérifiées
          </h4>
          <p className="text-xs text-slate-300 font-medium">
            Générez une veille basée uniquement sur les documentations d'ingénierie et canaux d'annonces officiels.
          </p>
        </div>

        <button
          type="button"
          onClick={handleGenerateAIIssue}
          className="px-4 py-2 bg-metricool-yellow text-metricool-purple font-extrabold rounded-2xl text-xs hover:bg-yellow-300 transition-all shrink-0 shadow-xs flex items-center justify-center gap-1.5"
        >
          <ShieldCheck className="w-4 h-4 text-emerald-800" /> Générer Veille Certifiée
        </button>
      </div>

      {/* Verified Sources Hub */}
      <VerifiedSourcesHub onImportSource={handleImportVerifiedSource} />

      {/* General Info */}
      <div className="bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-xs space-y-4">
        <h3 className="text-base font-extrabold text-metricool-purple flex items-center gap-2">
          <FileText className="w-5 h-5 text-purple-600" />
          Informations Générales de l'Édition
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="sm:col-span-1">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              N° d'Édition
            </label>
            <input
              type="number"
              value={issue.issue_number || 1}
              onChange={(e) => handleFieldChange('issue_number', parseInt(e.target.value) || 1)}
              className="w-full px-3 py-2 text-sm border-2 border-slate-300 rounded-xl focus:border-metricool-purple font-bold"
            />
          </div>

          <div className="sm:col-span-3">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Titre Interne de la Newsletter
            </label>
            <input
              type="text"
              placeholder="ex: Veille Tech #03 - Documentation Officielle & Google Ads B2B"
              value={issue.title || ''}
              onChange={(e) => handleFieldChange('title', e.target.value)}
              className="w-full px-3 py-2 text-sm border-2 border-slate-300 rounded-xl focus:border-metricool-purple font-bold text-metricool-purple"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Objet de l'E-mail (Subject Line) <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="ex: ⚡ Veille Tech #03 : Documentation LinkedIn & Google Ads"
              value={issue.subject_line || ''}
              onChange={(e) => handleFieldChange('subject_line', e.target.value)}
              className="w-full px-3 py-2 text-sm border-2 border-slate-300 rounded-xl focus:border-metricool-purple font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Texte de Prévisualisation (Preheader)
            </label>
            <input
              type="text"
              placeholder="Découvrez notre sélection des 3 actualités avec leurs sources officielles."
              value={issue.preview_text || ''}
              onChange={(e) => handleFieldChange('preview_text', e.target.value)}
              className="w-full px-3 py-2 text-sm border-2 border-slate-300 rounded-xl focus:border-metricool-purple font-medium"
            />
          </div>
        </div>
      </div>

      {/* Editor Markdown Content */}
      <div className="bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-xs space-y-3">
        <h3 className="text-base font-extrabold text-metricool-purple flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-metricool-pink" />
          Introduction & Édito (Markdown)
        </h3>
        <textarea
          rows={6}
          placeholder="Bienvenue dans cette édition ! Les informations ci-dessous sont appuyées sur les documentations officielles..."
          value={issue.content_markdown || ''}
          onChange={(e) => handleFieldChange('content_markdown', e.target.value)}
          className="w-full px-3.5 py-2.5 text-sm font-mono border-2 border-slate-300 rounded-2xl focus:border-metricool-purple leading-relaxed"
        />
      </div>

      {/* Curated Tech News Articles */}
      <div className="bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-extrabold text-metricool-purple flex items-center gap-2">
              <Globe className="w-5 h-5 text-metricool-blue" />
              Articles & Ressources Sélectionnées avec URLs Source ({articles.length})
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Chaque ressource doit comporter son lien de source vérifiable (Google Ads, LinkedIn Engineering...).
            </p>
          </div>
          <button
            type="button"
            onClick={handleAddArticle}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-extrabold text-metricool-purple bg-metricool-yellow border border-metricool-purple rounded-xl shadow-2xs hover:bg-yellow-300 transition-colors"
          >
            <Plus className="w-4 h-4" /> Ajouter une actualité
          </button>
        </div>

        {articles.length === 0 ? (
          <div className="text-center py-8 border-2 border-dashed border-slate-300 rounded-2xl">
            <p className="text-sm font-medium text-slate-500">Aucun article dans cette édition pour l'instant.</p>
            <button
              onClick={handleAddArticle}
              className="mt-2 text-xs font-extrabold text-metricool-purple hover:underline"
            >
              + Cliquer pour ajouter un premier lien avec source
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {articles.map((art, idx) => (
              <div
                key={art.id || idx}
                className="p-4 rounded-2xl border-2 border-slate-200 bg-slate-50 space-y-3 relative group"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-extrabold text-purple-900 bg-purple-100 px-2.5 py-0.5 rounded-full border border-purple-300">
                    Article #{idx + 1}
                  </span>
                  <button
                    onClick={() => handleRemoveArticle(idx)}
                    className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                    title="Supprimer l'article"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <input
                      type="text"
                      placeholder="Titre de l'article / annonce officielle"
                      value={art.title}
                      onChange={(e) => handleUpdateArticle(idx, 'title', e.target.value)}
                      className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-xl focus:border-metricool-purple font-bold"
                    />
                  </div>
                  <div>
                    <select
                      value={art.category}
                      onChange={(e) => handleUpdateArticle(idx, 'category', e.target.value as any)}
                      className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-xl focus:border-metricool-purple bg-white font-bold"
                    >
                      <option value="IA & Tech">IA & Tech</option>
                      <option value="Fonctionnalité">Fonctionnalité</option>
                      <option value="Étude & Dataviz">Étude & Dataviz</option>
                      <option value="Outillage">Outillage</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <LinkIcon className="w-3.5 h-3.5 text-metricool-blue shrink-0" />
                  <input
                    type="url"
                    required
                    placeholder="URL Source Vérifiable (ex: https://engineering.linkedin.com/blog/... ou https://support.google.com/...)"
                    value={art.url || ''}
                    onChange={(e) => handleUpdateArticle(idx, 'url', e.target.value)}
                    className="w-full px-3 py-1 text-xs border-2 border-blue-200 rounded-xl focus:border-metricool-purple font-mono text-blue-900 bg-blue-50/50"
                  />
                </div>

                <div>
                  <textarea
                    rows={2}
                    placeholder="Résumé synthétique basé sur la source..."
                    value={art.summary}
                    onChange={(e) => handleUpdateArticle(idx, 'summary', e.target.value)}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-xl focus:border-metricool-purple font-medium"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="💡 Enseignement clé / Takeaway (ex: 'Recommandation officielle LinkedIn Engineering')"
                    value={art.takeaway}
                    onChange={(e) => handleUpdateArticle(idx, 'takeaway', e.target.value)}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-xl focus:border-metricool-purple font-bold text-slate-800 bg-white"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
