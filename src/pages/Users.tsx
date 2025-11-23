import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users as UsersIcon } from 'lucide-react';

const Users = () => {
  return (
    <div className="min-h-full">
      <div className="container py-8 animate-fade-in max-w-7xl mx-auto">
        {/* Hero Header */}
        <div className="mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 blur-3xl -z-10 rounded-3xl" />
          <div className="glass-card p-8 rounded-3xl depth-3">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-2xl button-texture-primary">
                <UsersIcon className="h-10 w-10 text-white" />
              </div>
              <div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-shift">
                  Gestion des utilisateurs
                </h1>
                <p className="text-muted-foreground text-lg mt-2">
                  Gérez les comptes utilisateurs via le backend
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="glass-card hover:shadow-2xl transition-all duration-500 border-primary/20 animate-scale-in hover-lift">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-t-2xl">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-xl button-texture-primary">
                  <UsersIcon className="h-6 w-6 text-white" />
                </div>
                Liste des utilisateurs
              </CardTitle>
              <CardDescription className="text-base">
                La gestion des utilisateurs est gérée via le backend
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="text-center p-8">
                <p className="text-muted-foreground">
                  Les utilisateurs sont authentifiés via le backend.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Users;
