import { createClient } from "@supabase/supabase-js";

// Vite's 'define' replaces these literal tokens at build time.
// We access them individually to ensure the static replacement works correctly.
const getRawUrl = () => {
  const url = (
    import.meta.env.VITE_SUPABASE_URL || 
    import.meta.env.SUPABASE_URL || 
    process.env.VITE_SUPABASE_URL || 
    process.env.SUPABASE_URL || 
    ""
  ).trim();
  return url;
};

const getRawKey = () => {
  const key = (
    import.meta.env.VITE_SUPABASE_ANON_KEY || 
    import.meta.env.SUPABASE_ANON_KEY || 
    process.env.VITE_SUPABASE_ANON_KEY || 
    process.env.SUPABASE_ANON_KEY || 
    ""
  ).trim();
  return key;
};

let rawUrl = getRawUrl();
const rawKey = getRawKey();

// Auto-construct URL if only project ID is provided
if (rawUrl && !rawUrl.includes('.')) {
  rawUrl = `https://${rawUrl}.supabase.co`;
}

// Auto-prefix with https:// if it looks like a domain but missing protocol
if (rawUrl && !rawUrl.startsWith('http') && rawUrl.includes('.')) {
  rawUrl = `https://${rawUrl}`;
}

// Validation helpers
const isVUrl = (url) => {
  if (!url) return false;
  // Support both custom domains and standard supabase.co domains
  return url.startsWith('http') && url.includes('.') && !url.includes('your-project-id');
};

const isVKey = (key) => {
  if (!key) return false;
  // Supabase anon keys are JWTs, usually very long (hundreds of characters)
  return key.length > 40 && !key.includes('your-anon-key');
};

export const isSupabaseConfigured = isVUrl(rawUrl) && isVKey(rawKey);
export const supabaseUrl = rawUrl;
export const supabaseAnonKey = rawKey;

// Detailed Diagnostics
if (typeof window !== 'undefined') {
  const diagnostics = {
    urlFound: !!rawUrl,
    urlValid: isVUrl(rawUrl),
    keyFound: !!rawKey,
    keyValid: isVKey(rawKey),
    overall: isSupabaseConfigured
  };

  if (!isSupabaseConfigured) {
    console.group("--- NEURAL LINK CONFIGURATION ERROR ---");
    console.table(diagnostics);
    if (!diagnostics.urlFound) console.error("MISSING: VITE_SUPABASE_URL in Secrets");
    else if (!diagnostics.urlValid) console.error("INVALID: VITE_SUPABASE_URL format. Must be a full URL.");
    
    if (!diagnostics.keyFound) console.error("MISSING: VITE_SUPABASE_ANON_KEY in Secrets");
    else if (!diagnostics.keyValid) console.error("INVALID: VITE_SUPABASE_ANON_KEY. Ensure it is the 'anon public' key from Supabase.");
    
    console.info("Please go to Settings > Secrets and add these variables.");
    console.groupEnd();
  }
}

let supabaseClient = null;
if (isSupabaseConfigured) {
  try {
    supabaseClient = createClient(rawUrl, rawKey);
  } catch (err) {
    console.error("Supabase Initialization Failed:", err);
  }
}

export const supabase = supabaseClient;
