export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      catalog_apps: {
        Row: {
          app_id: string
          author: string | null
          category: string | null
          created_at: string | null
          dependencies: Json | null
          description: string | null
          docker_compose: string | null
          docker_image: string | null
          documentation_url: string | null
          environment_variables: Json | null
          icon: string | null
          id: string
          manifest_data: Json | null
          name: string
          ports: Json | null
          repository_id: string
          repository_url: string | null
          updated_at: string | null
          version: string | null
          volumes: Json | null
          website_url: string | null
        }
        Insert: {
          app_id: string
          author?: string | null
          category?: string | null
          created_at?: string | null
          dependencies?: Json | null
          description?: string | null
          docker_compose?: string | null
          docker_image?: string | null
          documentation_url?: string | null
          environment_variables?: Json | null
          icon?: string | null
          id?: string
          manifest_data?: Json | null
          name: string
          ports?: Json | null
          repository_id: string
          repository_url?: string | null
          updated_at?: string | null
          version?: string | null
          volumes?: Json | null
          website_url?: string | null
        }
        Update: {
          app_id?: string
          author?: string | null
          category?: string | null
          created_at?: string | null
          dependencies?: Json | null
          description?: string | null
          docker_compose?: string | null
          docker_image?: string | null
          documentation_url?: string | null
          environment_variables?: Json | null
          icon?: string | null
          id?: string
          manifest_data?: Json | null
          name?: string
          ports?: Json | null
          repository_id?: string
          repository_url?: string | null
          updated_at?: string | null
          version?: string | null
          volumes?: Json | null
          website_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "catalog_apps_repository_id_fkey"
            columns: ["repository_id"]
            isOneToOne: false
            referencedRelation: "repositories"
            referencedColumns: ["id"]
          },
        ]
      }
      manifest_cache: {
        Row: {
          cached_at: string
          created_at: string
          expires_at: string
          id: string
          manifest_data: Json
          repository_id: string
        }
        Insert: {
          cached_at?: string
          created_at?: string
          expires_at?: string
          id?: string
          manifest_data: Json
          repository_id: string
        }
        Update: {
          cached_at?: string
          created_at?: string
          expires_at?: string
          id?: string
          manifest_data?: Json
          repository_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "manifest_cache_repository_id_fkey"
            columns: ["repository_id"]
            isOneToOne: true
            referencedRelation: "repositories"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          id: string
          username: string
        }
        Insert: {
          created_at?: string | null
          id: string
          username: string
        }
        Update: {
          created_at?: string | null
          id?: string
          username?: string
        }
        Relationships: []
      }
      repositories: {
        Row: {
          added_by: string | null
          created_at: string | null
          description: string | null
          id: string
          is_enabled: boolean | null
          is_official: boolean | null
          last_synced_at: string | null
          name: string
          sync_error: string | null
          sync_status: string | null
          type: string
          updated_at: string | null
          url: string
        }
        Insert: {
          added_by?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_enabled?: boolean | null
          is_official?: boolean | null
          last_synced_at?: string | null
          name: string
          sync_error?: string | null
          sync_status?: string | null
          type?: string
          updated_at?: string | null
          url: string
        }
        Update: {
          added_by?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_enabled?: boolean | null
          is_official?: boolean | null
          last_synced_at?: string | null
          name?: string
          sync_error?: string | null
          sync_status?: string | null
          type?: string
          updated_at?: string | null
          url?: string
        }
        Relationships: []
      }
      user_installed_apps: {
        Row: {
          catalog_app_id: string
          configuration: Json | null
          container_id: string | null
          id: string
          installed_at: string | null
          status: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          catalog_app_id: string
          configuration?: Json | null
          container_id?: string | null
          id?: string
          installed_at?: string | null
          status?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          catalog_app_id?: string
          configuration?: Json | null
          container_id?: string | null
          id?: string
          installed_at?: string | null
          status?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_installed_apps_catalog_app_id_fkey"
            columns: ["catalog_app_id"]
            isOneToOne: false
            referencedRelation: "catalog_apps"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      clean_expired_manifest_cache: { Args: never; Returns: undefined }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
