'use client';

import { useState } from 'react';
import { NewsletterIssue, NewsArticle } from '@/lib/types';
import { Plus, Trash2, Link as LinkIcon, Sparkles, FileText, Globe } from 'lucide-react';

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

  return (
    <div className="space-y-6">
      
      {/* General Info */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <FileText className="w-5 h-5 text-purple-600" />
          Informations Générales de l'Édition
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="sm:col-span-1">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              N° d'Édition
            </label>
            <input
              type="number"
              value={issue.issue_number || 1}
              onChange={(e) => handleFieldChange('issue_number', parseInt(e.target.value) || 1)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600"
            />
          </div>

          <div className="sm:col-span-3">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Titre Interne de la Newsletter
            </label>
            <input
              type="text"
              placeholder="ex: Veille Tech #03 - Les agents autonomes & Next.js 14"
              value={issue.title || ''}
              onChange={(e) => handleFieldChange('title', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 font-medium text-slate-900"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Objet de l'E-mail (Subject Line) <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="ex: ⚡ Veille Tech #03 : La révolution des agents IA"
              value={issue.subject_line || ''}
              onChange={(e) => handleFieldChange('subject_line', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Texte de Prévisualisation (Preheader)
            </label>
            <input
              type="text"
              placeholder="Découvrez notre sélection des 4 actualités tech de la semaine."
              value={issue.preview_text || ''}
              onChange={(e) => handleFieldChange('preview_text', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600"
            />
          </div>
        </div>
      </div>

      {/* Editor Markdown Content */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-600" />
          Introduction & Edito (Markdown)
        </h3>
        <textarea
          rows={6}
          placeholder="Bienvenue dans cette édition ! Cette semaine nous abordons..."
          value={issue.content_markdown || ''}
          onChange={(e) => handleFieldChange('content_markdown', e.target.value)}
          className="w-full px-3.5 py-2.5 text-sm font-mono border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 leading-relaxed"
        />
      </div>

      {/* Curated Tech News Articles */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-600" />
              Articles & Ressources Sélectionnées ({articles.length})
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Ajoutez les pépites tech et études de cas à inclure dans le corps de l'e-mail.
            </p>
          </div>
          <button
            type="button"
            onClick={handleAddArticle}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-lg shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" /> Ajouter une actualité
          </button>
        </div>

        {articles.length === 0 ? (
          <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-xl">
            <p className="text-sm text-slate-500">Aucun article dans cette édition pour l'instant.</p>
            <button
              onClick={handleAddArticle}
              className="mt-2 text-xs font-semibold text-purple-600 hover:underline"
            >
              + Cliquer pour ajouter un premier lien
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {articles.map((art, idx) => (
              <div
                key={art.id || idx}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3 relative group"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded">
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
                      placeholder="Titre de l'article / annonce"
                      value={art.title}
                      onChange={(e) => handleUpdateArticle(idx, 'title', e.target.value)}
                      className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-md focus:ring-1 focus:ring-purple-500 font-medium"
                    />
                  </div>
                  <div>
                    <select
                      value={art.category}
                      onChange={(e) => handleUpdateArticle(idx, 'category', e.target.value as any)}
                      className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-md focus:ring-1 focus:ring-purple-500 bg-white"
                    >
                      <option value="IA & Tech">IA & Tech</option>
                      <option value="Fonctionnalité">Fonctionnalité</option>
                      <option value="Étude & Dataviz">Étude & Dataviz</option>
                      <option value="Outillage">Outillage</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <LinkIcon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <input
                    type="url"
                    placeholder="URL source (ex: https://github.com/...)"
                    value={art.url || ''}
                    onChange={(e) => handleUpdateArticle(idx, 'url', e.target.value)}
                    className="w-full px-3 py-1 text-xs border border-slate-300 rounded-md focus:ring-1 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <textarea
                    rows={2}
                    placeholder="Résumé synthétique de la ressource..."
                    value={art.summary}
                    onChange={(e) => handleUpdateArticle(idx, 'summary', e.target.value)}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-md focus:ring-1 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="💡 Enseignement clé / Takeaway (ex: 'À tester absolument pour les builds Next.js')"
                    value={art.takeaway}
                    onChange={(e) => handleUpdateArticle(idx, 'takeaway', e.target.value)}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-md focus:ring-1 focus:ring-purple-500 font-medium text-slate-800 bg-white"
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
