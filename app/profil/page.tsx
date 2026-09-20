'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  User,
  Linkedin,
  Globe,
  Sparkles,
  Save,
  CheckCircle2,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  LayoutDashboard,
  LogOut,
  Mail,
  Users,
} from 'lucide-react';

export default function UserProfilePage() {
  const router = useRouter();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [industry, setIndustry] = useState('SaaS & Tech');
  const [role, setRole] = useState('Créateur B2B');
  const [followerCount, setFollowerCount] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 1. Try to fetch profile from API
    fetch('/api/profile')
      .then((res) => res.json())
      .then((data) => {
        if (data.profile) {
          const p = data.profile;
          if (p.full_name) setFullName(p.full_name);
          if (p.email) setEmail(p.email);
          if (p.username) setUsername(p.username);
          if (p.linkedin_url) setLinkedinUrl(p.linkedin_url);
          if (p.industry) setIndustry(p.industry);
          if (p.role) setRole(p.role);
          if (p.follower_count) setFollowerCount(p.follower_count.toString());
          if (p.website_url) setWebsiteUrl(p.website_url);
        }
      })
      .catch(() => {})
      .finally(() => {
        // Fallback to local session storage
        const savedLocal = localStorage.getItem('linkedin_user_profile');
        if (savedLocal) {
          try {
            const parsed = JSON.parse(savedLocal);
            if (
              parsed &&
              parsed.linkedinUrl &&
              parsed.username &&
              parsed.username !== 'elyachon' &&
              parsed.username !== 'jeandupont'
            ) {
              if (parsed.fullName) setFullName(parsed.fullName);
              if (parsed.username) setUsername(parsed.username);
              if (parsed.linkedinUrl) setLinkedinUrl(parsed.linkedinUrl);
              if (parsed.industry) setIndustry(parsed.industry);
              if (parsed.role) setRole(parsed.role);
              if (parsed.followerCount) setFollowerCount(parsed.followerCount.toString());
              if (parsed.websiteUrl) setWebsiteUrl(parsed.websiteUrl);
              setIsLoading(false);
              return;
            }
          } catch {}
        }
        localStorage.removeItem('linkedin_user_profile');
        setIsLoading(false);
      });
  }, []);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess('');

    const cleanUsername = username.replace('@', '').trim() || 'user';
    const computedUrl = linkedinUrl.trim() || `https://www.linkedin.com/in/${cleanUsername}`;

    const profileData = {
      fullName: fullName.trim(),
      email: email.trim(),
      username: cleanUsername,
      linkedinUrl: computedUrl,
      industry,
      role,
      followerCount: parseInt(followerCount) || 0,
      websiteUrl: websiteUrl.trim(),
    };

    try {
      // 1. Save to Supabase API
      const res = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData),
      });
      const data = await res.json();

      // 2. Save to local storage for immediate sync with navbar & audit tool
      localStorage.setItem('linkedin_user_profile', JSON.stringify(profileData));
      document.cookie = `linkedin_user_profile=true; path=/; max-age=86400`;

      setSaveSuccess('Votre profil et vos préférences ont été sauvegardés avec succès !');
      setTimeout(() => setSaveSuccess(''), 4000);
    } catch {
      localStorage.setItem('linkedin_user_profile', JSON.stringify(profileData));
      setSaveSuccess('Profil sauvegardé en session !');
      setTimeout(() => setSaveSuccess(''), 4000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('linkedin_user_profile');
    localStorage.removeItem('is_admin_logged_in');
    document.cookie = 'linkedin_user_profile=; path=/; max-age=0';
    document.cookie = 'is_admin_logged_in=; path=/; max-age=0';
    router.push('/login');
  };

  if (isLoading) {
    return <div className="text-center py-16 font-bold text-slate-500">Chargement du profil...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-6">
      
      {/* Header Banner */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-indigo-800/50 brand-card-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white flex items-center justify-center font-extrabold text-2xl border border-indigo-400/30 shadow-md">
            {(fullName || 'M').charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white">{fullName || 'Mon Profil Utilisateur'}</h1>
            <p className="text-xs text-slate-300 font-bold mt-0.5">
              @{username || 'membre'} • {industry} • {role}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/mon-espace-linkedin"
            className="px-4 py-2.5 bg-indigo-950 text-cyan-300 border border-indigo-800 font-extrabold rounded-2xl text-xs shadow-xs hover:bg-slate-900 transition-colors flex items-center gap-1.5"
          >
            <LayoutDashboard className="w-4 h-4" /> Mon Espace IA
          </Link>
          <button
            onClick={handleLogout}
            className="p-2.5 bg-white/10 hover:bg-rose-500/20 text-slate-300 hover:text-rose-200 rounded-2xl transition-colors border border-white/20"
            title="Déconnexion"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Profile Form */}
      <form onSubmit={handleSaveProfile} className="bg-white p-6 sm:p-8 rounded-3xl border border-indigo-100 brand-card-shadow space-y-6">
        
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-extrabold text-indigo-950 flex items-center gap-2">
              <User className="w-5 h-5 text-indigo-600" />
              Informations du Compte & Préférences IA
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Ces informations alimentent automatiquement le moteur d'audit et la génération de vos accroches sur-mesure.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          <div>
            <label className="block text-xs font-extrabold uppercase text-slate-700 mb-1 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-indigo-600" /> Nom & Prénom <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:border-indigo-600 font-bold text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-extrabold uppercase text-slate-700 mb-1 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-indigo-600" /> Adresse E-mail (Newsletter)
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:border-indigo-600 font-bold text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-extrabold uppercase text-slate-700 mb-1 flex items-center gap-1.5">
              <Linkedin className="w-3.5 h-3.5 text-indigo-600" /> Identifiant / Pseudo LinkedIn
            </label>
            <input
              type="text"
              placeholder="votre-pseudo"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:border-indigo-600 font-bold text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-extrabold uppercase text-slate-700 mb-1 flex items-center gap-1.5">
              <ExternalLink className="w-3.5 h-3.5 text-indigo-600" /> URL du Profil LinkedIn
            </label>
            <input
              type="text"
              placeholder="https://www.linkedin.com/in/votre-profil"
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:border-indigo-600 font-bold text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" /> Secteur d'Activité (Détecté par IA)
            </label>
            <div className="w-full px-3.5 py-2.5 text-xs bg-[#161B22] border border-zinc-800 rounded-xl font-bold text-sky-300 flex items-center justify-between">
              <span>🤖 {industry || 'SaaS & Tech'}</span>
              <span className="text-[10px] uppercase font-semibold text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded-full">Scanné par IA</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-extrabold uppercase text-slate-700 mb-1 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-indigo-600" /> Nombre d'Abonnés LinkedIn
            </label>
            <input
              type="number"
              value={followerCount}
              onChange={(e) => setFollowerCount(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:border-indigo-600 font-bold text-slate-900"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-extrabold uppercase text-slate-700 mb-1 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-emerald-600" /> Site Internet d'Entreprise
            </label>
            <input
              type="url"
              placeholder="https://votre-entreprise.com"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:border-indigo-600 font-bold text-slate-900"
            />
          </div>

        </div>

        {saveSuccess && (
          <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-xs font-bold text-emerald-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{saveSuccess} L'audit de votre nouveau compte a été mis à jour dans votre espace.</span>
            </div>
            <Link
              href="/mon-espace-linkedin"
              className="px-4 py-2 bg-indigo-950 text-cyan-300 hover:bg-slate-900 font-extrabold rounded-xl text-xs shadow-xs transition-colors text-center shrink-0 flex items-center justify-center gap-1.5"
            >
              🚀 Voir l'Audit de Mon Compte
            </Link>
          </div>
        )}

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-3 bg-indigo-950 hover:bg-slate-900 text-cyan-300 font-extrabold rounded-2xl text-xs shadow-md transition-all flex items-center gap-2"
          >
            {isSaving ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" /> Enregistrement...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" /> Sauvegarder Mon Profil Supabase
              </>
            )}
          </button>
        </div>

      </form>

    </div>
  );
}
