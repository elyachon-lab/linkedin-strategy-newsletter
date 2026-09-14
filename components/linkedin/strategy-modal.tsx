'use client';

import { useState, useEffect } from 'react';
import { StrategyCard, StrategyCategory } from '@/lib/types';
import { X, Plus, Trash, Sparkles } from 'lucide-react';

interface StrategyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (card: Partial<StrategyCard>) => void;
  initialData?: StrategyCard | null;
}

const CATEGORIES: StrategyCategory[] = [
  'Hook',
  'Algorithme',
  'Planning',
  'Format',
  'Engagement',
  'Copywriting',
];

export function StrategyModal({ isOpen, onClose, onSave, initialData }: StrategyModalProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<StrategyCategory>('Hook');
  const [tagsInput, setTagsInput] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [examples, setExamples] = useState<string[]>(['']);
  const [isPinned, setIsPinned] = useState(false);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setCategory(initialData.category || 'Hook');
      setTagsInput(initialData.tags ? initialData.tags.join(', ') : '');
      setSummary(initialData.summary || '');
      setContent(initialData.content || '');
      setExamples(initialData.examples && initialData.examples.length > 0 ? initialData.examples : ['']);
      setIsPinned(!!initialData.is_pinned);
    } else {
      setTitle('');
      setCategory('Hook');
      setTagsInput('');
      setSummary('');
      setContent('');
      setExamples(['']);
      setIsPinned(false);
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleAddExample = () => {
    setExamples([...examples, '']);
  };

  const handleExampleChange = (index: number, value: string) => {
    const updated = [...examples];
    updated[index] = value;
    setExamples(updated);
  };

  const handleRemoveExample = (index: number) => {
    setExamples(examples.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !summary.trim()) return;

    const parsedTags = tagsInput
      .split(',')
      .map((t) => t.trim().toLowerCase())
      .filter(Boolean);

    const cleanedExamples = examples.filter((ex) => ex.trim().length > 0);

    onSave({
      id: initialData?.id,
      title,
      category,
      tags: parsedTags,
      summary,
      content,
      examples: cleanedExamples,
      is_pinned: isPinned,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8 transform transition-all">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            {initialData ? 'Modifier la Fiche Stratégique' : 'Nouvelle Fiche Stratégique LinkedIn'}
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Titre de la Règle / Conseil <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="ex: Structure d'un carrousel à fort Dwell Time"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
            />
          </div>

          {/* Category & Pinned */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Catégorie <span className="text-rose-500">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as StrategyCategory)}
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 bg-white"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center pt-5">
              <label className="inline-flex items-center gap-2 cursor-pointer text-sm font-medium text-slate-700">
                <input
                  type="checkbox"
                  checked={isPinned}
                  onChange={(e) => setIsPinned(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                />
                Épingler en haut de liste
              </label>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Mots-clés / Tags (séparés par des virgules)
            </label>
            <input
              type="text"
              placeholder="hook, carrousel, timing, conversion, b2b"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
            />
          </div>

          {/* Summary */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Résumé synthétique <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={2}
              required
              placeholder="Brève description lisible directement sur la carte."
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
            />
          </div>

          {/* Detailed Content */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Guide détaillé / Consignes (Markdown supporté)
            </label>
            <textarea
              rows={5}
              placeholder="Expliquez la méthodologie, les chiffres clés, les étapes à suivre..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3.5 py-2 text-sm font-mono border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
            />
          </div>

          {/* Dynamic Examples */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Exemples / Hooks prêts à copier
              </label>
              <button
                type="button"
                onClick={handleAddExample}
                className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Ajouter un exemple
              </button>
            </div>
            
            <div className="space-y-2">
              {examples.map((ex, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder={`Exemple #${index + 1} (ex: "J'ai analysé 1000 posts LinkedIn...")`}
                    value={ex}
                    onChange={(e) => handleExampleChange(index, e.target.value)}
                    className="flex-1 px-3 py-1.5 text-xs border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  {examples.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveExample(index)}
                      className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors"
            >
              {initialData ? 'Enregistrer les modifications' : 'Créer la fiche'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
