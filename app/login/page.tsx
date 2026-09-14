'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Mail, Lock, Sparkles, ArrowRight, Loader2, KeyRound, UserPlus, ShieldCheck, Linkedin } from 'lucide-react';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') || '/mon-espace-linkedin';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      const supabase = createClient();

      // Attempt Supabase Auth login
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        // Check if admin password was entered or local demo session
        const ROBUST_PASS = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'LinkedIn_Pro2026!Secured';
        if (password === ROBUST_PASS) {
          localStorage.setItem('is_admin_logged_in', 'true');
          document.cookie = `is_admin_logged_in=true; path=/; max-age=86400`;
          router.push('/newsletter');
          return;
        }

        // Demo / Fallback login for user
        if (email.includes('@') && password.length >= 6) {
          const userProfile = {
            username: email.split('@')[0],
            fullName: email.split('@')[0].replace('.', ' '),
            industry: 'SaaS & Tech',
            role: 'Membre B2B',
            followerCount: 2500,
          };
          localStorage.setItem('linkedin_user_profile', JSON.stringify(userProfile));
          document.cookie = `linkedin_user_profile=true; path=/; max-age=86400`;
          router.push(redirectTo);
          return;
        }

        setErrorMessage(error.message || 'Identifiants incorrects.');
        setIsLoading(false);
        return;
      }

      if (data.session) {
        // Fetch or create profile info
        const userProfile = {
          username: data.session.user.user_metadata?.username || email.split('@')[0],
          fullName: data.session.user.user_metadata?.full_name || 'Membre LinkedIn',
          industry: data.session.user.user_metadata?.industry || 'SaaS & Tech',
          role: data.session.user.user_metadata?.role || 'Créateur B2B',
          followerCount: 2500,
        };
        localStorage.setItem('linkedin_user_profile', JSON.stringify(userProfile));
        document.cookie = `linkedin_user_profile=true; path=/; max-age=86400`;
        router.push(redirectTo);
      }
    } catch {
      setErrorMessage('Une erreur est survenue lors de la connexion.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-12 bg-white p-8 rounded-3xl border-2 border-metricool-purple metricool-card-shadow space-y-6">
      
      <div className="text-center space-y-2">
        <div className="w-12 h-12 bg-metricool-purple text-metricool-yellow rounded-2xl flex items-center justify-center mx-auto shadow-md">
          <Linkedin className="w-6 h-6 text-metricool-yellow" />
        </div>
        <h1 className="text-2xl font-extrabold text-metricool-purple">Connexion à votre Compte</h1>
        <p className="text-xs font-medium text-slate-500">
          Connectez-vous pour accéder au Centre de Stratégie, à vos audits IA et à votre espace personnalisé.
        </p>
      </div>

      {redirectTo !== '/mon-espace-linkedin' && (
        <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 text-xs font-bold text-purple-900 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-600 shrink-0" />
          <span>Connectez-vous pour accéder à la page réservée : {redirectTo}</span>
        </div>
      )}

      {/* Metricool-style OAuth LinkedIn Quick Button */}
      <div className="space-y-3">
        <Link
          href="/connect-linkedin"
          className="w-full py-3.5 bg-[#0077B5] hover:bg-[#005E93] text-white font-extrabold rounded-2xl text-xs shadow-md transition-all flex items-center justify-center gap-2.5 border-2 border-blue-900/10"
        >
          <Linkedin className="w-5 h-5 fill-white text-white" />
          <span>Se Connecter via LinkedIn (Metricool Style)</span>
        </Link>
        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-slate-200"></div>
          <span className="flex-shrink mx-3 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Ou connexion par e-mail</span>
          <div className="flex-grow border-t border-slate-200"></div>
        </div>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-xs font-extrabold uppercase text-slate-700 mb-1 flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-metricool-purple" /> Adresse E-mail <span className="text-rose-500">*</span>
          </label>
          <input
            type="email"
            required
            placeholder="votre.email@exemple.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 text-xs border-2 border-slate-300 rounded-xl focus:border-metricool-purple font-bold text-slate-900"
          />
        </div>

        <div>
          <label className="block text-xs font-extrabold uppercase text-slate-700 mb-1 flex items-center gap-1.5">
            <KeyRound className="w-3.5 h-3.5 text-metricool-pink" /> Mot de Passe <span className="text-rose-500">*</span>
          </label>
          <input
            type="password"
            required
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 text-xs border-2 border-slate-300 rounded-xl focus:border-metricool-purple font-bold text-slate-900"
          />
        </div>

        {errorMessage && (
          <div className="p-3 bg-rose-50 border border-rose-300 rounded-xl text-xs font-extrabold text-rose-900 text-center">
            {errorMessage}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 bg-metricool-purple hover:bg-black text-metricool-yellow font-extrabold rounded-2xl text-xs shadow-md transition-all flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Connexion en cours...
            </>
          ) : (
            <>
              Se Connecter <ArrowRight className="w-4 h-4 text-metricool-yellow" />
            </>
          )}
        </button>
      </form>

      <div className="border-t border-slate-100 pt-4 text-center">
        <p className="text-xs text-slate-500 font-medium">
          Vous n'avez pas encore de compte ?{' '}
          <Link href="/signup" className="font-extrabold text-metricool-purple hover:underline">
            S'inscrire gratuitement
          </Link>
        </p>
      </div>

    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="text-center py-12 text-slate-500 font-bold">Chargement...</div>}>
      <LoginContent />
    </Suspense>
  );
}
