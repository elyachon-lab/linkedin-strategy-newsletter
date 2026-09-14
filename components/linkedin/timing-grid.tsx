'use client';

import { useState } from 'react';
import { Clock, Info, CheckCircle2 } from 'lucide-react';

export function TimingGridComponent() {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const schedule = [
    {
      day: 'Lundi',
      status: 'Moderate',
      badge: 'bg-amber-100 text-amber-800 border-amber-300',
      bestSlots: ['08:30 - 10:00', '12:00 - 13:00'],
      advice: 'Journée de reprise et tri des e-mails. Privilégiez le milieu de matinée.',
    },
    {
      day: 'Mardi',
      status: 'Optimal 🔥',
      badge: 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold',
      bestSlots: ['07:30 - 08:45', '11:45 - 13:15', '17:30 - 18:30'],
      advice: 'Considéré comme l\'un des 2 meilleurs jours de la semaine B2B. Fort taux de réactions.',
    },
    {
      day: 'Mercredi',
      status: 'Optimal 🔥',
      badge: 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold',
      bestSlots: ['07:30 - 08:45', '12:00 - 13:00', '17:30 - 18:30'],
      advice: 'Pic d\'attention en milieu de semaine. Idéal pour les carrousels et dossiers de fond.',
    },
    {
      day: 'Jeudi',
      status: 'Optimal 🔥',
      badge: 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold',
      bestSlots: ['07:30 - 08:45', '11:45 - 13:15', '17:00 - 18:00'],
      advice: 'Excellent pour l\'engagement et la génération de leads d\'entreprise.',
    },
    {
      day: 'Vendredi',
      status: 'Modéré',
      badge: 'bg-amber-100 text-amber-800 border-amber-300',
      bestSlots: ['08:00 - 10:00'],
      advice: 'Publiez tôt le matin uniquement. Évitez d\'exprimer des sujets trop denses le vendredi après-midi.',
    },
    {
      day: 'Samedi',
      status: 'Calme',
      badge: 'bg-slate-100 text-slate-700 border-slate-300',
      bestSlots: ['09:00 - 11:00'],
      advice: 'Volume plus faible. Idéal pour du storytelling personnel ou du partage de culture.',
    },
    {
      day: 'Dimanche',
      status: 'Opportunité Evening',
      badge: 'bg-indigo-100 text-indigo-800 border-indigo-300',
      bestSlots: ['18:00 - 20:30'],
      advice: 'Préparation de la semaine. Très bon taux de lecture pour des réflexions stratégiques.',
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" />
            Matrice des Heures Optimales de Publication (B2B)
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Basé sur l'analyse de +50 000 publications et les comportements d'actifs francophones.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
        {schedule.map((item) => (
          <div
            key={item.day}
            onClick={() => setSelectedSlot(selectedSlot === item.day ? null : item.day)}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
              selectedSlot === item.day
                ? 'border-blue-500 bg-blue-50/50 ring-2 ring-blue-200'
                : 'border-slate-200 hover:border-slate-300 bg-slate-50/40 hover:bg-white'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-sm text-slate-900">{item.day}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded border ${item.badge}`}>
                {item.status}
              </span>
            </div>

            <div className="space-y-1 my-2">
              {item.bestSlots.map((slot) => (
                <div
                  key={slot}
                  className="text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded px-2 py-1 text-center shadow-2xs"
                >
                  {slot}
                </div>
              ))}
            </div>

            <p className="text-[11px] text-slate-500 line-clamp-2 mt-2">
              {item.advice}
            </p>
          </div>
        ))}
      </div>

      {selectedSlot && (
        <div className="mt-4 p-4 bg-blue-50/80 border border-blue-200 rounded-xl text-xs text-blue-900 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <strong>Conseil pour le {selectedSlot} :</strong>{' '}
            {schedule.find((s) => s.day === selectedSlot)?.advice}
          </div>
        </div>
      )}
    </div>
  );
}
