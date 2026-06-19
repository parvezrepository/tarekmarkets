const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function createAgentAdmin() {
  const email = 'agent@tradekit.com';
  const password = 'admin123';
  const hashedPassword = await bcrypt.hash(password, 10);

  const { data, error } = await supabase
    .from('admins')
    .upsert({ 
      email: email, 
      password: hashedPassword, 
      name: 'Agent Admin' 
    }, { onConflict: 'email' })
    .select();

  if (error) {
    console.error('Error creating agent admin:', error);
  } else {
    console.log('Agent admin created/updated:', data);
  }
}

createAgentAdmin();
