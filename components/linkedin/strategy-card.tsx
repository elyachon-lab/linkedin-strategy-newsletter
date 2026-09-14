'use client';

import { useState } from 'react';
import { StrategyCard } from '@/lib/types';
import { Pin, Copy, Check, Edit2, Trash2, ChevronDown, ChevronUp, Sparkles, Hash, Clock, User, ArrowUpRight } from 'lucide-react';

interface StrategyCardProps {
  card: StrategyCard;
  searchQuery?: string;
  onEdit?: (card: StrategyCard) => void;
  onDelete?: (id: string) => void;
  layoutStyle?: 'grid' | 'full';
}

export function StrategyCardComponent({ card, searchQuery = '', onEdit, onDelete, layoutStyle = 'grid' }: StrategyCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedContent, setCopiedContent] = useState(false);

  const categoryColors: Record<string, string> = {
    Hook: 'bg-amber-100/80 text-amber-900 border-amber-200',
    Algorithme: 'bg-indigo-100/80 text-indigo-900 border-indigo-200',
    Planning: 'bg-emerald-100/80 text-emerald-900 border-emerald-200',
    Format: 'bg-purple-100/80 text-purple-900 border-purple-200',
    Engagement: 'bg-rose-100/80 text-rose-900 border-rose-200',
    Copywriting: 'bg-blue-100/80 text-blue-900 border-blue-200',
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

  // Estimate reading time based on word count
  const wordCount = (card.summary + ' ' + (card.content || '')).split(/\s+/).length;
  const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 180));

  const highlightText = (text: string) => {
    if (!searchQuery.trim()) return text;
    const parts = text.split(new RegExp(`(${searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === searchQuery.toLowerCase() ? (
            <mark key={i} className="bg-amber-200 text-amber-950 font-semibold px-0.5 rounded">
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
    <article
      className={`group bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between ${
        card.is_pinned ? 'ring-2 ring-blue-500/20 border-blue-300' : ''
      }`}
    >
      <div className="p-6 sm:p-7 space-y-4">
        
        {/* Article Meta Bar (Category, Reading Time, Pinned Badge) */}
        <div className="flex items-center justify-between text-xs text-slate-500 gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <span
              className={`font-semibold px-3 py-1 rounded-full text-[11px] uppercase tracking-wider border ${
                categoryColors[card.category] || 'bg-slate-100 text-slate-800 border-slate-200'
              }`}
            >
              {card.category}
            </span>
            {card.is_pinned && (
              <span className="inline-flex items-center gap-1 font-semibold text-[11px] bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full border border-blue-200">
                <Pin className="w-3 h-3 fill-current" /> Épinglé
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 text-slate-400 font-sans text-[11px]">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {readingTimeMinutes} min de lecture
            </span>
            {onEdit && (
              <button
                onClick={() => onEdit(card)}
                className="text-slate-400 hover:text-slate-700 transition-colors p-1"
                title="Modifier l'article"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(card.id)}
                className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                title="Supprimer l'article"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Blog Post Title */}
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">
          {highlightText(card.title)}
        </h2>

        {/* Excerpt / Summary */}
        <p className="font-sans text-sm text-slate-600 leading-relaxed line-clamp-3">
          {highlightText(card.summary)}
        </p>

        {/* Tags Pills */}
        {card.tags && card.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {card.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-medium text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200/60"
              >
                #{highlightText(tag)}
              </span>
            ))}
          </div>
        )}

        {/* Featured Examples Box */}
        {card.examples && card.examples.length > 0 && (
          <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 bg-slate-50/80 -mx-6 -mb-6 p-6">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 font-sans">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Modèles d'Accroches prêts à l'emploi
            </h4>
            <div className="space-y-2">
              {card.examples.map((ex, idx) => (
                <div
                  key={idx}
                  className="bg-white p-3 rounded-xl border border-slate-200/80 text-xs text-slate-800 flex items-center justify-between gap-3 shadow-2xs hover:border-blue-300 transition-colors"
                >
                  <span className="font-serif italic text-slate-800 font-medium">"{highlightText(ex)}"</span>
                  <button
                    onClick={() => copyToClipboard(ex, idx)}
                    className="shrink-0 text-slate-400 hover:text-blue-600 p-1.5 rounded-lg hover:bg-blue-50 transition-colors"
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

      {/* Inline Article Reader Toggle */}
      {card.content && (
        <div className="border-t border-slate-100 bg-slate-50/40 px-6 py-3">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-between text-xs font-semibold text-slate-700 hover:text-blue-600 transition-colors"
          >
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-slate-400" />
              {isExpanded ? 'Fermer l\'article' : 'Lire l\'article complet'}
            </span>
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {isExpanded && (
            <div className="mt-4 pt-4 border-t border-slate-200/80 space-y-4">
              <div className="flex justify-end">
                <button
                  onClick={() => copyToClipboard(card.content)}
                  className="inline-flex items-center gap-1.5 text-xs text-blue-700 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-200 font-semibold"
                >
                  {copiedContent ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedContent ? 'Copié !' : 'Copier l\'article'}
                </button>
              </div>

              {/* Native Editorial Article Layout */}
              <div className="bg-white p-6 rounded-xl border border-slate-200/80 font-sans text-xs text-slate-800 leading-relaxed space-y-3 shadow-2xs whitespace-pre-line">
                {highlightText(card.content)}
              </div>
            </div>
          )}
        </div>
      )}
    </article>
  );
}
