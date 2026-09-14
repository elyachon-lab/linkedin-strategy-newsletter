'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Mail, Lock, User, Linkedin, Sparkles, ArrowRight, Loader2, KeyRound, UserPlus } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [industry, setIndustry] = useState('SaaS & Tech');
  const [role, setRole] = useState('Créateur B2B');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (!email.trim() || !password || !fullName.trim()) return;

    setIsLoading(true);

    try {
      const supabase = createClient();
      const cleanUsername = (username || email.split('@')[0]).replace('@', '').trim();

      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: fullName.trim(),
            username: cleanUsername,
            industry,
            role,
            linkedin_url: `https://www.linkedin.com/in/${cleanUsername}`,
          },
        },
      });

      if (error) {
        setErrorMessage(error.message || 'Erreur lors de la création du compte.');
        setIsLoading(false);
        return;
      }

      const userProfile = {
        username: cleanUsername,
        fullName: fullName.trim(),
        industry,
        role,
        followerCount: 2500,
        linkedinUrl: `https://www.linkedin.com/in/${cleanUsername}`,
      };

      // Save user profile to local session cookie and storage
      localStorage.setItem('linkedin_user_profile', JSON.stringify(userProfile));
      document.cookie = `linkedin_user_profile=true; path=/; max-age=86400`;

      // Post to profile API to persist in Supabase table
      try {
        await fetch('/api/profile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: data.user?.id || 'usr-' + Date.now(),
            fullName: fullName.trim(),
            email: email.trim(),
            username: cleanUsername,
            industry,
            role,
          }),
        });
      } catch {}

      router.push('/profil');
    } catch {
      setErrorMessage('Impossible de créer le compte. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-12 bg-white p-8 rounded-3xl border-2 border-metricool-purple metricool-card-shadow space-y-6">
      
      <div className="text-center space-y-2">
        <div className="w-12 h-12 bg-metricool-purple text-metricool-yellow rounded-2xl flex items-center justify-center mx-auto shadow-md">
          <UserPlus className="w-6 h-6 text-metricool-yellow" />
        </div>
        <h1 className="text-2xl font-extrabold text-metricool-purple">Inscription & Inscription Gratuit</h1>
        <p className="text-xs font-medium text-slate-500">
          Créez votre compte membre pour personnaliser vos conseils LinkedIn et recevoir notre veille tech.
        </p>
      </div>

      <form onSubmit={handleSignup} className="space-y-4">
        
        <div>
          <label className="block text-xs font-extrabold uppercase text-slate-700 mb-1 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-metricool-purple" /> Nom & Prénom <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="ex: Jean Dupont"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-4 py-2.5 text-xs border-2 border-slate-300 rounded-xl focus:border-metricool-purple font-bold text-slate-900"
          />
        </div>

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
            className="w-full px-4 py-2.5 text-xs border-2 border-slate-300 rounded-xl focus:border-metricool-purple font-bold text-slate-900"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-extrabold uppercase text-slate-700 mb-1 flex items-center gap-1.5">
              <Linkedin className="w-3.5 h-3.5 text-metricool-blue" /> Identifiant LinkedIn
            </label>
            <input
              type="text"
              placeholder="jeandupont"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3.5 py-2 text-xs border-2 border-slate-300 rounded-xl focus:border-metricool-purple font-bold text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-extrabold uppercase text-slate-700 mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-metricool-pink" /> Secteur d'Activité
            </label>
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full px-3 py-2 text-xs border-2 border-slate-300 rounded-xl focus:border-metricool-purple font-bold bg-white text-slate-900"
            >
              <option value="SaaS & Tech">SaaS & Tech</option>
              <option value="Marketing & Growth">Marketing & Growth</option>
              <option value="RH & Recrutement">RH & Recrutement</option>
              <option value="FinTech & Finance">FinTech & Finance</option>
              <option value="E-Commerce & Retail">E-Commerce & Retail</option>
              <option value="Conseil & Consulting">Conseil & Consulting</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-extrabold uppercase text-slate-700 mb-1 flex items-center gap-1.5">
            <KeyRound className="w-3.5 h-3.5 text-metricool-pink" /> Mot de Passe <span className="text-rose-500">*</span>
          </label>
          <input
            type="password"
            required
            placeholder="6 caractères minimum"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2.5 text-xs border-2 border-slate-300 rounded-xl focus:border-metricool-purple font-bold text-slate-900"
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
              <Loader2 className="w-4 h-4 animate-spin" /> Création du compte...
            </>
          ) : (
            <>
              Créer Mon Compte <ArrowRight className="w-4 h-4 text-metricool-yellow" />
            </>
          )}
        </button>
      </form>

      <div className="border-t border-slate-100 pt-4 text-center">
        <p className="text-xs text-slate-500 font-medium">
          Déjà inscrit ?{' '}
          <Link href="/login" className="font-extrabold text-metricool-purple hover:underline">
            Se connecter
          </Link>
        </p>
      </div>

    </div>
  );
}
