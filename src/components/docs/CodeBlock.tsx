import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Button } from '@/components/ui/button';
import { Check, Copy } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { toast } from 'sonner';

interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
}

export const CodeBlock = ({ code, language = 'tsx', showLineNumbers = true }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);
  const { theme } = useTheme();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success('Code copié dans le presse-papier');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-xl overflow-hidden border border-border/40 depth-2">
      <Button
        size="sm"
        variant="ghost"
        onClick={handleCopy}
        className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        {copied ? (
          <>
            <Check className="h-4 w-4 mr-2" />
            Copié
          </>
        ) : (
          <>
            <Copy className="h-4 w-4 mr-2" />
            Copier
          </>
        )}
      </Button>

      <SyntaxHighlighter
        language={language}
        style={theme === 'dark' ? vscDarkPlus : oneLight}
        showLineNumbers={showLineNumbers}
        customStyle={{
          margin: 0,
          padding: '1.5rem',
          fontSize: '0.875rem',
          background: theme === 'dark' ? 'hsl(var(--card))' : 'hsl(var(--muted))',
        }}
        codeTagProps={{
          style: {
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
          },
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};
