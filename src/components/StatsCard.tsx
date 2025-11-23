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
      className="relative overflow-hidden border-border/40 backdrop-blur-sm bg-card/50 hover:shadow-2xl transition-all duration-500 hover:scale-105 group animate-scale-in"
      style={{ animationDelay: delay }}
    >
      {/* Gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
      
      {/* Floating icon background */}
      <div className={`absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br ${gradient} opacity-10 blur-2xl group-hover:scale-150 transition-transform duration-700`} />
      
      <CardContent className="p-6 relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          
          {trend && (
            <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${
              trend.positive 
                ? 'bg-green-500/10 text-green-600 dark:text-green-400' 
                : 'bg-red-500/10 text-red-600 dark:text-red-400'
            }`}>
              <span>{trend.positive ? '↑' : '↓'}</span>
              <span>{Math.abs(trend.value)}%</span>
            </div>
          )}
        </div>
        
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300 inline-block">
            {value}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
