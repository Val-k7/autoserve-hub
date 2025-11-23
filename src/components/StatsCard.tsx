import { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    positive: boolean;
  };
  gradient: string;
  delay?: string;
}

export function StatsCard({ title, value, icon: Icon, trend, gradient, delay = '0s' }: StatsCardProps) {
  return (
    <Card 
      className="relative overflow-hidden border-border/40 backdrop-blur-sm bg-card/50 group animate-scale-in hover-lift"
      style={{ animationDelay: delay }}
    >
      {/* Multiple gradient overlays for depth */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-15 transition-opacity duration-500`} />
      <div className={`absolute inset-0 bg-gradient-to-tl ${gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-700`} />
      
      {/* Floating glow effect */}
      <div className={`absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br ${gradient} opacity-20 blur-3xl group-hover:scale-150 group-hover:opacity-30 transition-all duration-700`} />
      
      {/* Border glow on hover */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-500 -z-10`} />
      
      <CardContent className="p-6 relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className={`relative p-3 rounded-xl bg-gradient-to-br ${gradient} shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
            {/* Inner glow */}
            <div className="absolute inset-0 bg-white/20 rounded-xl blur-md" />
            <Icon className="h-6 w-6 text-white relative z-10" />
          </div>
          
          {trend && (
            <div className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold backdrop-blur-sm depth-2 ${
              trend.positive 
                ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 text-green-600 dark:text-green-400 shadow-lg shadow-green-500/20' 
                : 'bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 text-red-600 dark:text-red-400 shadow-lg shadow-red-500/20'
            }`}>
              <span className="text-base">{trend.positive ? '↑' : '↓'}</span>
              <span>{Math.abs(trend.value)}%</span>
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground font-semibold tracking-wide uppercase">{title}</p>
          <p className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300 inline-block">
            {value}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
