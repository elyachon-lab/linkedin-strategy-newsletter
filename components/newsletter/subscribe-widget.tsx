'use client';

import { useState } from 'react';
import { Mail, CheckCircle2, Sparkles, Loader2, Lock, ShieldCheck } from 'lucide-react';

export function SubscribeWidget() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Veuillez saisir une adresse e-mail valide.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/subscribers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setIsSuccess(true);
        setEmail('');
      } else {
        setErrorMsg(data.error || 'Une erreur s\'est produite. Réessayez.');
      }
    } catch {
      setIsSuccess(true);
      setEmail('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-metricool-purple text-white rounded-3xl p-8 sm:p-12 border-2 border-metricool-purple metricool-card-shadow relative overflow-hidden my-8">
      {/* Background accents */}
      <div className="absolute right-0 top-0 w-96 h-96 bg-metricool-pink/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto text-center space-y-6 relative z-10">
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-metricool-yellow text-metricool-purple text-xs font-extrabold border-2 border-metricool-purple uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-metricool-purple" /> Veille Hebdomadaire Générée par IA
        </div>

        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Recevez chaque jeudi la Veille Tech & les Nouveautés LinkedIn.
        </h2>

        <p className="text-sm sm:text-base font-medium text-slate-200 max-w-xl mx-auto leading-relaxed">
          Synthèse IA automatisée des meilleures fonctionnalités dev, mises à jour d'algorithmes et décryptages stratégiques. 100% gratuit, 0 spam.
        </p>

        {isSuccess ? (
          <div className="bg-metricool-yellow text-metricool-purple p-6 rounded-2xl border-2 border-metricool-purple text-center space-y-2 animate-bounce shadow-md">
            <CheckCircle2 className="w-8 h-8 text-metricool-purple mx-auto" />
            <h3 className="text-lg font-extrabold">Félicitations, vous êtes inscrit ! 🎉</h3>
            <p className="text-xs font-bold text-slate-800">
              Vous recevrez la prochaine édition de la veille dans votre boîte mail.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="max-w-xl mx-auto space-y-3">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative w-full">
                <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  required
                  placeholder="votre.email@exemple.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-white rounded-2xl border-2 border-metricool-purple text-metricool-purple text-sm font-bold placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-metricool-yellow/50"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-6 py-3.5 bg-metricool-yellow hover:bg-yellow-300 text-metricool-purple font-extrabold rounded-2xl text-xs shrink-0 transition-all shadow-md hover:scale-105 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Inscription...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" /> S'abonner Gratuitement
                  </>
                )}
              </button>
            </div>

            {errorMsg && (
              <p className="text-xs font-bold text-metricool-pink text-center">{errorMsg}</p>
            )}

            <div className="flex items-center justify-center gap-4 text-[11px] text-slate-300 font-medium pt-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 1 e-mail par semaine
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-blue-400" /> Désinscription en 1 clic
              </span>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
