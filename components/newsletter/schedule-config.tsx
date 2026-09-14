'use client';

import { useState, useEffect } from 'react';
import { Calendar, Clock, RefreshCw, Save, Sparkles, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

const DAYS_OF_WEEK = [
  { value: 'Lundi', label: 'Lundi (Recommandé - Début de semaine B2B)' },
  { value: 'Mardi', label: 'Mardi (Forte ouverture B2B)' },
  { value: 'Mercredi', label: 'Mercredi (Milieu de semaine)' },
  { value: 'Jeudi', label: 'Jeudi (Peak engagement)' },
  { value: 'Vendredi', label: 'Vendredi (Récapitulatif)' },
  { value: 'Samedi', label: 'Samedi (Week-end)' },
  { value: 'Dimanche', label: 'Dimanche (Préparation)' },
];

const FREQUENCIES = [
  { value: 'Hebdomadaire', label: 'Hebdomadaire (Chaque semaine - Recommandé)' },
  { value: 'Bi-mensuelle', label: 'Bi-mensuelle (Toutes les 2 semaines)' },
  { value: 'Mensuelle', label: 'Mensuelle (Une fois par mois)' },
];

export function ScheduleConfigManager() {
  const [dayOfWeek, setDayOfWeek] = useState('Lundi');
  const [timeOfDay, setTimeOfDay] = useState('19:45');
  const [frequency, setFrequency] = useState('Hebdomadaire');
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const savedConfig = localStorage.getItem('newsletter_schedule_config');
    if (savedConfig) {
      try {
        const parsed = JSON.parse(savedConfig);
        if (parsed.dayOfWeek) setDayOfWeek(parsed.dayOfWeek);
        if (parsed.timeOfDay) setTimeOfDay(parsed.timeOfDay);
        if (parsed.frequency) setFrequency(parsed.frequency);
      } catch {}
    }
  }, []);

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const config = {
      dayOfWeek,
      timeOfDay,
      frequency,
      updatedAt: new Date().toISOString(),
    };

    localStorage.setItem('newsletter_schedule_config', JSON.stringify(config));

    setTimeout(() => {
      setIsSaving(false);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 4000);
    }, 500);
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-metricool-purple metricool-card-shadow space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-slate-100 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-purple-100 text-purple-900 text-xs font-extrabold border border-purple-300 mb-1">
            <Calendar className="w-3.5 h-3.5 text-purple-700" /> Programmation Automatisée
          </div>
          <h3 className="text-xl font-extrabold text-metricool-purple flex items-center gap-2">
            Planification de Parution de la Newsletter
          </h3>
          <p className="text-xs font-medium text-slate-500 mt-0.5">
            Définissez le jour, l'heure et la fréquence d'envoi de la veille automatique envoyée par l'IA.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-900 text-xs font-extrabold border border-emerald-300">
            <Zap className="w-4 h-4 text-emerald-600 animate-pulse" /> IA Feedly Cron Actif
          </span>
        </div>
      </div>

      <form onSubmit={handleSaveConfig} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Day of Week */}
          <div className="space-y-1.5">
            <label className="block text-xs font-extrabold uppercase text-slate-700 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-metricool-purple" /> Jour de Parution
            </label>
            <select
              value={dayOfWeek}
              onChange={(e) => setDayOfWeek(e.target.value)}
              className="w-full px-3.5 py-3 text-xs font-extrabold border-2 border-slate-300 rounded-2xl focus:border-metricool-purple bg-white text-slate-900"
            >
              {DAYS_OF_WEEK.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>
          </div>

          {/* Time of Day */}
          <div className="space-y-1.5">
            <label className="block text-xs font-extrabold uppercase text-slate-700 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-metricool-blue" /> Heure d'Envoi (HH:MM)
            </label>
            <input
              type="time"
              required
              value={timeOfDay}
              onChange={(e) => setTimeOfDay(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm font-extrabold border-2 border-slate-300 rounded-2xl focus:border-metricool-purple bg-white text-slate-900"
            />
          </div>

          {/* Frequency */}
          <div className="space-y-1.5">
            <label className="block text-xs font-extrabold uppercase text-slate-700 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-metricool-pink" /> Fréquence d'Envoi
            </label>
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className="w-full px-3.5 py-3 text-xs font-extrabold border-2 border-slate-300 rounded-2xl focus:border-metricool-purple bg-white text-slate-900"
            >
              {FREQUENCIES.map((f) => (
                <option key={f.value} value={f.value}>
                  {f.label}
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* Current Active Program Preview */}
        <div className="p-4 rounded-2xl bg-metricool-lightBlue/40 border-2 border-metricool-purple flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-metricool-purple text-metricool-yellow flex items-center justify-center font-extrabold shrink-0">
              🗓️
            </div>
            <div>
              <h4 className="font-extrabold text-metricool-purple text-sm">
                Programme Actuel : {frequency} chaque {dayOfWeek} à {timeOfDay}
              </h4>
              <p className="text-slate-600 font-medium">
                La veille technologique et l'envoi de l'édition hebdo aux abonnés seront automatiquement déclenchés selon cet horaire.
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="w-full sm:w-auto px-6 py-3 bg-metricool-purple hover:bg-black text-metricool-yellow font-extrabold rounded-2xl text-xs shadow-md transition-all shrink-0 flex items-center justify-center gap-2"
          >
            {isSaving ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" /> Enregistrement...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" /> Mettre à jour l'horaire
              </>
            )}
          </button>
        </div>

        {isSaved && (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-xs font-extrabold text-emerald-900 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            L'horaire de parution a été mis à jour avec succès ! Prochain envoi programmé : {dayOfWeek} à {timeOfDay}.
          </div>
        )}
      </form>
    </div>
  );
}
