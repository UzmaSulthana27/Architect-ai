import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Helper to check if URL is valid
const isValidUrl = (url) => {
  try {
    new URL(url);
    return url.startsWith('http://') || url.startsWith('https://');
  } catch {
    return false;
  }
};

let supabase;

if (!supabaseUrl || !supabaseAnonKey || !isValidUrl(supabaseUrl)) {
  console.warn('Supabase environment variables are missing or invalid. Database features will be limited.')
  // Create a mock client or a client with placeholder that doesn't crash the app boot
  // We use a dummy URL that is valid to avoid the "Invalid supabaseUrl" error
  supabase = createClient(
    'https://placeholder-project.supabase.co',
    'placeholder-key'
  )
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey)
}

export { supabase }
