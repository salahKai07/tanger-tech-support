// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://rviungqhkffmvefazrqh.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2aXVuZ3Foa2ZmbXZlZmF6cnFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2NTc2NzIsImV4cCI6MjA2MzIzMzY3Mn0.DdP1YdO4oClFDTPIxH3JY4vgoT4WesqZtfwqhS6aMg8";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);