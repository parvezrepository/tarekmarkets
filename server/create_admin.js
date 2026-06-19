const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function createAdmin() {
  const email = 'admin@digimart.com';
  const password = 'admin123';
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Check if admin already exists
  const { data: existingAdmin } = await supabase
    .from('admins')
    .select('*')
    .eq('email', email)
    .single();

  if (existingAdmin) {
    console.log('Admin already exists.');
    return;
  }

  const { data, error } = await supabase
    .from('admins')
    .insert([{ email, password: hashedPassword, name: 'Admin User' }])
    .select();

  if (error) {
    console.error('Error creating admin:', error);
  } else {
    console.log('Admin created successfully:', data);
  }
}

createAdmin();
