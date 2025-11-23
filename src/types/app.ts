export type AppCategory = 'media' | 'download' | 'automation' | 'cloud' | 'tools' | 'security';

export type AppStatus = 'installed' | 'running' | 'stopped' | 'not_installed';

export interface App {
  id: string;
  name: string;
  description: string;
  category: AppCategory;
  icon: string;
  status: AppStatus;
  url?: string;
  version?: string;
}

export const APP_CATEGORIES: Record<AppCategory, { label: string; icon: string }> = {
  media: { label: 'Serveurs multimédias', icon: '🎬' },
  download: { label: 'Téléchargement', icon: '📥' },
  automation: { label: 'Automatisation', icon: '🔁' },
  cloud: { label: 'Cloud privé', icon: '🌩' },
  tools: { label: 'Outils', icon: '🧰' },
  security: { label: 'Sécurité', icon: '🔐' },
};
