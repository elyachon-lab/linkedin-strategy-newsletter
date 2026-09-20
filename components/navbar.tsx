'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LinkedInUserProfile } from '@/lib/types';
import { AuthModal } from '@/components/auth-modal';
import { AdminControlModal } from '@/components/admin-control-modal';
import { UserCheck, Linkedin, ShieldCheck, Sparkles, LogOut, KeyRound, LayoutDashboard, Search, User, LogIn } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAdminControlOpen, setIsAdminControlOpen] = useState(false);
  const [clientProfile, setClientProfile] = useState<LinkedInUserProfile | null>(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    // Load persisted state from localStorage
    const savedProfile = localStorage.getItem('linkedin_user_profile');
    if (savedProfile) {
      try {
        setClientProfile(JSON.parse(savedProfile));
      } catch {}
    }

    const savedAdmin = localStorage.getItem('is_admin_logged_in');
    if (savedAdmin === 'true') {
      setIsAdminLoggedIn(true);
    }
  }, []);

  const handleClientLoginSuccess = (profile: LinkedInUserProfile) => {
    setClientProfile(profile);
    localStorage.setItem('linkedin_user_profile', JSON.stringify(profile));
    document.cookie = `linkedin_user_profile=true; path=/; max-age=86400`;
    router.push('/mon-espace-linkedin');
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    localStorage.setItem('is_admin_logged_in', 'true');
    document.cookie = `is_admin_logged_in=true; path=/; max-age=86400`;
    setIsAdminControlOpen(true);
  };

  const handleLogout = () => {
    setClientProfile(null);
    setIsAdminLoggedIn(false);
    localStorage.removeItem('linkedin_user_profile');
    localStorage.removeItem('is_admin_logged_in');
    document.cookie = 'linkedin_user_profile=; path=/; max-age=0';
    document.cookie = 'is_admin_logged_in=; path=/; max-age=0';
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      
      {/* Metricool Top Gradient Announcement Bar */}
      <div className="metricool-gradient-bar py-1.5 px-4 text-center text-white text-xs font-semibold flex items-center justify-center gap-2">
        <span>⚡ Guide & Veille Tech LinkedIn • Moteur d'accroches & meilleures pratiques 2026</span>
        <span className="hidden sm:inline bg-white/20 px-2 py-0.5 rounded-full text-[10px] uppercase font-bold">Pro</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo - Metricool Pink & Yellow Style */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-2xl bg-metricool-pink text-metricool-yellow flex items-center justify-center font-bold text-xl shadow-md group-hover:scale-105 transition-transform border-2 border-metricool-purple">
              M
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl text-metricool-purple tracking-tight leading-none flex items-center gap-1">
                LinkedIn Strategy <span className="w-2.5 h-2.5 rounded-full bg-metricool-yellow inline-block animate-pulse border border-metricool-purple" />
              </span>
              <span className="text-xs text-slate-500 font-medium mt-1">
                Guide Metricool • Audit IA & Veille
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-2">
            <Link
              href="/"
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                pathname === '/'
                  ? 'bg-metricool-lightPink text-metricool-pink border border-metricool-pink/30 font-extrabold'
                  : 'text-slate-700 hover:text-metricool-pink hover:bg-pink-50'
              }`}
            >
              Accueil Blog
            </Link>

            <Link
              href="/linkedin-strategy"
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                pathname.startsWith('/linkedin-strategy')
                  ? 'bg-metricool-lightPink text-metricool-pink border border-metricool-pink/30 font-extrabold'
                  : 'text-slate-700 hover:text-metricool-pink hover:bg-pink-50'
              }`}
            >
              Fiches & Stratégie
            </Link>

            <Link
              href="/audit-linkedin"
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                pathname === '/audit-linkedin'
                  ? 'bg-pink-100 text-metricool-pink border border-pink-300 font-extrabold'
                  : 'text-slate-700 hover:text-metricool-pink hover:bg-pink-50'
              }`}
            >
              <Search className="w-3.5 h-3.5 inline mr-1 text-metricool-pink" />
              Audit LinkedIn
            </Link>

            <Link
              href="/connect-linkedin"
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                pathname === '/connect-linkedin'
                  ? 'bg-blue-100 text-blue-900 border border-blue-300 font-extrabold'
                  : 'text-slate-700 hover:text-metricool-purple hover:bg-slate-100'
              }`}
            >
              <Linkedin className="w-3.5 h-3.5 inline mr-1 text-[#0077B5]" />
              Lier LinkedIn
            </Link>

            <Link
              href="/mon-espace-linkedin"
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                pathname === '/mon-espace-linkedin'
                  ? 'bg-metricool-yellow text-metricool-purple border-2 border-metricool-purple shadow-2xs font-extrabold'
                  : 'text-slate-700 hover:text-metricool-purple hover:bg-slate-100'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5 inline mr-1 text-metricool-purple" />
              Mon Espace IA
            </Link>

            <Link
              href="/newsletter"
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                pathname.startsWith('/newsletter')
                  ? 'bg-pink-50 text-metricool-pink border border-pink-200 font-extrabold'
                  : 'text-slate-700 hover:text-metricool-pink hover:bg-pink-50'
              }`}
            >
              Newsletter de Veille
            </Link>
          </nav>

          {/* Top Right Action Buttons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {isAdminLoggedIn && (
              <button
                onClick={() => setIsAdminControlOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-metricool-pink hover:bg-rose-600 text-white border-2 border-metricool-purple rounded-2xl text-xs font-extrabold shadow-sm transition-all"
                title="Espace Administrateur"
              >
                <ShieldCheck className="w-4 h-4 text-metricool-yellow" />
                <span>Espace Admin 🔒</span>
              </button>
            )}

            {clientProfile ? (
              <div className="flex items-center space-x-2">
                <Link
                  href="/profil"
                  className="inline-flex items-center gap-2 px-3.5 py-2 bg-metricool-yellow text-metricool-purple border-2 border-metricool-purple rounded-2xl text-xs font-extrabold shadow-2xs hover:bg-yellow-300 transition-colors"
                >
                  <User className="w-4 h-4 text-metricool-purple" />
                  @{clientProfile.username}
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-rose-50 transition-colors"
                  title="Déconnexion"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : !isAdminLoggedIn ? (
              <div className="flex items-center space-x-2">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-2xl text-xs font-extrabold transition-all"
                >
                  <LogIn className="w-3.5 h-3.5 text-metricool-purple" /> Connexion
                </Link>
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-metricool-pink hover:bg-rose-600 text-white rounded-2xl text-xs font-extrabold transition-all shadow-md border-2 border-metricool-purple"
                >
                  <UserCheck className="w-3.5 h-3.5 text-metricool-yellow" /> S'inscrire
                </Link>
              </div>
            ) : (
              <button
                onClick={handleLogout}
                className="p-2 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-rose-50 transition-colors"
                title="Déconnexion Admin"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onClientLoginSuccess={handleClientLoginSuccess}
        onAdminLoginSuccess={handleAdminLoginSuccess}
      />

      {/* Admin Control Center Modal */}
      <AdminControlModal
        isOpen={isAdminControlOpen}
        onClose={() => setIsAdminControlOpen(false)}
        onLogout={handleLogout}
      />
    </header>
  );
}
