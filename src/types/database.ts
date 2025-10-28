/**
 * Database Type Definitions
 *
 * Auto-generated TypeScript types for Supabase database schema.
 * These types ensure type safety when interacting with the database.
 *
 * DO NOT EDIT MANUALLY - these should match your database schema exactly.
 *
 * To regenerate (future):
 * Run: npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/types/database.ts
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      reservations: {
        Row: {
          id: string;
          date: string;
          time: string;
          party_size: number;
          space_preference: string | null;
          occasion: string | null;
          name: string;
          phone: string;
          email: string;
          special_requests: string | null;
          agree_to_sms: boolean;
          status: string;
          admin_notes: string | null;
          confirmed_by: string | null;
          confirmed_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          date: string;
          time: string;
          party_size: number;
          space_preference?: string | null;
          occasion?: string | null;
          name: string;
          phone: string;
          email: string;
          special_requests?: string | null;
          agree_to_sms?: boolean;
          status?: string;
          admin_notes?: string | null;
          confirmed_by?: string | null;
          confirmed_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          date?: string;
          time?: string;
          party_size?: number;
          space_preference?: string | null;
          occasion?: string | null;
          name?: string;
          phone?: string;
          email?: string;
          special_requests?: string | null;
          agree_to_sms?: boolean;
          status?: string;
          admin_notes?: string | null;
          confirmed_by?: string | null;
          confirmed_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      private_events: {
        Row: {
          id: string;
          event_type: string;
          event_date: string;
          guest_count: number;
          budget_range: string | null;
          space_preference: string | null;
          name: string;
          phone: string;
          email: string;
          company: string | null;
          requirements: string | null;
          preferred_contact: string | null;
          status: string;
          admin_notes: string | null;
          quote_sent_at: string | null;
          quote_amount: number | null;
          assigned_to: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          event_type: string;
          event_date: string;
          guest_count: number;
          budget_range?: string | null;
          space_preference?: string | null;
          name: string;
          phone: string;
          email: string;
          company?: string | null;
          requirements?: string | null;
          preferred_contact?: string | null;
          status?: string;
          admin_notes?: string | null;
          quote_sent_at?: string | null;
          quote_amount?: number | null;
          assigned_to?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          event_type?: string;
          event_date?: string;
          guest_count?: number;
          budget_range?: string | null;
          space_preference?: string | null;
          name?: string;
          phone?: string;
          email?: string;
          company?: string | null;
          requirements?: string | null;
          preferred_contact?: string | null;
          status?: string;
          admin_notes?: string | null;
          quote_sent_at?: string | null;
          quote_amount?: number | null;
          assigned_to?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      banquets: {
        Row: {
          id: string;
          event_type: string;
          event_date: string;
          alternate_date: string | null;
          guest_count: number;
          timing_from: string;
          timing_to: string;
          requirements: string[] | null;
          name: string;
          phone: string;
          email: string;
          city: string | null;
          hear_about_us: string | null;
          additional_notes: string | null;
          request_type: string | null;
          status: string;
          admin_notes: string | null;
          site_visit_date: string | null;
          quote_sent_at: string | null;
          quote_amount: number | null;
          advance_paid: number;
          assigned_to: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          event_type: string;
          event_date: string;
          alternate_date?: string | null;
          guest_count: number;
          timing_from: string;
          timing_to: string;
          requirements?: string[] | null;
          name: string;
          phone: string;
          email: string;
          city?: string | null;
          hear_about_us?: string | null;
          additional_notes?: string | null;
          request_type?: string | null;
          status?: string;
          admin_notes?: string | null;
          site_visit_date?: string | null;
          quote_sent_at?: string | null;
          quote_amount?: number | null;
          advance_paid?: number;
          assigned_to?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          event_type?: string;
          event_date?: string;
          alternate_date?: string | null;
          guest_count?: number;
          timing_from?: string;
          timing_to?: string;
          requirements?: string[] | null;
          name?: string;
          phone?: string;
          email?: string;
          city?: string | null;
          hear_about_us?: string | null;
          additional_notes?: string | null;
          request_type?: string | null;
          status?: string;
          admin_notes?: string | null;
          site_visit_date?: string | null;
          quote_sent_at?: string | null;
          quote_amount?: number | null;
          advance_paid?: number;
          assigned_to?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      contact_submissions: {
        Row: {
          id: string;
          inquiry_type: string;
          name: string;
          phone: string;
          email: string;
          message: string;
          status: string;
          admin_notes: string | null;
          responded_at: string | null;
          responded_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          inquiry_type: string;
          name: string;
          phone: string;
          email: string;
          message: string;
          status?: string;
          admin_notes?: string | null;
          responded_at?: string | null;
          responded_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          inquiry_type?: string;
          name?: string;
          phone?: string;
          email?: string;
          message?: string;
          status?: string;
          admin_notes?: string | null;
          responded_at?: string | null;
          responded_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      feedback: {
        Row: {
          id: string;
          visit_date: string;
          space_visited: string | null;
          overall_rating: number;
          food_rating: number;
          service_rating: number;
          ambiance_rating: number;
          value_rating: number;
          what_you_loved: string | null;
          improvements: string | null;
          would_recommend: string | null;
          name: string | null;
          email: string | null;
          can_share_publicly: boolean;
          featured: boolean;
          admin_notes: string | null;
          published_on_website: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          visit_date: string;
          space_visited?: string | null;
          overall_rating: number;
          food_rating: number;
          service_rating: number;
          ambiance_rating: number;
          value_rating: number;
          what_you_loved?: string | null;
          improvements?: string | null;
          would_recommend?: string | null;
          name?: string | null;
          email?: string | null;
          can_share_publicly?: boolean;
          featured?: boolean;
          admin_notes?: string | null;
          published_on_website?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          visit_date?: string;
          space_visited?: string | null;
          overall_rating?: number;
          food_rating?: number;
          service_rating?: number;
          ambiance_rating?: number;
          value_rating?: number;
          what_you_loved?: string | null;
          improvements?: string | null;
          would_recommend?: string | null;
          name?: string | null;
          email?: string | null;
          can_share_publicly?: boolean;
          featured?: boolean;
          admin_notes?: string | null;
          published_on_website?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      career_applications: {
        Row: {
          id: string;
          position: string;
          full_name: string;
          email: string;
          phone: string;
          current_city: string;
          experience_years: number;
          current_position: string | null;
          expected_salary: number | null;
          resume_url: string;
          portfolio_url: string | null;
          why_amante: string;
          available_to_join: string | null;
          status: string;
          admin_notes: string | null;
          reviewed_by: string | null;
          reviewed_at: string | null;
          interview_scheduled_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          position: string;
          full_name: string;
          email: string;
          phone: string;
          current_city: string;
          experience_years: number;
          current_position?: string | null;
          expected_salary?: number | null;
          resume_url: string;
          portfolio_url?: string | null;
          why_amante: string;
          available_to_join?: string | null;
          status?: string;
          admin_notes?: string | null;
          reviewed_by?: string | null;
          reviewed_at?: string | null;
          interview_scheduled_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          position?: string;
          full_name?: string;
          email?: string;
          phone?: string;
          current_city?: string;
          experience_years?: number;
          current_position?: string | null;
          expected_salary?: number | null;
          resume_url?: string;
          portfolio_url?: string | null;
          why_amante?: string;
          available_to_join?: string | null;
          status?: string;
          admin_notes?: string | null;
          reviewed_by?: string | null;
          reviewed_at?: string | null;
          interview_scheduled_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      newsletter_subscriptions: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          subscribed: boolean;
          unsubscribed_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name?: string | null;
          subscribed?: boolean;
          unsubscribed_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string | null;
          subscribed?: boolean;
          unsubscribed_at?: string | null;
          created_at?: string;
        };
      };
      events: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          event_type: string | null;
          event_date: string;
          start_time: string | null;
          end_time: string | null;
          space: string | null;
          image_url: string | null;
          is_recurring: boolean;
          recurrence_pattern: string | null;
          published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          event_type?: string | null;
          event_date: string;
          start_time?: string | null;
          end_time?: string | null;
          space?: string | null;
          image_url?: string | null;
          is_recurring?: boolean;
          recurrence_pattern?: string | null;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          event_type?: string | null;
          event_date?: string;
          start_time?: string | null;
          end_time?: string | null;
          space?: string | null;
          image_url?: string | null;
          is_recurring?: boolean;
          recurrence_pattern?: string | null;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      recent_reservations_summary: {
        Row: {
          id: string | null;
          date: string | null;
          time: string | null;
          name: string | null;
          phone: string | null;
          party_size: number | null;
          space_preference: string | null;
          status: string | null;
          created_at: string | null;
        };
      };
      upcoming_reservations: {
        Row: {
          id: string | null;
          date: string | null;
          time: string | null;
          name: string | null;
          phone: string | null;
          party_size: number | null;
          space_preference: string | null;
          special_requests: string | null;
          status: string | null;
          confirmed_by: string | null;
          confirmed_at: string | null;
        };
      };
      feedback_statistics: {
        Row: {
          space_visited: string | null;
          total_reviews: number | null;
          avg_overall_rating: number | null;
          avg_food_rating: number | null;
          avg_service_rating: number | null;
          avg_ambiance_rating: number | null;
          avg_value_rating: number | null;
          five_star_count: number | null;
          four_star_count: number | null;
          three_star_count: number | null;
          two_star_count: number | null;
          one_star_count: number | null;
          definitely_recommend: number | null;
          shareable_reviews: number | null;
        };
      };
      overall_feedback_statistics: {
        Row: {
          total_reviews: number | null;
          avg_overall_rating: number | null;
          avg_food_rating: number | null;
          avg_service_rating: number | null;
          avg_ambiance_rating: number | null;
          avg_value_rating: number | null;
          positive_review_percentage: number | null;
          recommendation_rate: number | null;
          testimonial_count: number | null;
          featured_count: number | null;
        };
      };
      featured_testimonials: {
        Row: {
          id: string | null;
          visit_date: string | null;
          space_visited: string | null;
          overall_rating: number | null;
          what_you_loved: string | null;
          name: string | null;
          created_at: string | null;
        };
      };
      pending_items_dashboard: {
        Row: {
          item_type: string | null;
          id: string | null;
          customer_name: string | null;
          customer_email: string | null;
          customer_phone: string | null;
          created_at: string | null;
          status: string | null;
        };
      };
      reservation_analytics: {
        Row: {
          date: string | null;
          total_reservations: number | null;
          total_guests: number | null;
          confirmed_count: number | null;
          pending_count: number | null;
          cancelled_count: number | null;
          rooftop_count: number | null;
          lounge_count: number | null;
          cafe_count: number | null;
          avg_party_size: number | null;
        };
      };
      career_applications_summary: {
        Row: {
          position: string | null;
          total_applications: number | null;
          new_applications: number | null;
          in_screening: number | null;
          interviews_scheduled: number | null;
          selected: number | null;
          joined: number | null;
          avg_experience: number | null;
          avg_expected_salary: number | null;
        };
      };
      monthly_submissions_summary: {
        Row: {
          month: string | null;
          form_type: string | null;
          submission_count: number | null;
        };
      };
      event_calendar_public: {
        Row: {
          id: string | null;
          title: string | null;
          description: string | null;
          event_type: string | null;
          event_date: string | null;
          start_time: string | null;
          end_time: string | null;
          space: string | null;
          image_url: string | null;
        };
      };
    };
    Functions: {
      get_pending_count: {
        Args: Record<string, never>;
        Returns: {
          form_type: string;
          pending_count: number;
        }[];
      };
      get_todays_reservations: {
        Args: Record<string, never>;
        Returns: {
          id: string;
          time: string;
          name: string;
          phone: string;
          party_size: number;
          space_preference: string | null;
          special_requests: string | null;
          status: string;
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
