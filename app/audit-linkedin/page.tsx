import { ProfileAuditTool } from '@/components/linkedin/profile-audit-tool';

export const metadata = {
  title: 'Audit de Profil & Page LinkedIn IA | Stratégie & Benchmark',
  description: 'Analysez n\'importe quel profil ou page entreprise LinkedIn. Vérifiez le lien cliquable et obtenez un rapport d\'audit IA complet.',
};

export default function AuditLinkedInPage() {
  return (
    <div className="py-6 sm:py-8">
      <ProfileAuditTool />
    </div>
  );
}
