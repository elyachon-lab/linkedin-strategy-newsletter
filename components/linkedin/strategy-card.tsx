'use client';

import { useState } from 'react';
import { StrategyCard } from '@/lib/types';
import { Pin, Copy, Check, Edit2, Trash2, ChevronDown, ChevronUp, Sparkles, Hash } from 'lucide-react';

interface StrategyCardProps {
  card: StrategyCard;
  searchQuery?: string;
  onEdit?: (card: StrategyCard) => void;
  onDelete?: (id: string) => void;
}

export function StrategyCardComponent({ card, searchQuery = '', onEdit, onDelete }: StrategyCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedContent, setCopiedContent] = useState(false);

  const categoryColors: Record<string, string> = {
    Hook: 'bg-amber-50 text-amber-800 border-amber-200/80',
    Algorithme: 'bg-indigo-50 text-indigo-800 border-indigo-200/80',
    Planning: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
    Format: 'bg-purple-50 text-purple-800 border-purple-200/80',
    Engagement: 'bg-rose-50 text-rose-800 border-rose-200/80',
    Copywriting: 'bg-blue-50 text-blue-800 border-blue-200/80',
  };

  const copyToClipboard = (text: string, index?: number) => {
    navigator.clipboard.writeText(text);
    if (index !== undefined) {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } else {
      setCopiedContent(true);
      setTimeout(() => setCopiedContent(false), 2000);
    }
  };

  // Simple text highlighter for search matches
  const highlightText = (text: string) => {
    if (!searchQuery.trim()) return text;
    const parts = text.split(new RegExp(`(${searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === searchQuery.toLowerCase() ? (
            <mark key={i} className="bg-amber-200 text-amber-900 font-semibold px-0.5 rounded">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <div
      className={`bg-white rounded-xl border transition-all duration-200 overflow-hidden shadow-sm hover:shadow-md ${
        card.is_pinned ? 'border-blue-300 ring-1 ring-blue-100' : 'border-slate-200'
      }`}
    >
      {/* Header Bar */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${
                categoryColors[card.category] || 'bg-slate-100 text-slate-800 border-slate-200'
              }`}
            >
              {card.category}
            </span>
            {card.is_pinned && (
              <span className="inline-flex items-center gap-1 text-xs font-medium bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                <Pin className="w-3 h-3 fill-current" /> Épinglé
              </span>
            )}
          </div>

          <div className="flex items-center space-x-1 opacity-80 hover:opacity-100">
            {onEdit && (
              <button
                onClick={() => onEdit(card)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-md hover:bg-slate-100 transition-colors"
                title="Modifier"
              >
                <Edit2 className="w-4 h-4" />
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(card.id)}
                className="p-1.5 text-slate-400 hover:text-rose-600 rounded-md hover:bg-rose-50 transition-colors"
                title="Supprimer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug">
          {highlightText(card.title)}
        </h3>

        {/* Summary */}
        <p className="text-sm text-slate-600 leading-relaxed mb-4">
          {highlightText(card.summary)}
        </p>

        {/* Tags */}
        {card.tags && card.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {card.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 text-xs text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full hover:bg-slate-200 transition-colors cursor-default"
              >
                <Hash className="w-3 h-3 text-slate-400" />
                {highlightText(tag)}
              </span>
            ))}
          </div>
        )}

        {/* Examples Section */}
        {card.examples && card.examples.length > 0 && (
          <div className="mt-4 pt-3 border-t border-slate-100 bg-slate-50/70 -mx-5 -mb-5 p-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Exemples & Exemples de Hooks à copier
            </h4>
            <div className="space-y-2">
              {card.examples.map((ex, idx) => (
                <div
                  key={idx}
                  className="group relative bg-white p-3 rounded-lg border border-slate-200 text-xs text-slate-800 flex items-center justify-between gap-3 hover:border-blue-300 transition-colors"
                >
                  <span className="italic font-medium text-slate-700">{highlightText(ex)}</span>
                  <button
                    onClick={() => copyToClipboard(ex, idx)}
                    className="shrink-0 text-slate-400 group-hover:text-blue-600 p-1 rounded hover:bg-blue-50 transition-colors"
                    title="Copier le hook"
                  >
                    {copiedIndex === idx ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Expandable Markdown Guide Body */}
      {card.content && (
        <div className="border-t border-slate-100 bg-slate-50/50 px-5 py-3">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-between text-xs font-semibold text-slate-700 hover:text-blue-600 transition-colors py-1"
          >
            <span>{isExpanded ? 'Masquer le guide détaillé' : 'Voir les consignes & règles détaillées'}</span>
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {isExpanded && (
            <div className="mt-3 pt-3 border-t border-slate-200 text-xs text-slate-700 space-y-3 prose prose-slate max-w-none">
              <div className="flex justify-end mb-2">
                <button
                  onClick={() => copyToClipboard(card.content)}
                  className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 bg-blue-50 px-2.5 py-1 rounded border border-blue-200 font-medium"
                >
                  {copiedContent ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedContent ? 'Copié !' : 'Copier tout le guide'}
                </button>
              </div>
              <div className="whitespace-pre-line leading-relaxed bg-white p-4 rounded-lg border border-slate-200 font-mono text-[11px] text-slate-800">
                {highlightText(card.content)}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
