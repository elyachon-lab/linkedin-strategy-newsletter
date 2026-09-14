import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/navbar';

export const metadata: Metadata = {
  title: 'Centre de Stratégie LinkedIn & Newsletter Tech',
  description: 'Guide interactif, meilleures pratiques LinkedIn, moteur de recherche d\'accroches et outil de rédaction de newsletter tech.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="h-full bg-slate-50">
      <body className="h-full flex flex-col font-sans text-slate-900 antialiased selection:bg-blue-100 selection:text-blue-900">
        <Navbar />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        
        <footer className="border-t border-slate-200 bg-white py-6 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500">
            <p>
              © {new Date().getFullYear()} LinkedIn Strategy Pro & Newsletter Tech • Optimisé pour Vercel & Supabase
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
