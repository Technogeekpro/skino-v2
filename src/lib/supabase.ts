import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://griajkntaexxjjtglycw.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdyaWFqa250YWV4eGpqdGdseWN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3ODg5ODQsImV4cCI6MjA1MjM2NDk4NH0.9LiPqxc9cftiKfgSETJxp6qgev8quNp_oO7T3Lc8Kmc";

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 