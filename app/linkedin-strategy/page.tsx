'use client';

import { useState, useEffect } from 'react';
import { StrategyCard, StrategyCategory } from '@/lib/types';
import { INITIAL_STRATEGIES } from '@/lib/supabase/fallback-data';
import { StrategyCardComponent } from '@/components/linkedin/strategy-card';
import { StrategyModal } from '@/components/linkedin/strategy-modal';
import { Search, Plus, BookOpen, Filter, RefreshCw, Feather } from 'lucide-react';

export default function StrategyCenterPage() {
  const [strategies, setStrategies] = useState<StrategyCard[]>(INITIAL_STRATEGIES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<StrategyCard | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const categories = ['Tous', 'Hook', 'Algorithme', 'Planning', 'Format', 'Engagement', 'Copywriting'];

  const fetchStrategies = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/linkedin-strategies');
      const data = await res.json();
      if (data.strategies) {
        setStrategies(data.strategies);
      }
    } catch {
      // Keep state
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStrategies();
  }, []);

  const handleSaveCard = async (cardData: Partial<StrategyCard>) => {
    if (cardData.id) {
      setStrategies((prev) =>
        prev.map((c) => (c.id === cardData.id ? ({ ...c, ...cardData } as StrategyCard) : c))
      );
      try {
        await fetch('/api/linkedin-strategies', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(cardData),
        });
      } catch {}
    } else {
      const newCard: StrategyCard = {
        id: 'strat-' + Date.now(),
        title: cardData.title || '',
        category: (cardData.category as StrategyCategory) || 'Hook',
        tags: cardData.tags || [],
        summary: cardData.summary || '',
        content: cardData.content || '',
        examples: cardData.examples || [],
        is_pinned: cardData.is_pinned || false,
        created_at: new Date().toISOString(),
      };
      setStrategies([newCard, ...strategies]);
      try {
        await fetch('/api/linkedin-strategies', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(cardData),
        });
      } catch {}
    }
  };

  const handleDeleteCard = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      setStrategies((prev) => prev.filter((c) => c.id !== id));
      try {
        await fetch(`/api/linkedin-strategies?id=${id}`, { method: 'DELETE' });
      } catch {}
    }
  };

  const handleEdit = (card: StrategyCard) => {
    setEditingCard(card);
    setIsModalOpen(true);
  };

  const filteredStrategies = strategies
    .filter((strat) => {
      if (selectedCategory !== 'Tous' && strat.category !== selectedCategory) {
        return false;
      }
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        strat.title.toLowerCase().includes(q) ||
        strat.summary.toLowerCase().includes(q) ||
        strat.content.toLowerCase().includes(q) ||
        strat.category.toLowerCase().includes(q) ||
        (strat.tags && strat.tags.some((t) => t.toLowerCase().includes(q))) ||
        (strat.examples && strat.examples.some((ex) => ex.toLowerCase().includes(q)))
      );
    })
    .sort((a, b) => {
      if (a.is_pinned && !b.is_pinned) return -1;
      if (!a.is_pinned && b.is_pinned) return 1;
      return 0;
    });

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6 bg-white p-6 sm:p-8 rounded-3xl border border-indigo-100 brand-card-shadow">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full mb-2">
            <Feather className="w-3.5 h-3.5 text-indigo-600" /> Blog Strategy & Best Practices
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-indigo-950 tracking-tight">
            Fiches Stratégiques & Guide de l'Algorithme
          </h1>
          <p className="text-sm font-medium text-slate-500 mt-1">
            Découvrez nos articles détaillés, guides de rédaction et consignes d'optimisation d'audience.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={fetchStrategies}
            className="p-2.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-2xl transition-colors border border-slate-200"
            title="Rafraîchir"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={() => {
              setEditingCard(null);
              setIsModalOpen(true);
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-950 hover:bg-slate-900 text-cyan-300 rounded-2xl font-extrabold text-xs shadow-md transition-all border border-indigo-800"
          >
            <Plus className="w-4 h-4 text-cyan-300" /> Nouvel Article
          </button>
        </div>
      </div>

      {/* Search & Category Filter */}
      <div className="space-y-4">
        <div className="relative max-w-2xl">
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-indigo-600" />
          <input
            type="text"
            placeholder="Rechercher par mot-clé dans les articles (titre, tag, algorithme)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-300 rounded-2xl text-xs font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-600 transition-all shadow-2xs"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider flex items-center gap-1 shrink-0 mr-1">
            <Filter className="w-3.5 h-3.5 text-indigo-600" /> Catégories :
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-indigo-950 text-cyan-300 shadow-xs border border-indigo-800'
                  : 'bg-white text-slate-700 hover:bg-indigo-50 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      {filteredStrategies.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 space-y-3">
          <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="font-serif text-lg font-bold text-slate-800">Aucun article ne correspond à votre recherche</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Essayez de modifier votre mot-clé "{searchQuery}" ou de sélectionner une autre catégorie.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('Tous');
            }}
            className="text-xs font-semibold text-blue-600 hover:underline pt-2 inline-block font-sans"
          >
            Réinitialiser les filtres
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredStrategies.map((card) => (
            <StrategyCardComponent
              key={card.id}
              card={card}
              searchQuery={searchQuery}
              onEdit={handleEdit}
              onDelete={handleDeleteCard}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      <StrategyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveCard}
        initialData={editingCard}
      />

    </div>
  );
}
