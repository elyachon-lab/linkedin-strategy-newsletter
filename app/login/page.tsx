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

  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const cleanInput = linkedinUrl.trim();
    if (!cleanInput) {
      setErrorMessage('Veuillez renseigner votre URL ou identifiant LinkedIn.');
      return;
    }

    setIsLoading(true);

    let handle = cleanInput;
    let fullUrl = cleanInput;

    if (cleanInput.includes('linkedin.com/in/')) {
      const extracted = cleanInput.split('linkedin.com/in/')[1]?.split('/')[0]?.split('?')[0];
      if (extracted) handle = extracted;
    } else {
      handle = cleanInput.replace('@', '').replace('https://', '').replace('http://', '').trim();
    }

    if (!fullUrl.startsWith('http://') && !fullUrl.startsWith('https://')) {
      fullUrl = `https://www.linkedin.com/in/${handle}`;
    }

    const userProfile = {
      username: handle || 'membre',
      fullName: (handle || 'Membre').charAt(0).toUpperCase() + (handle || 'membre').slice(1).replace(/[-_]/g, ' '),
      industry: 'SaaS & Tech',
      role: 'Professionnel B2B',
      linkedinUrl: fullUrl,
      followerCount: 0,
      userSyncData: {
        isConnected: false,
        weeklyPostFrequency: 1.0,
      },
    };

    localStorage.setItem('linkedin_user_profile', JSON.stringify(userProfile));
    document.cookie = `linkedin_user_profile=true; path=/; max-age=86400`;

    // Background profile save to API
    try {
      await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userProfile),
      });
    } catch {}

    setIsLoading(false);
    router.push(redirectTo);
  };

  return (
    <div className="max-w-md mx-auto my-12 bg-[#0D1117] p-8 rounded-xl border border-zinc-800 brand-card-shadow space-y-6 text-white">
      
      <div className="text-center space-y-2">
        <div className="w-12 h-12 bg-sky-500/10 border border-sky-500/30 text-sky-400 rounded-xl flex items-center justify-center mx-auto shadow-sm">
          <Linkedin className="w-6 h-6 text-sky-400" />
        </div>
        <h1 className="text-2xl font-black text-white">Accès à la Bible LinkedIn</h1>
        <p className="text-xs font-medium text-zinc-400">
          Renseignez uniquement votre profil LinkedIn pour débloquer votre audit IA et vos fiches stratégiques.
        </p>
      </div>

      {/* 1-Click LinkedIn OAuth Connection */}
      <div className="space-y-3">
        <Link
          href="/connect-linkedin"
          className="w-full py-3.5 bg-[#0A66C2] hover:bg-[#004182] text-white font-extrabold rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-2.5"
        >
          <Linkedin className="w-5 h-5 fill-white text-white" />
          <span>Connexion Officielle LinkedIn (1-Clic)</span>
        </Link>
        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-zinc-800"></div>
          <span className="flex-shrink mx-3 text-[10px] font-extrabold text-zinc-500 uppercase tracking-wider">Ou via URL LinkedIn</span>
          <div className="flex-grow border-t border-zinc-800"></div>
        </div>
      </div>

      <form onSubmit={handleLoginSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase text-zinc-300 mb-2 flex items-center gap-1.5">
            <Linkedin className="w-4 h-4 text-sky-400" /> Collez votre URL de profil LinkedIn <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="https://www.linkedin.com/in/votre-profil"
            value={linkedinUrl}
            onChange={(e) => setLinkedinUrl(e.target.value)}
            className="w-full px-4 py-3 text-xs bg-[#161B22] border border-zinc-800 rounded-xl focus:outline-none focus:border-sky-500 font-semibold text-white placeholder-zinc-500 transition-all"
          />
        </div>

        {errorMessage && (
          <div className="p-3 bg-rose-950/40 border border-rose-800/50 rounded-xl text-xs font-bold text-rose-300 text-center">
            {errorMessage}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 bg-sky-600 hover:bg-sky-500 text-white font-extrabold rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" /> Connexion & Déverrouillage...
            </>
          ) : (
            <>
              Valider et accéder à mon audit <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

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
