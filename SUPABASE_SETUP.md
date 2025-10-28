# SUPABASE SETUP GUIDE

**Project:** Amante Restaurant Website
**Database:** Supabase (PostgreSQL)
**Date:** 2025-10-25
**Version:** 1.0

---

## TABLE OF CONTENTS

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Step 1: Create Supabase Project](#step-1-create-supabase-project)
4. [Step 2: Execute Database Migrations](#step-2-execute-database-migrations)
5. [Step 3: Configure Storage Bucket](#step-3-configure-storage-bucket)
6. [Step 4: Get Connection Credentials](#step-4-get-connection-credentials)
7. [Step 5: Configure Environment Variables](#step-5-configure-environment-variables)
8. [Step 6: Test Database Connection](#step-6-test-database-connection)
9. [Verification Checklist](#verification-checklist)
10. [Troubleshooting](#troubleshooting)
11. [Security Best Practices](#security-best-practices)

---

## OVERVIEW

This guide walks you through setting up the complete Supabase database infrastructure for the Amante Restaurant website. The database stores all form submissions including reservations, events, banquets, contact messages, feedback, and career applications.

**What you'll set up:**
- PostgreSQL database with 8 tables
- Row Level Security (RLS) policies
- Database indexes for performance
- Utility views for analytics
- Automated triggers
- Storage bucket for resume uploads

**Time required:** 15-20 minutes

---

## PREREQUISITES

Before you begin, ensure you have:

- [ ] GitHub account (for Supabase login)
- [ ] Email address for Supabase account
- [ ] This project cloned locally
- [ ] Access to the migration files in `supabase/migrations/`

---

## STEP 1: CREATE SUPABASE PROJECT

### 1.1 Sign Up for Supabase

1. Go to [https://supabase.com](https://supabase.com)
2. Click **"Start your project"** or **"Sign In"**
3. Sign in with your GitHub account (recommended) or email

### 1.2 Create New Project

1. Click **"New Project"** button
2. Fill in the project details:
   - **Name:** `amante-restaurant` (or your preferred name)
   - **Database Password:** Create a strong password (SAVE THIS!)
   - **Region:** Choose closest to your location (e.g., `ap-south-1` for India)
   - **Pricing Plan:** Free tier is sufficient for launch

3. Click **"Create new project"**
4. Wait 2-3 minutes for project initialization

**IMPORTANT:** Save your database password in a secure location!

### 1.3 Note Your Project Details

Once created, note these details from the project settings:

- **Project URL:** `https://xxxxx.supabase.co`
- **Project Reference ID:** `xxxxx`
- **Region:** Your selected region

---

## STEP 2: EXECUTE DATABASE MIGRATIONS

### 2.1 Access SQL Editor

1. In your Supabase project dashboard, click on **"SQL Editor"** in the left sidebar
2. You'll see the SQL query interface

### 2.2 Run Migration Files (IN ORDER)

You must run the migration files in the correct order. Each migration builds on the previous one.

#### Migration 001: Create Tables

1. Click **"New query"** button
2. Open the file: `supabase/migrations/001_create_tables.sql`
3. Copy the ENTIRE contents of the file
4. Paste into the SQL Editor
5. Click **"Run"** button (or press Ctrl/Cmd + Enter)
6. Wait for success message: `Migration 001 completed successfully!`

**Expected result:** 8 tables created
- reservations
- private_events
- banquets
- contact_submissions
- feedback
- career_applications
- newsletter_subscriptions
- events

#### Migration 002: Create Indexes

1. Click **"New query"** again
2. Open the file: `supabase/migrations/002_create_indexes.sql`
3. Copy and paste the entire contents
4. Click **"Run"**
5. Wait for success message

**Expected result:** Multiple indexes created for query optimization

#### Migration 003: Create RLS Policies

1. Click **"New query"**
2. Open the file: `supabase/migrations/003_create_rls_policies.sql`
3. Copy and paste the entire contents
4. Click **"Run"**
5. Wait for success message

**Expected result:** Row Level Security enabled on all tables

#### Migration 004: Create Views

1. Click **"New query"**
2. Open the file: `supabase/migrations/004_create_views.sql`
3. Copy and paste the entire contents
4. Click **"Run"**
5. Wait for success message

**Expected result:** 10 utility views created for analytics

#### Migration 005: Create Triggers

1. Click **"New query"**
2. Open the file: `supabase/migrations/005_create_triggers.sql`
3. Copy and paste the entire contents
4. Click **"Run"**
5. Wait for success message

**Expected result:** Functions and triggers created for automation

#### Migration 006: Seed Data (OPTIONAL - Development Only)

**WARNING:** Only run this in development/testing environments!

1. Click **"New query"**
2. Open the file: `supabase/migrations/006_seed_data.sql`
3. Copy and paste the entire contents
4. Click **"Run"**
5. Wait for success message

**Expected result:** Sample test data inserted

**For Production:** Skip this migration or delete the data after testing!

### 2.3 Verify Tables Created

1. Click **"Table Editor"** in the left sidebar
2. You should see all 8 tables listed:
   - reservations
   - private_events
   - banquets
   - contact_submissions
   - feedback
   - career_applications
   - newsletter_subscriptions
   - events

3. Click on each table to verify the structure

---

## STEP 3: CONFIGURE STORAGE BUCKET

The career applications form requires file uploads (resumes). We need to create a storage bucket.

### 3.1 Create Resumes Bucket

1. Click **"Storage"** in the left sidebar
2. Click **"New bucket"** button
3. Configure the bucket:
   - **Name:** `resumes`
   - **Public bucket:** ✅ **Checked** (resumes need to be downloadable)
   - **File size limit:** 5 MB
   - **Allowed MIME types:** `application/pdf`, `application/msword`, `application/vnd.openxmlformats-officedocument.wordprocessingml.document`

4. Click **"Create bucket"**

### 3.2 Configure Storage Policies

1. Click on the `resumes` bucket
2. Go to **"Policies"** tab
3. Click **"New policy"**

**Policy 1: Public Read Access**
```sql
-- Allow anyone to read resumes (for download)
CREATE POLICY "Public read access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'resumes');
```

**Policy 2: Public Upload Access**
```sql
-- Allow anyone to upload resumes
CREATE POLICY "Public upload access"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'resumes');
```

4. Click **"Review"** then **"Save policy"**

### 3.3 Verify Storage

1. Try uploading a test file to verify
2. Check that you can download it via public URL

---

## STEP 4: GET CONNECTION CREDENTIALS

### 4.1 Access Project Settings

1. Click **"Settings"** in the left sidebar (gear icon)
2. Click **"API"** under Project Settings

### 4.2 Copy Required Credentials

You'll need these values for your environment variables:

#### Project URL
```
URL: https://xxxxx.supabase.co
```

#### API Keys

**Anon Public Key** (for client-side requests):
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4eHh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2...
```

**Service Role Key** (for server-side requests - KEEP SECRET):
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4eHh4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIs...
```

**IMPORTANT:**
- The Service Role Key bypasses Row Level Security
- NEVER expose this key in client-side code
- NEVER commit it to Git

---

## STEP 5: CONFIGURE ENVIRONMENT VARIABLES

### 5.1 Create .env.local File

In your project root, create or update `.env.local`:

```bash
# ============================================================================
# SUPABASE CONFIGURATION
# ============================================================================

# Supabase Project URL (Public)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co

# Supabase Anon Key (Public - safe for client-side)
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Supabase Service Role Key (PRIVATE - server-side only)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# ============================================================================
# DATABASE CONFIGURATION (Optional - for direct connections)
# ============================================================================

# Database URL (if needed for migrations)
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
```

### 5.2 Replace Placeholder Values

Replace these placeholders with your actual values:

- `xxxxx` → Your Project Reference ID
- `eyJhbGciOiJIUzI1NiIs...` → Your actual Anon Key
- `eyJhbGciOiJIUzI1NiIs...` → Your actual Service Role Key
- `[YOUR-PASSWORD]` → Your database password

### 5.3 Verify .env.local is in .gitignore

Ensure `.env.local` is listed in your `.gitignore` file:

```gitignore
# Environment files
.env.local
.env*.local
```

### 5.4 Create .env.example (Template)

Create `.env.example` for other developers:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Database URL
DATABASE_URL=postgresql://postgres:your_password@db.xxxxx.supabase.co:5432/postgres
```

---

## STEP 6: TEST DATABASE CONNECTION

### 6.1 Install Dependencies

If not already installed:

```bash
npm install @supabase/supabase-js
```

### 6.2 Test Connection Script

The test script is located at `/scripts/test-database.ts`. Run it:

```bash
npm run test:db
```

Or using ts-node directly:

```bash
npx ts-node scripts/test-database.ts
```

### 6.3 Expected Output

You should see:
```
✓ Database connection successful
✓ All tables exist
✓ Sample insert test passed
✓ Sample query test passed
✓ RLS policies working correctly
```

### 6.4 Test in Supabase Dashboard

1. Go to **Table Editor**
2. Click on `reservations` table
3. You should see test data if you ran migration 006
4. Try inserting a row manually to verify

---

## VERIFICATION CHECKLIST

After completing setup, verify:

### Database Structure
- [ ] All 8 tables created and visible in Table Editor
- [ ] All tables have correct columns and data types
- [ ] Sample data visible (if ran migration 006)

### Indexes
- [ ] Go to SQL Editor and run:
```sql
SELECT schemaname, tablename, indexname
FROM pg_indexes
WHERE schemaname = 'public'
ORDER BY tablename, indexname;
```
- [ ] Should see multiple indexes for each table

### Row Level Security
- [ ] Go to **Authentication** → **Policies**
- [ ] Each table should have RLS enabled
- [ ] Each table should have INSERT policy for public
- [ ] Each table should have SELECT/UPDATE/DELETE policies for authenticated users

### Views
- [ ] Go to SQL Editor and run:
```sql
SELECT * FROM recent_reservations_summary LIMIT 5;
SELECT * FROM feedback_statistics;
SELECT * FROM pending_items_dashboard;
```
- [ ] Views should return data

### Triggers
- [ ] Insert a test reservation
- [ ] Verify `created_at` and `updated_at` are set automatically
- [ ] Update the reservation status
- [ ] Verify `updated_at` changed automatically

### Storage
- [ ] `resumes` bucket exists
- [ ] Public access enabled
- [ ] Upload policies working

### Environment Variables
- [ ] `.env.local` exists and has all required variables
- [ ] Variables are not committed to Git
- [ ] Test script connects successfully

---

## TROUBLESHOOTING

### Problem: Migration fails with "already exists" error

**Solution:**
- Some tables/functions may already exist
- Check Table Editor to see what exists
- Run only the migrations you need
- Or drop existing objects first (be careful!)

### Problem: RLS policies prevent inserts

**Solution:**
- Ensure you're using the Service Role Key in API routes
- Service Role Key bypasses RLS
- Check that policies allow `anon` role for INSERT

### Problem: Storage upload fails

**Solution:**
- Verify bucket exists and is public
- Check storage policies are created
- Verify file MIME type is allowed
- Check file size is under limit

### Problem: Connection fails in test script

**Solution:**
- Verify environment variables are correct
- Check Project URL format: `https://xxxxx.supabase.co`
- Ensure no extra spaces in .env.local
- Restart your development server

### Problem: "relation does not exist" error

**Solution:**
- Tables were not created successfully
- Re-run migration 001
- Check for error messages in SQL Editor

### Problem: Triggers not firing

**Solution:**
- Verify migration 005 completed successfully
- Check triggers exist:
```sql
SELECT trigger_name, event_object_table
FROM information_schema.triggers
WHERE trigger_schema = 'public';
```

---

## SECURITY BEST PRACTICES

### Environment Variables

1. **Never commit secrets to Git**
   - Always use `.env.local` for sensitive data
   - Keep `.env.local` in `.gitignore`
   - Use `.env.example` as a template

2. **Use appropriate keys**
   - Client-side: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Server-side: `SUPABASE_SERVICE_ROLE_KEY`
   - Never use Service Role Key in client code

3. **Rotate keys regularly**
   - Change database password periodically
   - Regenerate API keys if compromised

### Row Level Security

1. **Always enable RLS on tables with sensitive data**
   - Our migrations enable RLS by default
   - Never disable RLS in production

2. **Test RLS policies**
   - Try accessing data without authentication
   - Verify only allowed operations succeed

3. **Use service role carefully**
   - Only in server-side API routes
   - Never expose in client code

### Database Access

1. **Limit direct database access**
   - Use API routes for all operations
   - Don't expose database credentials to clients

2. **Use connection pooling**
   - Supabase handles this automatically
   - Don't create too many connections

3. **Monitor database usage**
   - Check Supabase dashboard regularly
   - Set up alerts for unusual activity

### Storage Security

1. **Validate file uploads**
   - Check MIME types
   - Enforce size limits
   - Scan for malware (future enhancement)

2. **Use signed URLs**
   - For private files (if needed)
   - Set expiration times

---

## NEXT STEPS

After completing this setup:

1. ✅ Database is ready for use
2. ✅ All tables and policies configured
3. ✅ Storage bucket ready for resumes
4. ✅ Environment variables configured

**You can now:**
- Start implementing API routes (Agent 4 - backend-engineer)
- Test form submissions
- Build the frontend forms
- Deploy to production

---

## PRODUCTION DEPLOYMENT

When deploying to production:

### 1. Create Production Supabase Project

- Create a separate project for production
- Use a different database password
- Choose production-ready region

### 2. Run Migrations (Except 006)

- Run migrations 001-005 only
- DO NOT run migration 006 (seed data)

### 3. Configure Production Environment

In Vercel (or your hosting platform):
- Add environment variables
- Use production Supabase credentials
- Enable production mode

### 4. Database Backups

- Enable automatic backups in Supabase
- Set up monitoring and alerts
- Document recovery procedures

---

## SUPPORT & RESOURCES

### Supabase Documentation
- [Supabase Docs](https://supabase.com/docs)
- [JavaScript Client Docs](https://supabase.com/docs/reference/javascript/introduction)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)

### Project Resources
- Database Schema: `DATABASE_SCHEMA.sql`
- API Specification: `API_ROUTES_SPEC.md`
- Technical Architecture: `TECHNICAL_ARCHITECTURE.md`

### Getting Help
- Supabase Discord: [discord.supabase.com](https://discord.supabase.com)
- GitHub Issues: For project-specific issues
- Email: support@supabase.com

---

## CHANGELOG

### Version 1.0 (2025-10-25)
- Initial setup guide
- 6 migration files
- Storage configuration
- Security policies
- Testing procedures

---

**Setup Guide Complete!** 🎉

Your Supabase database is now ready for the Amante Restaurant website. The backend engineer can now proceed with API route implementation.

---

**Document Owner:** Database Expert Agent
**Last Updated:** 2025-10-25
**Status:** ✅ Production Ready
