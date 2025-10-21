# Contact Form Setup - Complete ✅

## What Was Done

1. **Supabase Table** - Created SQL file for contact submissions
2. **Resend Integration** - Email notifications for you and clients
3. **Updated Contact Form** - New qualifying questions and fields
4. **Netlify Functions** - Serverless email handler

---

## Next Steps

### 1. Run SQL in Supabase
Open Supabase SQL Editor and run:
```bash
Apps/portfolio/contact_submissions_table.sql
```

### 2. Deploy to Netlify
Your site needs these environment variables in Netlify dashboard:

```
REACT_APP_SUPABASE_URL=https://imjetatkwdfodzfjrgwx.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltamV0YXRrd2Rmb2R6ZmpyZ3d4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEwMjI0NjgsImV4cCI6MjA3NjU5ODQ2OH0.EzZFXHBu1RoCPE-9wqeVeesKqOF5aYUciXS_Q5sR38E
RESEND_API_KEY=re_j5i5zjMw_KAARq1nu7FeB5XYxNBWS7cEH
```

### 3. Verify Resend Domain
In Resend dashboard, add your domain to send from your actual email instead of `onboarding@resend.dev`

---

## Form Fields (What You Asked For)

✅ First Name / Last Name
✅ Email
✅ Company (optional)
✅ Phone
✅ App Description
✅ **Budget Range** (subject line qualifier)
- Under $1K = 🟢 Quick Project
- $1K-$3K = 🟡 Small Project
- $3K-$5K = 🟠 Medium Project
- $5K-$10K = 🔴 Large Project
- $10K+ = 🔥 Premium Project
- Not Sure = ❓ Budget TBD

✅ **Platforms** (iOS/Android/Web checkboxes)
✅ **Timeline** (ASAP to Flexible)
✅ **Has Design** (Yes/Partially/No)

---

## How It Works

1. Client fills form → Saves to Supabase `contact_submissions` table
2. Netlify function triggers → Sends 2 emails via Resend:
   - **To You**: Subject shows budget/project size for quick qualification
   - **To Client**: Confirmation with submission summary
3. You can view all submissions in Supabase dashboard

---

## Files Modified/Created

- `src/main/contact.tsx` - Updated form
- `netlify/functions/send-contact-email.ts` - Email handler
- `contact_submissions_table.sql` - Database schema
- `.env` - Updated with credentials
- `netlify.toml` - Config file
- Installed: `resend` and `@netlify/functions`
