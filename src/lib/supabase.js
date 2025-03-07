import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://iozerhwhnutidhkgmcpm.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlvemVyaHdobnV0aWRoa2dtY3BtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEzNDkyNTYsImV4cCI6MjA1NjkyNTI1Nn0.N2APZaPezUrvNb9Y2cpdJn1T4JhHqqR74snGXf_VDvc";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
