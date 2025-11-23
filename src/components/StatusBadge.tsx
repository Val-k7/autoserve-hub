import { Badge } from './ui/badge';
import { AppStatus } from '@/types/app';

interface StatusBadgeProps {
  status: AppStatus;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const statusConfig: Record<AppStatus, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
    running: { label: '✓ En cours', variant: 'default' },
    installed: { label: 'Installé', variant: 'secondary' },
    stopped: { label: 'Arrêté', variant: 'destructive' },
    not_installed: { label: 'Non installé', variant: 'outline' },
  };

  const config = statusConfig[status];

  return <Badge variant={config.variant}>{config.label}</Badge>;
};
