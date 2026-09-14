'use client';

import { useState } from 'react';
import { NewsletterIssue } from '@/lib/types';
import { Send, X, AlertCircle, CheckCircle2, Loader2, Mail } from 'lucide-react';

interface SendModalProps {
  isOpen: boolean;
  onClose: () => void;
  issue: Partial<NewsletterIssue>;
  onSuccessSent?: () => void;
}

export function SendModal({ isOpen, onClose, issue, onSuccessSent }: SendModalProps) {
  const [recipient, setRecipient] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string; simulated?: boolean } | null>(null);

  if (!isOpen) return null;

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient.trim()) return;

    setIsSending(true);
    setResult(null);

    try {
      const res = await fetch('/api/newsletter/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: recipient.trim(),
          issue,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Une erreur s\'est produite lors de l\'envoi.');
      }

      setResult({
        success: true,
        message: data.message || 'Newsletter envoyée avec succès !',
        simulated: data.simulated,
      });

      if (onSuccessSent) onSuccessSent();
    } catch (err: any) {
      setResult({
        success: false,
        message: err.message || 'Erreur d\'envoi.',
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Mail className="w-5 h-5 text-purple-600" />
            Envoyer l'Édition Newsletter
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSend} className="p-6 space-y-4">
          
          <div className="bg-purple-50 p-3.5 rounded-xl border border-purple-200 text-xs text-purple-900 space-y-1">
            <div>
              <strong>Édition :</strong> {issue.title || 'Sans titre'}
            </div>
            <div>
              <strong>Objet :</strong> {issue.subject_line || 'Sans objet'}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Adresse E-mail du Destinataire (Test ou Liste)
            </label>
            <input
              type="email"
              required
              placeholder="votre.email@exemple.com"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600"
            />
          </div>

          {result && (
            <div
              className={`p-3.5 rounded-xl text-xs flex items-start gap-2.5 ${
                result.success
                  ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                  : 'bg-rose-50 text-rose-900 border border-rose-200'
              }`}
            >
              {result.success ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              )}
              <div>
                <strong>{result.success ? 'Succès' : 'Erreur'} :</strong> {result.message}
                {result.simulated && (
                  <p className="mt-1 text-[11px] text-emerald-800">
                    💡 Pour envoyer un véritable e-mail via Resend, configurez votre <code className="bg-emerald-100 px-1 rounded">RESEND_API_KEY</code> dans le fichier <code className="bg-emerald-100 px-1 rounded">.env.local</code>.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Footer Buttons */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Fermer
            </button>
            <button
              type="submit"
              disabled={isSending}
              className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 disabled:opacity-50 rounded-lg shadow-sm transition-colors"
            >
              {isSending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Envoi en cours...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" /> Confirmer l'envoi
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
