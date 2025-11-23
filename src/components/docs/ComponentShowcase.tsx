import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CodeBlock } from './CodeBlock';
import { Play, AlertCircle, Check } from 'lucide-react';
import { toast } from 'sonner';

export const ComponentShowcase = () => {
  const [inputValue, setInputValue] = useState('');
  const [switchChecked, setSwitchChecked] = useState(false);

  const buttonExamples = `// Button variants
<Button>Default</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
<Button variant="success">Success</Button>
<Button variant="premium">Premium</Button>

// Button sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Plus /></Button>`;

  const inputExamples = `// Input with label
<Input 
  label="Email" 
  placeholder="exemple@email.com"
  type="email"
/>

// Input with error
<Input 
  label="Password"
  type="password"
  error="Le mot de passe est requis"
/>

// Input with validation icon
<Input 
  label="Username"
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>`;

  const cardExamples = `// Basic Card
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    Card content goes here
  </CardContent>
</Card>

// Card with glassmorphism
<Card className="glass-card">
  <CardContent>
    Glass effect card
  </CardContent>
</Card>

// Card with hover effect
<Card className="hover-lift">
  <CardContent>
    Hover to see lift effect
  </CardContent>
</Card>`;

  return (
    <div className="space-y-8">
      {/* Buttons */}
      <Card className="glass-card border-primary/20">
        <CardHeader>
          <CardTitle className="text-2xl">Buttons</CardTitle>
          <CardDescription>Variantes de boutons avec effets ripple</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-semibold">Variants</h4>
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => toast.success('Button clicked!')}>Default</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
              <Button variant="success">
                <Check className="mr-2 h-4 w-4" />
                Success
              </Button>
              <Button variant="premium">
                <Play className="mr-2 h-4 w-4" />
                Premium
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Sizes</h4>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button size="icon">
                <Play className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Code Example</h4>
            <CodeBlock code={buttonExamples} />
          </div>
        </CardContent>
      </Card>

      {/* Inputs */}
      <Card className="glass-card border-primary/20">
        <CardHeader>
          <CardTitle className="text-2xl">Form Inputs</CardTitle>
          <CardDescription>Champs de formulaire avec labels flottants</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-semibold">Playground</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="Email"
                type="email"
                placeholder="exemple@email.com"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                error={inputValue.length > 0 && inputValue.length < 6 ? 'Minimum 6 caractères' : ''}
              />
              <Textarea
                label="Message"
                placeholder="Écrivez votre message..."
                maxLength={200}
                showCounter
              />
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Code Example</h4>
            <CodeBlock code={inputExamples} />
          </div>
        </CardContent>
      </Card>

      {/* Cards */}
      <Card className="glass-card border-primary/20">
        <CardHeader>
          <CardTitle className="text-2xl">Cards</CardTitle>
          <CardDescription>Conteneurs avec effets de profondeur</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-semibold">Variants</h4>
            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Default Card</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Standard card style</p>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Glass Card</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Glassmorphism effect</p>
                </CardContent>
              </Card>

              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle>Hover Lift</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Hover me!</p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Code Example</h4>
            <CodeBlock code={cardExamples} />
          </div>
        </CardContent>
      </Card>

      {/* Badges & Alerts */}
      <Card className="glass-card border-primary/20">
        <CardHeader>
          <CardTitle className="text-2xl">Badges & Alerts</CardTitle>
          <CardDescription>Éléments de notification et statut</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-semibold">Badges</h4>
            <div className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Alerts</h4>
            <div className="space-y-3">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Info</AlertTitle>
                <AlertDescription>
                  This is an informational alert message.
                </AlertDescription>
              </Alert>

              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  This is an error alert message.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Switch & Tabs */}
      <Card className="glass-card border-primary/20">
        <CardHeader>
          <CardTitle className="text-2xl">Interactive Components</CardTitle>
          <CardDescription>Composants interactifs</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-semibold">Switch</h4>
            <div className="flex items-center gap-4">
              <Switch checked={switchChecked} onCheckedChange={setSwitchChecked} />
              <span className="text-sm text-muted-foreground">
                {switchChecked ? 'Activé' : 'Désactivé'}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Tabs</h4>
            <Tabs defaultValue="tab1" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                <TabsTrigger value="tab3">Tab 3</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1" className="p-4 rounded-lg bg-muted/50">
                <p className="text-sm">Contenu de l'onglet 1</p>
              </TabsContent>
              <TabsContent value="tab2" className="p-4 rounded-lg bg-muted/50">
                <p className="text-sm">Contenu de l'onglet 2</p>
              </TabsContent>
              <TabsContent value="tab3" className="p-4 rounded-lg bg-muted/50">
                <p className="text-sm">Contenu de l'onglet 3</p>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
