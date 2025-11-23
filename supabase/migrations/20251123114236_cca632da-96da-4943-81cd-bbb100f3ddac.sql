-- Create table for manifest cache
CREATE TABLE IF NOT EXISTS public.manifest_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  repository_id UUID NOT NULL REFERENCES public.repositories(id) ON DELETE CASCADE,
  manifest_data JSONB NOT NULL,
  cached_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + interval '24 hours'),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(repository_id)
);

-- Index for faster lookups and expiration checks
CREATE INDEX idx_manifest_cache_repository_id ON public.manifest_cache(repository_id);
CREATE INDEX idx_manifest_cache_expires_at ON public.manifest_cache(expires_at);

-- Enable RLS
ALTER TABLE public.manifest_cache ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view cache entries
CREATE POLICY "Anyone can view manifest cache"
ON public.manifest_cache
FOR SELECT
USING (true);

-- Function to clean expired cache entries
CREATE OR REPLACE FUNCTION public.clean_expired_manifest_cache()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.manifest_cache
  WHERE expires_at < now();
END;
$$;

-- Comment on table
COMMENT ON TABLE public.manifest_cache IS 'Stores cached manifest data from repositories with 24-hour expiration';