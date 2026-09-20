'use client';

import { useState, useEffect } from 'react';
import { UserSyncData, LinkedInUserProfile } from '@/lib/types';
import { X, Linkedin, Sparkles, CheckCircle2, RefreshCw, Link2, ShieldCheck, Zap } from 'lucide-react';

import { LINKEDIN_INDUSTRIES, formatCleanLinkedInName } from '@/lib/types';

interface LinkedInConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: LinkedInUserProfile | null;
  onSyncSuccess: (updatedProfile: LinkedInUserProfile) => void;
}

export function LinkedInConnectModal({ isOpen, onClose, currentProfile, onSyncSuccess }: LinkedInConnectModalProps) {
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [username, setUsername] = useState('');
  const [industry, setIndustry] = useState('Communication & Marketing');
  const [weeklyPostFrequency, setWeeklyPostFrequency] = useState('0.25');
  const [followerCount, setFollowerCount] = useState('4500');
  const [ssiScore, setSsiScore] = useState('82');
  const [engagementRate, setEngagementRate] = useState('4.2%');
  const [lastPostDate, setLastPostDate] = useState('Il y a 3 semaines');
  const [primaryFormat, setPrimaryFormat] = useState('Carrousels PDF Verticaux (4:5)');
  
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncSuccess, setSyncSuccess] = useState(false);

  useEffect(() => {
    if (currentProfile) {
      if (currentProfile.linkedinUrl) setLinkedinUrl(currentProfile.linkedinUrl);
      if (currentProfile.username) setUsername(currentProfile.username);
      if (currentProfile.industry) setIndustry(currentProfile.industry);
      if (currentProfile.followerCount) setFollowerCount(currentProfile.followerCount.toString());
      if (currentProfile.userSyncData) {
        const sync = currentProfile.userSyncData;
        if (sync.weeklyPostFrequency !== undefined) setWeeklyPostFrequency(sync.weeklyPostFrequency.toString());
        if (sync.ssiScore) setSsiScore(sync.ssiScore.toString());
        if (sync.engagementRate) setEngagementRate(sync.engagementRate);
        if (sync.lastPostDate) setLastPostDate(sync.lastPostDate);
        if (sync.primaryFormat) setPrimaryFormat(sync.primaryFormat);
      }
    }
  }, [currentProfile, isOpen]);

  if (!isOpen) return null;

  const handleSyncSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSyncing(true);

    const cleanUsername = (username || linkedinUrl.split('/in/')[1] || 'profil').replace(/[^a-zA-Z0-9_-]/g, '');
    const cleanName = formatCleanLinkedInName(currentProfile?.fullName || cleanUsername);

    const syncData: UserSyncData = {
      isConnected: true,
      weeklyPostFrequency: parseFloat(weeklyPostFrequency) || 0.25,
      followerCount: parseInt(followerCount) || 4500,
      ssiScore: parseInt(ssiScore) || 82,
      engagementRate: engagementRate.trim() || '4.2%',
      lastPostDate: lastPostDate.trim() || 'Il y a 3 semaines',
      primaryFormat,
    };

    const updatedProfile: LinkedInUserProfile = {
      ...(currentProfile || {
        role: 'Créateur B2B',
      }),
      fullName: cleanName,
      industry,
      username: cleanUsername,
      linkedinUrl: linkedinUrl.trim() || `https://www.linkedin.com/in/${cleanUsername}`,
      followerCount: parseInt(followerCount) || 4500,
      userSyncData: syncData,
    };

    setTimeout(() => {
      localStorage.setItem('linkedin_user_profile', JSON.stringify(updatedProfile));
      document.cookie = `linkedin_user_profile=true; path=/; max-age=86400`;
      
      setIsSyncing(false);
      setSyncSuccess(true);
      onSyncSuccess(updatedProfile);

      setTimeout(() => {
        setSyncSuccess(false);
        onClose();
      }, 1200);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden my-8 transform transition-all">
        
        {/* Header */}
        <div className="px-6 py-4 bg-indigo-950 text-white flex items-center justify-between border-b border-indigo-900/50">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-900 text-indigo-300 flex items-center justify-center font-extrabold text-base border border-indigo-700/50">
              <Link2 className="w-4 h-4 text-indigo-300" />
            </div>
            <h2 className="text-base font-black text-white">Lier & Synchroniser Mon Compte LinkedIn</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSyncSubmit} className="p-6 space-y-4">
          
          <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-2xl text-xs space-y-1">
            <div className="font-extrabold text-indigo-950 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>Connectez votre compte pour affiner votre audit IA</span>
            </div>
            <p className="text-slate-600 font-medium leading-relaxed">
              Vos données réelles de publication permettent à l'IA d'adapter les recommandations stratégiques à votre activité exacte.
            </p>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-extrabold uppercase text-slate-700 mb-1 flex items-center gap-1.5">
                <Linkedin className="w-3.5 h-3.5 text-[#0A66C2]" /> URL du Profil LinkedIn <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="https://www.linkedin.com/in/votre-pseudo"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:border-indigo-600 font-bold text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold uppercase text-slate-700 mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" /> Votre Secteur d'Activité Réel <span className="text-rose-500">*</span>
              </label>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:border-indigo-600 font-bold text-slate-900 bg-white"
              >
                {LINKEDIN_INDUSTRIES.map((ind) => (
                  <option key={ind} value={ind}>
                    {ind}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {syncSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-xs font-extrabold text-emerald-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>✅ Profil LinkedIn connecté avec succès !</span>
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSyncing}
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-2xl text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              {isSyncing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> Synchronisation des données réelles...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 text-white" /> Enregistrer & Lier Mon Compte Réel
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
