import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, RefreshCw, Download, Upload, Zap } from 'lucide-react';

interface QuickAction {
  label: string;
  icon: typeof Plus;
  gradient: string;
  onClick: () => void;
}

export function QuickActions() {
  const actions: QuickAction[] = [
    {
      label: 'Nouvelle app',
      icon: Plus,
      gradient: 'from-blue-500 to-cyan-500',
      onClick: () => console.log('Nouvelle app'),
    },
    {
      label: 'Actualiser',
      icon: RefreshCw,
      gradient: 'from-purple-500 to-pink-500',
      onClick: () => console.log('Actualiser'),
    },
    {
      label: 'Exporter',
      icon: Download,
      gradient: 'from-green-500 to-emerald-500',
      onClick: () => console.log('Exporter'),
    },
    {
      label: 'Importer',
      icon: Upload,
      gradient: 'from-orange-500 to-red-500',
      onClick: () => console.log('Importer'),
    },
  ];

  return (
    <Card className="border-border/40 backdrop-blur-sm bg-card/50 shadow-lg animate-scale-in" style={{ animationDelay: '0.4s' }}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20">
            <Zap className="h-5 w-5 text-primary" />
          </div>
          Actions rapides
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action, index) => (
            <Button
              key={action.label}
              onClick={action.onClick}
              variant="outline"
              className="h-auto flex-col gap-2 p-4 border-border/40 hover:border-primary/50 transition-all duration-300 hover:scale-105 group animate-fade-in"
              style={{ animationDelay: `${0.5 + index * 0.1}s` }}
            >
              <div className={`p-3 rounded-xl bg-gradient-to-br ${action.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <action.icon className="h-5 w-5 text-white" />
              </div>
              <span className="text-sm font-medium">{action.label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
