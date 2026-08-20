# FunFinity Academy - Production Deployment Guide

This guide provides step-by-step instructions for deploying FunFinity Academy to production using Vercel.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Database Configuration](#database-configuration)
4. [Vercel Deployment](#vercel-deployment)
5. [Post-Deployment Configuration](#post-deployment-configuration)
6. [Security Checklist](#security-checklist)
7. [Monitoring and Maintenance](#monitoring-and-maintenance)

## Prerequisites

Before deploying to production, ensure you have:

- **Node.js** 18.0.0 or higher
- **npm** 9.0.0 or higher
- **Vercel account** (free tier works)
- **Supabase project** with production database
- **Google Cloud account** with Gemini AI API key
- **Domain name** (optional, for custom domain)

## Environment Setup

### 1. Clone and Prepare Repository

```bash
git clone https://github.com/your-org/FunFinity-Academy.git
cd FunFinity-Academy/frontend
npm install
```

### 2. Configure Environment Variables

Create a `.env.production` file in the `frontend` directory:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-production-anon-key

# Gemini AI Configuration
VITE_GEMINI_API_KEY=your-production-gemini-key

# Application Configuration
VITE_ADMIN_PASSWORD=!FunFinityAcademy@77!
```

**Important Security Notes:**
- Never commit `.env` files to version control
- Use strong, unique passwords for production
- Rotate API keys regularly
- Use different Supabase projects for dev/staging/prod

## Database Configuration

### 1. Set Up Production Supabase Project

1. Create a new Supabase project for production
2. Enable email/password authentication
3. Configure OAuth providers (Google, GitHub)
4. Set up email templates for verification

### 2. Execute Database Scripts

Run these SQL scripts in Supabase SQL Editor **in this exact order**:

```bash
# 1. Database Schema
Execute: 01-database-schema.sql

# 2. RLS Policies
Execute: 02-rls-policies.sql

# 3. Admin Setup
Execute: 03-admin-setup.sql

# 4. Performance Optimization
Execute: 04-performance-optimization.sql
```

### 3. Verify Database Setup

Run this query to verify all tables are created:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
```

Expected tables:
- profiles
- user_roles
- courses
- lessons
- enrollments
- course_progress
- quizzes
- quiz_questions
- quiz_submissions
- assignments
- assignment_submissions
- announcements
- forum_posts
- forum_replies
- messages
- conversations
- conversation_members
- notes
- bookmarks
- learning_dna_profiles
- career_profiles
- experience_logs
- badges
- user_badges
- points_history
- bug_logs
- activity_logs
- restrictions
- live_classes

### 4. Create Admin Accounts

After running the admin setup script, sign up with these admin credentials:

```bash
Email: funfinityacademy@gmail.com
Password: !FunFinityAcademy@77!

Email: academyfunfinity@gmail.com
Password: !FunFinityAcademy@77!
```

The system will automatically assign admin roles to these whitelisted emails.

## Vercel Deployment

### 1. Install Vercel CLI

```bash
npm install -g vercel
```

### 2. Login to Vercel

```bash
vercel login
```

### 3. Deploy to Production

From the project root directory:

```bash
vercel --prod
```

Follow the prompts:
- **Project name**: `funfinity-academy` (or your preferred name)
- **Build command**: `cd frontend && npm run build`
- **Output directory**: `frontend/dist`
- **Install command**: `cd frontend && npm install`

### 4. Configure Environment Variables in Vercel

After deployment, add environment variables in Vercel Dashboard:

1. Go to your project in Vercel Dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:

```
VITE_SUPABASE_URL=your-production-supabase-url
VITE_SUPABASE_ANON_KEY=your-production-anon-key
VITE_GEMINI_API_KEY=your-production-gemini-key
VITE_ADMIN_PASSWORD=!FunFinityAcademy@77!
```

4. Redeploy to apply changes:
```bash
vercel --prod --force
```

### 5. Configure Custom Domain (Optional)

1. In Vercel Dashboard, go to **Settings** → **Domains**
2. Add your custom domain
3. Configure DNS records as instructed by Vercel
4. Wait for SSL certificate provisioning

## Post-Deployment Configuration

### 1. Verify Deployment

```bash
# Check deployment status
vercel ls

# View production logs
vercel logs --prod
```

### 2. Test Critical Functions

- **Authentication**: Sign up and sign in with test accounts
- **Admin Access**: Verify admin dashboard is accessible
- **Database Operations**: Test course enrollment, progress tracking
- **AI Integration**: Test AI tutor functionality
- **Security**: Verify RLS policies are working

### 3. Set Up Monitoring

Enable Vercel Analytics:

1. Go to **Analytics** tab in Vercel Dashboard
2. Enable analytics for your project
3. Configure custom events tracking

### 4. Configure Error Tracking

Consider integrating error tracking services:

- **Sentry**: For error monitoring and alerting
- **LogRocket**: For session replay and debugging
- **Vercel Analytics**: For performance monitoring

## Security Checklist

### Authentication Security

- ✅ Cookie-based session storage (httpOnly, Secure, SameSite=Lax)
- ✅ No localStorage usage for auth tokens
- ✅ Automatic token refresh enabled
- ✅ Strong password requirements enforced
- ✅ Rate limiting on authentication endpoints

### Database Security

- ✅ Row-Level Security (RLS) policies enabled
- ✅ Service role keys properly secured
- ✅ Database backups configured
- ✅ Connection pooling enabled
- ✅ SSL/TLS enforced for all connections

### Application Security

- ✅ Content Security Policy (CSP) headers configured
- ✅ Strict-Transport-Security (HSTS) enabled
- ✅ X-Frame-Options set to DENY
- ✅ X-Content-Type-Options set to nosniff
- ✅ Permissions-Policy configured
- ✅ Cross-Origin policies set

### COPPA/GDPR Compliance

- ✅ Age verification flow implemented
- ✅ Parental consent workflow for minors
- ✅ Data retention policies configured
- ✅ Right to data deletion implemented
- ✅ Audit trail for consent changes

### API Security

- ✅ API keys stored in environment variables
- ✅ Rate limiting on API endpoints
- ✅ Input validation and sanitization
- ✅ SQL injection prevention via parameterized queries
- ✅ XSS prevention via CSP and input sanitization

## Monitoring and Maintenance

### Daily Checks

- Monitor Vercel deployment status
- Check error rates in analytics
- Review authentication metrics
- Verify database performance

### Weekly Tasks

- Review and rotate API keys if needed
- Check database backup status
- Review security logs for suspicious activity
- Update dependencies for security patches

### Monthly Tasks

- Review and optimize database queries
- Update SSL certificates (if using custom domain)
- Review and update RLS policies
- Performance audit and optimization

### Backup Strategy

**Database Backups:**
- Supabase provides automatic daily backups
- Configure point-in-time recovery (PITR) for critical data
- Export regular backups to external storage

**Application Backups:**
- Version control for all code
- Environment variable documentation
- Configuration backups

### Scaling Considerations

**When to Scale Up:**
- Database CPU usage > 70%
- Response times > 2s consistently
- Error rate > 1%
- User growth requires additional resources

**Scaling Options:**
- Upgrade Supabase project tier
- Enable Vercel Pro plan for additional features
- Configure CDN caching for static assets
- Implement database read replicas

## Troubleshooting

### Common Issues

**Build Fails:**
```bash
# Clear cache and rebuild
rm -rf node_modules frontend/node_modules
npm install
vercel --prod --force
```

**Environment Variables Not Loading:**
- Verify variable names match exactly (case-sensitive)
- Redeploy after adding variables
- Check Vercel dashboard for syntax errors

**Database Connection Issues:**
- Verify Supabase URL and anon key
- Check Supabase project status
- Verify RLS policies aren't blocking queries

**Authentication Not Working:**
- Clear browser cookies and cache
- Verify cookie settings in Supabase
- Check for CORS issues
- Review auth configuration

## Support and Resources

- **Vercel Documentation**: https://vercel.com/docs
- **Supabase Documentation**: https://supabase.com/docs
- **React Documentation**: https://react.dev
- **Vite Documentation**: https://vitejs.dev

## Emergency Contacts

- **Technical Support**: support@funfinityacademy.com
- **Security Issues**: security@funfinityacademy.com
- **Infrastructure Issues**: infrastructure@funfinityacademy.com

---

**Last Updated**: August 13, 2026
**Version**: 1.0.0
