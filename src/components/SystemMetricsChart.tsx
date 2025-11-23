import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Cpu, Database } from 'lucide-react';

interface MetricData {
  time: string;
  cpu: number;
  ram: number;
}

export const SystemMetricsChart = () => {
  const [metricsData, setMetricsData] = useState<MetricData[]>([
    { time: '00:00', cpu: 35, ram: 42 },
    { time: '00:05', cpu: 42, ram: 45 },
    { time: '00:10', cpu: 38, ram: 43 },
    { time: '00:15', cpu: 45, ram: 48 },
    { time: '00:20', cpu: 40, ram: 46 },
    { time: '00:25', cpu: 50, ram: 52 },
  ]);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetricsData((prev) => {
        const newData = [...prev.slice(1)];
        const lastTime = prev[prev.length - 1].time;
        const [hours, minutes] = lastTime.split(':').map(Number);
        const newMinutes = (minutes + 5) % 60;
        const newHours = minutes + 5 >= 60 ? (hours + 1) % 24 : hours;
        const newTime = `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`;
        
        newData.push({
          time: newTime,
          cpu: Math.floor(Math.random() * 30) + 30, // 30-60%
          ram: Math.floor(Math.random() * 20) + 40, // 40-60%
        });
        
        return newData;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const currentCpu = metricsData[metricsData.length - 1].cpu;
  const currentRam = metricsData[metricsData.length - 1].ram;

  return (
    <Card className="glass-card hover:shadow-2xl transition-all duration-500 border-primary/20 hover-lift">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-2xl">
          <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 shadow-xl button-texture-primary">
            <Cpu className="h-6 w-6 text-white" />
          </div>
          Métriques système
        </CardTitle>
        <CardDescription className="text-base">
          Surveillance en temps réel des ressources
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Values */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 depth-2">
            <div className="flex items-center gap-2 mb-2">
              <Cpu className="h-4 w-4 text-cyan-500" />
              <span className="text-sm font-medium text-muted-foreground">CPU</span>
            </div>
            <div className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              {currentCpu}%
            </div>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 depth-2">
            <div className="flex items-center gap-2 mb-2">
              <Database className="h-4 w-4 text-purple-500" />
              <span className="text-sm font-medium text-muted-foreground">RAM</span>
            </div>
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {currentRam}%
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={metricsData}>
              <defs>
                <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(189, 94%, 43%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(189, 94%, 43%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorRam" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(291, 64%, 42%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(291, 64%, 42%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="time"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="glass-card p-3 border border-primary/20 shadow-xl">
                        <p className="text-sm font-medium mb-2">{payload[0].payload.time}</p>
                        <div className="space-y-1">
                          <p className="text-sm flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-cyan-500"></span>
                            CPU: <span className="font-bold">{payload[0].value}%</span>
                          </p>
                          <p className="text-sm flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                            RAM: <span className="font-bold">{payload[1].value}%</span>
                          </p>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="cpu"
                stroke="hsl(189, 94%, 43%)"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorCpu)"
              />
              <Area
                type="monotone"
                dataKey="ram"
                stroke="hsl(291, 64%, 42%)"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorRam)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
