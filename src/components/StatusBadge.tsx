import { Badge } from './ui/badge';
import { AppStatus } from '@/types/app';
import { Circle } from 'lucide-react';

interface StatusBadgeProps {
  status: AppStatus;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const statusConfig: Record<AppStatus, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline'; className: string }> = {
    running: { 
      label: 'En cours', 
      variant: 'default',
      className: 'bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 shadow-sm'
    },
    installed: { 
      label: 'Installé', 
      variant: 'secondary',
      className: 'bg-gradient-to-r from-blue-500/10 to-cyan-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20'
    },
    stopped: { 
      label: 'Arrêté', 
      variant: 'destructive',
      className: 'bg-gradient-to-r from-red-500/10 to-orange-500/10 text-red-600 dark:text-red-400 border-red-500/20'
    },
    not_installed: { 
      label: 'Non installé', 
      variant: 'outline',
      className: 'border-border/50 text-muted-foreground'
    },
  };

  const config = statusConfig[status];

  return (
    <Badge variant={config.variant} className={`${config.className} flex items-center gap-1.5 px-3 py-1 font-medium transition-all duration-300`}>
      <Circle className="h-2 w-2 fill-current animate-pulse" />
      {config.label}
    </Badge>
  );
};
