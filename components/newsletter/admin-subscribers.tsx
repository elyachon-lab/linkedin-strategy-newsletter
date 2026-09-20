'use client';

import { useState, useEffect } from 'react';
import { Subscriber } from '@/lib/types';
import { Users, UserPlus, Trash2, Download, Search, Lock, RefreshCw, Mail, KeyRound } from 'lucide-react';

const ROBUST_ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'LinkedIn_Pro2026!Secured';

interface AdminSubscribersManagerProps {
  defaultAuthenticated?: boolean;
}

export function AdminSubscribersManager({ defaultAuthenticated = false }: AdminSubscribersManagerProps) {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(defaultAuthenticated);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const fetchSubscribers = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/subscribers');
      const data = await res.json();
      if (data.subscribers) setSubscribers(data.subscribers);
    } catch {
      // Keep state
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchSubscribers();
    }
  }, [isAuthenticated]);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ROBUST_ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPasswordError('');
    } else {
      setPasswordError('Mot de passe administrateur incorrect.');
    }
  };

  const handleAddSubscriber = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail.trim() || !newEmail.includes('@')) return;

    setIsAdding(true);
    try {
      const res = await fetch('/api/subscribers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newEmail.trim() }),
      });
      const data = await res.json();
      if (data.subscriber) {
        setSubscribers([data.subscriber, ...subscribers]);
      } else {
        const newSub: Subscriber = {
          id: 'sub-' + Date.now(),
          email: newEmail.trim().toLowerCase(),
          status: 'active',
          created_at: new Date().toISOString(),
        };
        setSubscribers([newSub, ...subscribers]);
      }
      setNewEmail('');
    } catch {
      // Fallback
    } finally {
      setIsAdding(false);
    }
  };

  const handleDeleteSubscriber = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir retirer cet abonné de la liste ?')) {
      setSubscribers((prev) => prev.filter((s) => s.id !== id));
      try {
        await fetch(`/api/subscribers?id=${id}`, {
          method: 'DELETE',
          headers: {
            'x-admin-password': process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'LinkedIn_Pro2026!Secured',
          },
        });
      } catch {}
    }
  };

  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['Email,Statut,Date d Inscription']
        .concat(subscribers.map((s) => `${s.email},${s.status},${s.created_at}`))
        .join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `abonnés_newsletter_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredSubscribers = subscribers.filter((s) =>
    s.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isAuthenticated) {
    return (
      <div className="bg-white p-8 rounded-3xl border border-indigo-100 brand-card-shadow max-w-md mx-auto my-8 space-y-4">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-indigo-950 text-cyan-300 rounded-2xl flex items-center justify-center mx-auto shadow-md">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-extrabold text-indigo-950">Espace Administrateur Newsletter</h3>
          <p className="text-xs font-medium text-slate-500">
            Zone protégée. Saisissez votre mot de passe administrateur sécurisé.
          </p>
        </div>

        <form onSubmit={handleAdminLogin} className="space-y-4 pt-2">
          <div>
            <label className="block text-xs font-extrabold uppercase text-indigo-950 mb-1.5 flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-violet-600" /> Mot de passe Administrateur
            </label>
            <input
              type="password"
              required
              placeholder="Entrez votre mot de passe sécurisé"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full px-4 py-3 text-sm border border-slate-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/20 font-bold"
            />
          </div>

          {passwordError && (
            <p className="text-xs font-bold text-rose-600 text-center bg-rose-50 p-2 rounded-xl border border-rose-200">
              {passwordError}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-3.5 bg-indigo-950 hover:bg-slate-900 text-cyan-300 font-extrabold rounded-2xl text-xs shadow-md transition-all hover:scale-105"
          >
            Se connecter à l'Administration
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-indigo-100 brand-card-shadow space-y-6">
      
      {/* Header Admin Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-xl font-extrabold text-indigo-950 flex items-center gap-2">
            <Users className="w-6 h-6 text-indigo-600" />
            Gestion de l'Audience & Abonnés Newsletter ({subscribers.length})
          </h3>
          <p className="text-xs font-medium text-slate-500 mt-0.5">
            Liste sécurisée des destinataires de la veille hebdomadaire.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={fetchSubscribers}
            className="p-2 text-slate-500 hover:text-indigo-950 rounded-xl hover:bg-slate-100 transition-colors"
            title="Rafraîchir la liste"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-3 py-2 text-xs font-extrabold text-rose-700 bg-rose-50 rounded-xl hover:bg-rose-100 transition-colors border border-rose-200"
          >
            Déconnexion
          </button>

          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-extrabold text-cyan-300 bg-indigo-950 border border-indigo-800 rounded-xl hover:bg-slate-900 transition-colors shadow-2xs"
          >
            <Download className="w-3.5 h-3.5" /> Exporter CSV
          </button>
        </div>
      </div>

      {/* Add New Subscriber Form */}
      <form onSubmit={handleAddSubscriber} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          required
          placeholder="Ajouter manuellement un e-mail abonné (ex: abonné@societe.com)"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          className="flex-1 px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:border-indigo-600 font-medium"
        />
        <button
          type="submit"
          disabled={isAdding}
          className="px-5 py-2.5 bg-indigo-950 text-cyan-300 font-extrabold rounded-xl text-xs shadow-2xs hover:bg-slate-900 transition-colors shrink-0 flex items-center justify-center gap-1.5"
        >
          <UserPlus className="w-4 h-4" /> Ajouter l'abonné
        </button>
      </form>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Filtrer les abonnés par adresse e-mail..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 text-xs border border-slate-300 rounded-xl focus:border-indigo-600 font-medium"
        />
      </div>

      {/* Subscribers Table */}
      <div className="overflow-x-auto border border-indigo-100 rounded-2xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-indigo-950 text-cyan-300 font-extrabold uppercase tracking-wider">
            <tr>
              <th className="px-4 py-3.5">Adresse E-mail</th>
              <th className="px-4 py-3.5">Statut</th>
              <th className="px-4 py-3.5">Date d'inscription</th>
              <th className="px-4 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white font-medium">
            {filteredSubscribers.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-slate-400 font-normal">
                  Aucun abonné ne correspond à la recherche.
                </td>
              </tr>
            ) : (
              filteredSubscribers.map((sub) => (
                <tr key={sub.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3.5 font-bold text-slate-900 flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-indigo-600" />
                    {sub.email}
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-extrabold text-[11px] bg-emerald-100 text-emerald-900 border border-emerald-300">
                      Actif
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-slate-500 font-bold">
                    {new Date(sub.created_at).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <button
                      onClick={() => handleDeleteSubscriber(sub.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                      title="Désinscrire l'abonné"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
