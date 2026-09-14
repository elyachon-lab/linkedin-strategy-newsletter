'use client';

import { useState } from 'react';
import { Clock, Info, Sparkles } from 'lucide-react';

export function TimingGridComponent() {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const schedule = [
    {
      day: 'Lundi',
      status: 'Moderate',
      badge: 'bg-amber-100 text-amber-900 border-2 border-metricool-purple font-extrabold',
      bestSlots: ['08:30 - 10:00', '12:00 - 13:00'],
      advice: 'Journée de reprise et tri des e-mails. Privilégiez le milieu de matinée.',
    },
    {
      day: 'Mardi',
      status: 'Optimal 🔥',
      badge: 'bg-metricool-yellow text-metricool-purple border-2 border-metricool-purple font-extrabold',
      bestSlots: ['07:30 - 08:45', '11:45 - 13:15', '17:30 - 18:30'],
      advice: 'Considéré comme l\'un des 2 meilleurs jours de la semaine B2B. Fort taux de réactions.',
    },
    {
      day: 'Mercredi',
      status: 'Optimal 🔥',
      badge: 'bg-metricool-yellow text-metricool-purple border-2 border-metricool-purple font-extrabold',
      bestSlots: ['07:30 - 08:45', '12:00 - 13:00', '17:30 - 18:30'],
      advice: 'Pic d\'attention en milieu de semaine. Idéal pour les carrousels et dossiers de fond.',
    },
    {
      day: 'Jeudi',
      status: 'Optimal 🔥',
      badge: 'bg-metricool-yellow text-metricool-purple border-2 border-metricool-purple font-extrabold',
      bestSlots: ['07:30 - 08:45', '11:45 - 13:15', '17:00 - 18:00'],
      advice: 'Excellent pour l\'engagement et la génération de leads d\'entreprise.',
    },
    {
      day: 'Vendredi',
      status: 'Modéré',
      badge: 'bg-amber-100 text-amber-900 border-2 border-metricool-purple font-extrabold',
      bestSlots: ['08:00 - 10:00'],
      advice: 'Publiez tôt le matin uniquement. Évitez les sujets trop denses le vendredi après-midi.',
    },
    {
      day: 'Samedi',
      status: 'Calme',
      badge: 'bg-slate-100 text-slate-800 border-2 border-slate-300 font-bold',
      bestSlots: ['09:00 - 11:00'],
      advice: 'Volume plus faible. Idéal pour du storytelling personnel ou du partage de culture.',
    },
    {
      day: 'Dimanche',
      status: 'Opportunité',
      badge: 'bg-metricool-lightBlue text-metricool-purple border-2 border-metricool-purple font-extrabold',
      bestSlots: ['18:00 - 20:30'],
      advice: 'Préparation de la semaine. Très bon taux de lecture pour des réflexions stratégiques.',
    },
  ];

  return (
    <div className="bg-white rounded-3xl border-2 border-metricool-purple p-6 sm:p-8 metricool-card-shadow">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h3 className="text-xl font-extrabold text-metricool-purple flex items-center gap-2">
            <Clock className="w-6 h-6 text-metricool-pink" />
            Étude & Matrice des Heures de Publication LinkedIn (B2B)
          </h3>
          <p className="text-xs font-medium text-slate-500 mt-1">
            Basé sur les données de fréquentation et d'impressions des professionnels francophones.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
        {schedule.map((item) => (
          <div
            key={item.day}
            onClick={() => setSelectedSlot(selectedSlot === item.day ? null : item.day)}
            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
              selectedSlot === item.day
                ? 'border-metricool-purple bg-metricool-lightBlue shadow-sm'
                : 'border-slate-200 hover:border-metricool-purple bg-slate-50 hover:bg-white'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-extrabold text-sm text-metricool-purple">{item.day}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${item.badge}`}>
                {item.status}
              </span>
            </div>

            <div className="space-y-1.5 my-2">
              {item.bestSlots.map((slot) => (
                <div
                  key={slot}
                  className="text-xs font-extrabold text-metricool-purple bg-white border border-metricool-purple rounded-xl px-2 py-1 text-center shadow-2xs"
                >
                  {slot}
                </div>
              ))}
            </div>

            <p className="text-[11px] font-medium text-slate-600 line-clamp-2 mt-2">
              {item.advice}
            </p>
          </div>
        ))}
      </div>

      {selectedSlot && (
        <div className="mt-5 p-4 bg-metricool-yellow border-2 border-metricool-purple rounded-2xl text-xs font-bold text-metricool-purple flex items-start gap-2.5 shadow-2xs">
          <Info className="w-5 h-5 text-metricool-purple shrink-0 mt-0.5" />
          <div>
            <strong>Recommandation Metricool Style pour le {selectedSlot} :</strong>{' '}
            {schedule.find((s) => s.day === selectedSlot)?.advice}
          </div>
        </div>
      )}
    </div>
  );
}
