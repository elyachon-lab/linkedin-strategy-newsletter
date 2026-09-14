'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { NewsletterIssue } from '@/lib/types';
import { INITIAL_NEWSLETTERS } from '@/lib/supabase/fallback-data';
import { SendModal } from '@/components/newsletter/send-modal';
import { Mail, Plus, Sparkles, Send, CheckCircle2, Clock, Calendar, Globe } from 'lucide-react';

export default function NewsletterDashboardPage() {
  const [newsletters, setNewsletters] = useState<NewsletterIssue[]>(INITIAL_NEWSLETTERS);
  const [selectedForSend, setSelectedForSend] = useState<NewsletterIssue | null>(null);
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);

  useEffect(() => {
    fetch('/api/newsletter')
      .then((res) => res.json())
      .then((data) => {
        if (data.newsletters) setNewsletters(data.newsletters);
      })
      .catch(() => {});
  }, []);

  const handleOpenSend = (issue: NewsletterIssue) => {
    setSelectedForSend(issue);
    setIsSendModalOpen(true);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2.5">
            <Mail className="w-7 h-7 text-purple-600" />
            Gestionnaire de Newsletter & Veille Tech
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Compilez et envoyez vos récapitulatifs hebdomadaires de veille technologique et tendances.
          </p>
        </div>

        <Link
          href="/newsletter/create"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl font-semibold text-sm shadow-sm transition-all hover:shadow hover:-translate-y-0.5"
        >
          <Plus className="w-4 h-4" /> Rédiger une Nouvelle Édition
        </Link>
      </div>

      {/* List of Newsletter Issues */}
      <div className="space-y-4">
        {newsletters.map((issue) => (
          <div
            key={issue.id}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-purple-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-md">
                  Édition #{issue.issue_number}
                </span>
                <span
                  className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                    issue.status === 'sent'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {issue.status === 'sent' ? (
                    <>
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Envoyé
                    </>
                  ) : (
                    <>
                      <Clock className="w-3 h-3 text-amber-600" /> Brouillon
                    </>
                  )}
                </span>
                {issue.sent_at && (
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> Envoyé le {new Date(issue.sent_at).toLocaleDateString('fr-FR')}
                  </span>
                )}
              </div>

              <h2 className="text-lg font-bold text-slate-900 leading-snug">{issue.title}</h2>
              <p className="text-xs text-slate-600 font-medium">Objet : {issue.subject_line}</p>

              {issue.articles && issue.articles.length > 0 && (
                <div className="flex items-center gap-2 pt-1">
                  <Globe className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-xs text-slate-500">
                    {issue.articles.length} article(s) : {issue.articles.map((a) => a.title).join(', ')}
                  </span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-3 shrink-0">
              <Link
                href="/newsletter/create"
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Éditer / Prévisualiser
              </Link>
              <button
                onClick={() => handleOpenSend(issue)}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-lg shadow-xs transition-colors"
              >
                <Send className="w-3.5 h-3.5" /> Envoi Test / Resend
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Send Modal */}
      {selectedForSend && (
        <SendModal
          isOpen={isSendModalOpen}
          onClose={() => setIsSendModalOpen(false)}
          issue={selectedForSend}
          onSuccessSent={() => {
            setNewsletters((prev) =>
              prev.map((n) =>
                n.id === selectedForSend.id ? { ...n, status: 'sent', sent_at: new Date().toISOString() } : n
              )
            );
          }}
        />
      )}

    </div>
  );
}
