-- Create repositories table to store app catalog sources
CREATE TABLE public.repositories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  url TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL DEFAULT 'github' CHECK (type IN ('github', 'url', 'local')),
  is_official BOOLEAN DEFAULT false,
  is_enabled BOOLEAN DEFAULT true,
  added_by UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  last_synced_at TIMESTAMP WITH TIME ZONE,
  sync_status TEXT DEFAULT 'pending' CHECK (sync_status IN ('pending', 'syncing', 'success', 'error')),
  sync_error TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create catalog_apps table for apps from repositories
CREATE TABLE public.catalog_apps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  repository_id UUID REFERENCES public.repositories(id) ON DELETE CASCADE NOT NULL,
  app_id TEXT NOT NULL, -- Unique identifier within the manifest
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  category TEXT,
  version TEXT,
  author TEXT,
  website_url TEXT,
  documentation_url TEXT,
  repository_url TEXT,
  docker_image TEXT,
  docker_compose TEXT, -- YAML config for docker-compose
  environment_variables JSONB DEFAULT '[]'::jsonb,
  ports JSONB DEFAULT '[]'::jsonb,
  volumes JSONB DEFAULT '[]'::jsonb,
  dependencies JSONB DEFAULT '[]'::jsonb,
  manifest_data JSONB, -- Full manifest data
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(repository_id, app_id)
);

-- Create user_installed_apps table to track installations
CREATE TABLE public.user_installed_apps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  catalog_app_id UUID REFERENCES public.catalog_apps(id) ON DELETE CASCADE NOT NULL,
  status TEXT NOT NULL DEFAULT 'installed' CHECK (status IN ('installing', 'installed', 'running', 'stopped', 'error')),
  configuration JSONB DEFAULT '{}'::jsonb, -- User-specific config
  container_id TEXT,
  installed_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, catalog_app_id)
);

-- Enable RLS on all tables
ALTER TABLE public.repositories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.catalog_apps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_installed_apps ENABLE ROW LEVEL SECURITY;

-- RLS Policies for repositories
CREATE POLICY "Anyone can view enabled repositories"
  ON public.repositories FOR SELECT
  USING (is_enabled = true);

CREATE POLICY "Authenticated users can add repositories"
  ON public.repositories FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = added_by);

CREATE POLICY "Users can update their own repositories"
  ON public.repositories FOR UPDATE
  TO authenticated
  USING (auth.uid() = added_by);

CREATE POLICY "Users can delete their own repositories"
  ON public.repositories FOR DELETE
  TO authenticated
  USING (auth.uid() = added_by);

-- RLS Policies for catalog_apps
CREATE POLICY "Anyone can view apps from enabled repositories"
  ON public.catalog_apps FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.repositories
      WHERE repositories.id = catalog_apps.repository_id
      AND repositories.is_enabled = true
    )
  );

-- RLS Policies for user_installed_apps
CREATE POLICY "Users can view their own installed apps"
  ON public.user_installed_apps FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can install apps"
  ON public.user_installed_apps FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own installed apps"
  ON public.user_installed_apps FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own installed apps"
  ON public.user_installed_apps FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_repositories_enabled ON public.repositories(is_enabled);
CREATE INDEX idx_repositories_added_by ON public.repositories(added_by);
CREATE INDEX idx_catalog_apps_repository ON public.catalog_apps(repository_id);
CREATE INDEX idx_catalog_apps_category ON public.catalog_apps(category);
CREATE INDEX idx_user_installed_apps_user ON public.user_installed_apps(user_id);
CREATE INDEX idx_user_installed_apps_status ON public.user_installed_apps(status);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_repositories_updated_at
  BEFORE UPDATE ON public.repositories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_catalog_apps_updated_at
  BEFORE UPDATE ON public.catalog_apps
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_installed_apps_updated_at
  BEFORE UPDATE ON public.user_installed_apps
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert default official repository
INSERT INTO public.repositories (name, description, url, type, is_official, is_enabled)
VALUES (
  'AutoServe Official',
  'Official AutoServe application catalog',
  'https://raw.githubusercontent.com/autoserve/catalog/main/manifest.json',
  'github',
  true,
  true
);
