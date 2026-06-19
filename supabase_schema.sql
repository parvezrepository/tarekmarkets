-- Tables for TradeKit Premium Marketplace

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Admins Table
CREATE TABLE IF NOT EXISTS admins (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Products Table
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(12, 2) NOT NULL,
    old_price DECIMAL(12, 2),
    category TEXT NOT NULL,
    image TEXT,
    video_url TEXT,
    badge TEXT,
    features JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Settings Table
CREATE TABLE IF NOT EXISTS settings (
    id SERIAL PRIMARY KEY,
    sitename TEXT DEFAULT 'Tarek Markets',
    announcement TEXT,
    whatsapp TEXT,
    telegram TEXT,
    bkash TEXT,
    nagad TEXT,
    facebook TEXT,
    twitter TEXT,
    instagram TEXT,
    youtube TEXT,
    telegram_channel TEXT,
    whatsapp_channel TEXT,
    home_product_count INTEGER DEFAULT 3,
    usd_rate DECIMAL(10, 2) DEFAULT 120.00,
    homepage_settings JSONB DEFAULT '{}'::jsonb,
    categories JSONB DEFAULT '["Binary Trading", "Forex Trading", "Crypto Trading"]'::jsonb,
    testimonials JSONB DEFAULT '[]'::jsonb,
    faqs JSONB DEFAULT '[]'::jsonb,
    privacy_policy TEXT,
    terms_of_service TEXT,
    affiliate_program TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Orders Table
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_whatsapp TEXT,
    product_id UUID REFERENCES products(id),
    amount DECIMAL(12, 2) NOT NULL,
    currency TEXT DEFAULT 'BDT',
    status TEXT DEFAULT 'Pending',
    transaction_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Customers Table
CREATE TABLE IF NOT EXISTS customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    whatsapp TEXT,
    total_spent DECIMAL(12, 2) DEFAULT 0,
    last_purchase TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Initial Settings
INSERT INTO settings (
    announcement, 
    whatsapp, 
    telegram, 
    usd_rate,  
    privacy_policy, 
    terms_of_service, 
    affiliate_program
) 
VALUES (
    '🚀 Flash Sale: Get 20% Off on all Trading Courses!', 
    '+880123456789', 
    't.me/tradekit', 
    120.00,
    '<h1>Privacy Policy</h1><p>Welcome to TradeKit. We value your privacy and are committed to protecting your personal data. This policy outlines how we collect, use, and safeguard your information when you visit our marketplace.</p><h2>Information Collection</h2><p>We collect basic information such as name, email, and contact details only when you initiate a purchase or contact our support team.</p><h2>Data Security</h2><p>Your security is our priority. We use industry-standard encryption to protect your data during transactions.',
    '<h1>Terms of Service</h1><p>By accessing TradeKit, you agree to comply with these terms. Our digital products are provided "as is" and are intended for educational and professional trading purposes.</p><h2>Usage License</h2><p>Upon purchase, you are granted a non-transferable license to use the software for personal or commercial trading accounts as specified in the product description.',
    '<h1>Affiliate Program</h1><p>Join the TradeKit Affiliate Network and earn commissions on every successful referral. We offer competitive rates and real-time tracking for our partners.</p><h2>Commission Structure</h2><p>Earn up to 20% commission on every course sold through your unique referral link.</p><h2>Payouts</h2><p>Payments are processed monthly via bKash, Nagad, or Crypto once you reach the minimum threshold.'
)
ON CONFLICT DO NOTHING;
