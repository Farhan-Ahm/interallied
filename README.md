# Interallied — Next.js + Bootstrap Website

Transformers, Switchgear & Switchboard catalogue website with inquiry cart and email notifications.

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Configure email (see below)
# Edit .env.local

# 3. Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Email Configuration

Edit `.env.local`:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=your-app-password        # Gmail App Password (not account password)
ADMIN_EMAIL=your-admin@email.com   # Where you receive inquiries
```

### Gmail App Password
1. Go to Google Account → Security → 2-Step Verification → App passwords
2. Create one for "Mail"
3. Paste it into SMTP_PASS

---

## Project Structure

```
src/
  app/
    page.js              ← Main single-page site (all sections)
    layout.js            ← Root layout + fonts + Bootstrap Icons
    globals.css          ← Full design system (steel blue + orange)
    utils/
      mailer.js          ← Nodemailer email sender
    api/
      send-inquiry/
        route.js         ← POST /api/send-inquiry
```

## Features

- ✅ Single-page: Home → About → Catalogue → Contact
- ✅ 6 product categories, 18 products
- ✅ Category tab filtering
- ✅ Floating cart → slide-out drawer → checkout form
- ✅ Email sent to admin + customer on inquiry submit
- ✅ Contact form (general enquiries)
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Dark steel blue + orange industrial theme
- ✅ Bootstrap 5.3 + Bootstrap Icons
