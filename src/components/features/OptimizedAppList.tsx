import { useEffect, useState, useRef } from 'react';
import { App } from '@/types/app';
import { AppCard } from '@/components/features/AppCard';

interface OptimizedAppListProps {
  apps: App[];
  onInstall?: (app: App) => void;
  onStart?: (app: App) => void;
  onStop?: (app: App) => void;
  onUninstall?: (app: App) => void;
}

export const OptimizedAppList = ({ apps, onInstall, onStart, onStop, onUninstall }: OptimizedAppListProps) => {
  const [visibleCount, setVisibleCount] = useState(12);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reset visible count when apps change
    setVisibleCount(12);
  }, [apps]);

  useEffect(() => {
    // Lazy loading: Load more items when user scrolls to bottom
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < apps.length) {
          setVisibleCount(prev => Math.min(prev + 12, apps.length));
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [visibleCount, apps.length]);

  const visibleApps = apps.slice(0, visibleCount);

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visibleApps.map((app, index) => (
          <div
            key={app.id}
            className="animate-scale-in"
            style={{ animationDelay: `${(index % 12) * 0.05}s` }}
          >
            <AppCard
              app={app}
              onInstall={onInstall}
              onStart={onStart}
              onStop={onStop}
              onUninstall={onUninstall}
            />
          </div>
        ))}
      </div>

      {/* Load more trigger */}
      {visibleCount < apps.length && (
        <div ref={loadMoreRef} className="h-20 flex items-center justify-center mt-6">
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm">Chargement...</span>
          </div>
        </div>
      )}
    </>
  );
};
