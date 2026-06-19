const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkAdmins() {
  const { data, error } = await supabase
    .from('admins')
    .select('email');
  
  if (error) {
    console.error('Error fetching admins:', error);
  } else {
    console.log('Admins in DB:', data);
  }
}

checkAdmins();
