const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

let supabase;

if (!supabaseUrl || !supabaseKey) {
  console.error('CRITICAL: Missing Supabase credentials in environment variables.');
  // Create a mock or null client to avoid crashing on initialization
  supabase = {
    from: () => ({
      select: () => ({
        eq: () => ({
          single: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
          select: () => Promise.resolve({ data: [], error: new Error('Supabase not configured') })
        }),
        order: () => Promise.resolve({ data: [], error: new Error('Supabase not configured') }),
        single: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') })
      }),
      insert: () => ({
        select: () => Promise.resolve({ data: [], error: new Error('Supabase not configured') })
      }),
      update: () => ({
        eq: () => ({
          select: () => Promise.resolve({ data: [], error: new Error('Supabase not configured') })
        })
      }),
      delete: () => ({
        eq: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') })
      })
    })
  };
} else {
  supabase = createClient(supabaseUrl, supabaseKey);
}

module.exports = supabase;
