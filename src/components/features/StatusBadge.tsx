import { Badge } from '@/components/ui/badge';
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
      className: 'bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 shadow-lg shadow-green-500/50 animate-pulse-glow'
    },
    installed: { 
      label: 'Installé', 
      variant: 'secondary',
      className: 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-600 dark:text-blue-400 border-2 border-blue-500/30'
    },
    stopped: { 
      label: 'Arrêté', 
      variant: 'destructive',
      className: 'bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-600 dark:text-orange-400 border-2 border-orange-500/30'
    },
    not_installed: { 
      label: 'Non installé', 
      variant: 'outline',
      className: 'border-2 border-border/50 text-muted-foreground bg-background/50'
    },
  };

  const config = statusConfig[status];

  return (
    <Badge 
      variant={config.variant} 
      className={`${config.className} flex items-center gap-2 px-3 py-1.5 font-bold transition-all duration-500 hover:scale-110`}
    >
      <div className="relative flex items-center">
        <Circle className={`h-2 w-2 fill-current ${status === 'running' ? 'animate-ping absolute' : ''}`} />
        <Circle className="h-2 w-2 fill-current relative" />
      </div>
      {config.label}
    </Badge>
  );
};
