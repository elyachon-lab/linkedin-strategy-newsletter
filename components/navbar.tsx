'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LinkedInUserProfile } from '@/lib/types';
import { AuthModal } from '@/components/auth-modal';
import { AdminControlModal } from '@/components/admin-control-modal';
import { UserCheck, Linkedin, ShieldCheck, Sparkles, LogOut, KeyRound, LayoutDashboard, Search, User, LogIn, BookOpen } from 'lucide-react';

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
        const parsed = JSON.parse(savedProfile);
        if (parsed && (parsed.linkedinUrl || parsed.username)) {
          setClientProfile(parsed);
        } else {
          setClientProfile(null);
        }
      } catch {
        setClientProfile(null);
      }
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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      
      {/* Bible LinkedIn Top Gradient Bar */}
      <div className="brand-gradient-bar py-1.5 px-4 text-center text-white text-xs font-semibold flex items-center justify-center gap-2">
        <span>📘 Bible LinkedIn 2026 • Le Guide Ultime de la Croissance Organic B2B</span>
        <span className="hidden sm:inline bg-white/20 px-2 py-0.5 rounded-full text-[10px] uppercase font-bold">Officiel</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo - Bible LinkedIn Style */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-2xl bg-indigo-950 text-indigo-400 flex items-center justify-center font-black text-xl shadow-md group-hover:scale-105 transition-transform border border-indigo-800/50">
              <BookOpen className="w-5 h-5 text-indigo-400" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl text-indigo-950 tracking-tight leading-none flex items-center gap-1.5">
                Bible LinkedIn <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 inline-block animate-pulse" />
              </span>
              <span className="text-[11px] text-slate-500 font-medium mt-1">
                La référence absolue du Growth B2B
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1.5">
            <Link
              href="/"
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                pathname === '/'
                  ? 'bg-indigo-50 text-indigo-900 border border-indigo-200 font-extrabold'
                  : 'text-slate-700 hover:text-indigo-900 hover:bg-slate-100'
              }`}
            >
              Accueil & Guides
            </Link>

            <Link
              href="/linkedin-strategy"
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                pathname.startsWith('/linkedin-strategy')
                  ? 'bg-indigo-50 text-indigo-900 border border-indigo-200 font-extrabold'
                  : 'text-slate-700 hover:text-indigo-900 hover:bg-slate-100'
              }`}
            >
              Fiches Référence
            </Link>

            <Link
              href="/audit-linkedin"
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                pathname === '/audit-linkedin'
                  ? 'bg-indigo-50 text-indigo-900 border border-indigo-200 font-extrabold'
                  : 'text-slate-700 hover:text-indigo-900 hover:bg-slate-100'
              }`}
            >
              <Search className="w-3.5 h-3.5 inline mr-1 text-indigo-600" />
              Audit LinkedIn
            </Link>

            <Link
              href="/connect-linkedin"
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                pathname === '/connect-linkedin'
                  ? 'bg-blue-50 text-blue-900 border border-blue-200 font-extrabold'
                  : 'text-slate-700 hover:text-indigo-900 hover:bg-slate-100'
              }`}
            >
              <Linkedin className="w-3.5 h-3.5 inline mr-1 text-[#0A66C2]" />
              Lier LinkedIn
            </Link>

            <Link
              href="/mon-espace-linkedin"
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                pathname === '/mon-espace-linkedin'
                  ? 'bg-indigo-950 text-white shadow-xs font-extrabold'
                  : 'text-slate-700 hover:text-indigo-900 hover:bg-slate-100'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5 inline mr-1 text-indigo-400" />
              Mon Espace IA
            </Link>

            <Link
              href="/newsletter"
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                pathname.startsWith('/newsletter')
                  ? 'bg-indigo-50 text-indigo-900 border border-indigo-200 font-extrabold'
                  : 'text-slate-700 hover:text-indigo-900 hover:bg-slate-100'
              }`}
            >
              Newsletter Veille
            </Link>
          </nav>

          {/* Top Right Action Buttons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {isAdminLoggedIn && (
              <button
                onClick={() => setIsAdminControlOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-indigo-950 hover:bg-black text-white rounded-2xl text-xs font-extrabold shadow-xs transition-all border border-indigo-800/50"
                title="Espace Administrateur"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Admin 🔒</span>
              </button>
            )}

            {clientProfile ? (
              <div className="flex items-center space-x-2">
                <Link
                  href="/profil"
                  className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-indigo-950 rounded-2xl text-xs font-extrabold transition-colors border border-slate-200"
                >
                  <User className="w-4 h-4 text-indigo-600" />
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
                  <LogIn className="w-3.5 h-3.5 text-indigo-600" /> Connexion
                </Link>
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-xs font-extrabold transition-all shadow-md"
                >
                  <UserCheck className="w-3.5 h-3.5 text-white" /> S'inscrire
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
