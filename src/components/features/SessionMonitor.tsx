import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';
import { Clock, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export const SessionMonitor = () => {
  const { sessionExpiresAt, refreshSession, isAuthenticated } = useAuth();
  const [timeRemaining, setTimeRemaining] = useState<string>('');
  const [isExpiringSoon, setIsExpiringSoon] = useState(false);

  useEffect(() => {
    if (!sessionExpiresAt || !isAuthenticated) {
      setTimeRemaining('');
      return;
    }

    const updateTimeRemaining = () => {
      const now = new Date();
      const diff = sessionExpiresAt.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeRemaining('Expiré');
        setIsExpiringSoon(true);
        return;
      }

      const minutes = Math.floor(diff / 1000 / 60);
      const seconds = Math.floor((diff / 1000) % 60);

      if (minutes < 5) {
        setIsExpiringSoon(true);
        setTimeRemaining(`${minutes}m ${seconds}s`);
      } else if (minutes < 60) {
        setIsExpiringSoon(false);
        setTimeRemaining(`${minutes}m`);
      } else {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        setIsExpiringSoon(false);
        setTimeRemaining(`${hours}h ${remainingMinutes}m`);
      }
    };

    updateTimeRemaining();
    const interval = setInterval(updateTimeRemaining, 1000);

    return () => clearInterval(interval);
  }, [sessionExpiresAt, isAuthenticated]);

  if (!isAuthenticated || !timeRemaining) return null;

  return (
    <div className="flex items-center gap-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge 
            variant={isExpiringSoon ? "destructive" : "secondary"}
            className="flex items-center gap-1.5 cursor-help"
          >
            <Clock className="w-3 h-3" />
            <span className="text-xs">{timeRemaining}</span>
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">
            {isExpiringSoon 
              ? 'Votre session expire bientôt !'
              : 'Temps restant avant expiration de la session'
            }
          </p>
        </TooltipContent>
      </Tooltip>

      {isExpiringSoon && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="sm"
              variant="ghost"
              onClick={refreshSession}
              className="h-7 px-2"
            >
              <RefreshCw className="w-3 h-3" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">Rafraîchir la session</p>
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
};
