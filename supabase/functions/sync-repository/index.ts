import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AppManifest {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  category?: string;
  version?: string;
  author?: string;
  website_url?: string;
  documentation_url?: string;
  repository_url?: string;
  docker_image?: string;
  docker_compose?: string;
  environment_variables?: Array<{
    name: string;
    description?: string;
    required?: boolean;
    default?: string;
  }>;
  ports?: Array<{
    container: number;
    host?: number;
    protocol?: string;
  }>;
  volumes?: Array<{
    container: string;
    host?: string;
  }>;
  dependencies?: string[];
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { repositoryId } = await req.json();

    if (!repositoryId) {
      throw new Error('repositoryId is required');
    }

    console.log(`Starting sync for repository: ${repositoryId}`);

    // Check cache first
    const { data: cachedData } = await supabase
      .from('manifest_cache')
      .select('manifest_data, expires_at')
      .eq('repository_id', repositoryId)
      .maybeSingle();

    // If cache is valid, use it
    if (cachedData && new Date(cachedData.expires_at) > new Date()) {
      console.log('Using cached manifest data');
      
      // Update repository sync status
      await supabase
        .from('repositories')
        .update({ 
          sync_status: 'completed',
          last_synced_at: new Date().toISOString()
        })
        .eq('id', repositoryId);
      
      // Process apps from cache (reuse existing logic)
      const apps = Array.isArray(cachedData.manifest_data) 
        ? cachedData.manifest_data 
        : cachedData.manifest_data.apps || [cachedData.manifest_data];
      
      console.log(`Found ${apps.length} apps in cache`);
      
      // Process cached apps (continue with existing processing logic)
      let successCount = 0;
      let errorCount = 0;

      for (const app of apps) {
        try {
          if (!app.id || !app.name) {
            console.warn(`Skipping app with missing required fields:`, app);
            errorCount++;
            continue;
          }

          const { data: existingApp } = await supabase
            .from('catalog_apps')
            .select('id')
            .eq('app_id', app.id)
            .eq('repository_id', repositoryId)
            .maybeSingle();

          const appData = {
            repository_id: repositoryId,
            app_id: app.id,
            name: app.name,
            description: app.description || null,
            icon: app.icon || null,
            category: app.category || 'tools',
            version: app.version || '1.0.0',
            author: app.author || null,
            website_url: app.website_url || null,
            documentation_url: app.documentation_url || null,
            repository_url: app.repository_url || null,
            docker_image: app.docker_image || null,
            docker_compose: app.docker_compose || null,
            environment_variables: app.environment_variables || [],
            ports: app.ports || [],
            volumes: app.volumes || [],
            dependencies: app.dependencies || [],
            manifest_data: app,
            updated_at: new Date().toISOString()
          };

          if (existingApp) {
            const { error: updateError } = await supabase
              .from('catalog_apps')
              .update(appData)
              .eq('id', existingApp.id);

            if (updateError) {
              console.error(`Error updating app ${app.id}:`, updateError);
              errorCount++;
            } else {
              console.log(`Updated app: ${app.name}`);
              successCount++;
            }
          } else {
            const { error: insertError } = await supabase
              .from('catalog_apps')
              .insert(appData);

            if (insertError) {
              console.error(`Error inserting app ${app.id}:`, insertError);
              errorCount++;
            } else {
              console.log(`Inserted app: ${app.name}`);
              successCount++;
            }
          }
        } catch (appError: any) {
          console.error(`Error processing app ${app.id}:`, appError);
          errorCount++;
        }
      }

      return new Response(
        JSON.stringify({ 
          success: true,
          message: `Synced ${successCount} apps from cache`,
          successCount,
          errorCount,
          cached: true
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      );
    }

    console.log('Cache miss or expired, fetching fresh data');

    // Get repository details
    const { data: repository, error: repoError } = await supabase
      .from('repositories')
      .select('*')
      .eq('id', repositoryId)
      .single();

    if (repoError || !repository) {
      throw new Error(`Repository not found: ${repoError?.message}`);
    }

    console.log(`Repository found: ${repository.name}`);

    // Update sync status to in_progress
    await supabase
      .from('repositories')
      .update({ 
        sync_status: 'in_progress',
        sync_error: null 
      })
      .eq('id', repositoryId);

    // Validate repository URL
    if (!repository.url.startsWith('https://raw.githubusercontent.com/')) {
      const error = 'URL invalide. Utilisez une URL GitHub raw (raw.githubusercontent.com)';
      await supabase
        .from('repositories')
        .update({ 
          sync_status: 'error',
          sync_error: error
        })
        .eq('id', repositoryId);
      throw new Error(error);
    }

    // Fetch manifest from repository
    let apps: AppManifest[] = [];
    
    try {
      if (repository.type === 'github') {
        console.log(`Fetching from URL: ${repository.url}`);
        
        // Handle GitHub repository with better error handling
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout
        
        const response = await fetch(repository.url, {
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'AutoServe-Sync/1.0',
            'Cache-Control': 'no-cache'
          },
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}. Vérifiez que l'URL est correcte et accessible publiquement.`);
        }

        const contentType = response.headers.get('content-type');
        if (!contentType?.includes('application/json')) {
          throw new Error(`Type de contenu invalide: ${contentType}. Le fichier doit être un JSON valide.`);
        }

        const data = await response.json();
        
        // Support both direct manifest and array of apps
        if (Array.isArray(data)) {
          apps = data;
        } else if (data.apps && Array.isArray(data.apps)) {
          apps = data.apps;
        } else if (data.id && data.name) {
          apps = [data];
        } else {
          throw new Error('Format de manifest invalide. Le JSON doit contenir un tableau d\'apps ou un objet app avec id et name.');
        }

        console.log(`Successfully parsed ${apps.length} apps from manifest`);
      }
    } catch (fetchError: any) {
      console.error('Error fetching repository:', fetchError);
      
      let errorMessage = fetchError.message;
      if (fetchError.name === 'AbortError') {
        errorMessage = 'Timeout: Le serveur met trop de temps à répondre';
      }
      
      await supabase
        .from('repositories')
        .update({ 
          sync_status: 'error',
          sync_error: errorMessage
        })
        .eq('id', repositoryId);
      
      throw fetchError;
    }

    console.log(`Found ${apps.length} apps in manifest`);

    // Cache the manifest data
    try {
      await supabase
        .from('manifest_cache')
        .upsert({
          repository_id: repositoryId,
          manifest_data: apps,
          cached_at: new Date().toISOString(),
          expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
        }, {
          onConflict: 'repository_id'
        });
      console.log('Manifest cached successfully');
    } catch (cacheError: any) {
      console.error('Error caching manifest:', cacheError);
      // Continue even if caching fails
    }

    // Process each app
    let successCount = 0;
    let errorCount = 0;

    for (const app of apps) {
      try {
        // Validate required fields
        if (!app.id || !app.name) {
          console.warn(`Skipping app with missing required fields:`, app);
          errorCount++;
          continue;
        }

        // Check if app already exists
        const { data: existingApp } = await supabase
          .from('catalog_apps')
          .select('id')
          .eq('app_id', app.id)
          .eq('repository_id', repositoryId)
          .maybeSingle();

        const appData = {
          repository_id: repositoryId,
          app_id: app.id,
          name: app.name,
          description: app.description || null,
          icon: app.icon || null,
          category: app.category || 'tools',
          version: app.version || '1.0.0',
          author: app.author || null,
          website_url: app.website_url || null,
          documentation_url: app.documentation_url || null,
          repository_url: app.repository_url || null,
          docker_image: app.docker_image || null,
          docker_compose: app.docker_compose || null,
          environment_variables: app.environment_variables || [],
          ports: app.ports || [],
          volumes: app.volumes || [],
          dependencies: app.dependencies || [],
          manifest_data: app,
          updated_at: new Date().toISOString()
        };

        if (existingApp) {
          // Update existing app
          const { error: updateError } = await supabase
            .from('catalog_apps')
            .update(appData)
            .eq('id', existingApp.id);

          if (updateError) {
            console.error(`Error updating app ${app.id}:`, updateError);
            errorCount++;
          } else {
            console.log(`Updated app: ${app.name}`);
            successCount++;
          }
        } else {
          // Insert new app
          const { error: insertError } = await supabase
            .from('catalog_apps')
            .insert(appData);

          if (insertError) {
            console.error(`Error inserting app ${app.id}:`, insertError);
            errorCount++;
          } else {
            console.log(`Inserted app: ${app.name}`);
            successCount++;
          }
        }
      } catch (appError: any) {
        console.error(`Error processing app ${app.id}:`, appError);
        errorCount++;
      }
    }

    // Update repository sync status
    await supabase
      .from('repositories')
      .update({ 
        sync_status: errorCount > 0 ? 'error' : 'completed',
        sync_error: errorCount > 0 ? `${errorCount} apps failed to sync` : null,
        last_synced_at: new Date().toISOString()
      })
      .eq('id', repositoryId);

    console.log(`Sync completed: ${successCount} success, ${errorCount} errors`);

    return new Response(
      JSON.stringify({ 
        success: true,
        message: `Synced ${successCount} apps successfully`,
        successCount,
        errorCount
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error: any) {
    console.error('Error in sync-repository:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
