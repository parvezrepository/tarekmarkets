import { createClient } from '@supabase/supabase-base';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

async function checkTables() {
  const { data: products, error: pError } = await supabase.from('products').select('count');
  const { data: orders, error: oError } = await supabase.from('orders').select('count');
  const { data: settings, error: sError } = await supabase.from('settings').select('count');
  
  console.log('Products:', products ? 'OK' : pError.message);
  console.log('Orders:', orders ? 'OK' : oError.message);
  console.log('Settings:', settings ? 'OK' : sError.message);
}

checkTables();
