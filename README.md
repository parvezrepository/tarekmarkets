# DigiMart - Full Stack Premium Marketplace

This is a professional digital products marketplace built with React, Node.js, and Supabase.

## Project Structure
- `/` - React Frontend (Vite)
- `/server` - Node.js + Express Backend API

## Setup Instructions

### 1. Database Setup (Supabase)
- Create a new project on [Supabase](https://supabase.com/).
- Go to the **SQL Editor** and run the contents of `supabase_schema.sql` to create the tables and seed initial data.
- Copy your `SUPABASE_URL` and `SUPABASE_ANON_KEY` from Project Settings > API.

### 2. Backend Setup
- Navigate to the `server` directory: `cd server`
- Create a `.env` file and fill in your credentials:
  ```env
  PORT=5000
  SUPABASE_URL=your_supabase_url
  SUPABASE_ANON_KEY=your_supabase_anon_key
  JWT_SECRET=your_random_jwt_secret
  ```
- Install dependencies: `npm install`
- Start the server: `npm run dev`

### 3. Frontend Setup
- Navigate back to the root: `cd ..`
- Create a `.env` file:
  ```env
  VITE_API_URL=http://localhost:5000/api
  ```
- Install dependencies: `npm install`
- Start the frontend: `npm run dev`

## API Endpoints

### Auth
- `POST /api/auth/login` - Admin login

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create (Admin)
- `PUT /api/products/:id` - Update (Admin)
- `DELETE /api/products/:id` - Delete (Admin)

### Orders
- `GET /api/orders` - Get all (Admin)
- `POST /api/orders` - Create (Customer)
- `PUT /api/orders/:id/status` - Update Status (Admin)

### Dashboard
- `GET /api/dashboard/stats` - Analytics (Admin)
