# Read Later App - Next Steps

## ✅ Current Status

The initial project structure is complete with:
- Next.js 16 + TypeScript + Tailwind CSS v4
- Prisma 5.x with User and SavedItem models
- Clerk authentication (configured, needs API keys)
- Vercel AI SDK with Gemini 2.0 (needs API key)
- shadcn/ui components (button, input, card, badge)
- Landing page and dashboard placeholder

## 🔧 Immediate Setup Tasks

### 1. Get Vercel Postgres Database
```bash
# Create database at: https://vercel.com/davi-girouxs-projects/read-later/storage
# Click "Create Database" → Select "Postgres" → Name it "read-later-db"

# Pull environment variables
vercel env pull .env.local

# Create database tables
npx prisma db push

# (Optional) View database
npx prisma studio
```

### 2. Get Clerk API Keys
1. Sign up at https://clerk.com
2. Create new application
3. Copy keys to `.env`:
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
   CLERK_SECRET_KEY=sk_test_xxxxx
   ```

### 3. Get Google AI API Key
1. Visit https://aistudio.google.com/apikey
2. Create API key
3. Add to `.env`:
   ```env
   GOOGLE_GENERATIVE_AI_API_KEY=xxxxx
   ```

### 4. Run the App
```bash
npm run dev
# Visit http://localhost:3000
```

---

## 🚀 Feature Development Tasks

Once the setup is complete, continue with these features:

### Phase 1: User Sync & Basic Save
1. **Clerk Webhook for User Sync**
   - Create API route: `src/app/api/webhooks/clerk/route.ts`
   - Sync Clerk users to database User table
   - Handle user.created and user.updated events

2. **Save Article Functionality**
   - Create API route: `src/app/api/articles/save/route.ts`
   - Accept URL from user
   - Use cheerio to extract article content
   - Calculate estimated reading time (word count / readingSpeed)
   - Save to SavedItem table

3. **Dashboard UI Update**
   - Replace placeholder with actual SavedItems list
   - Display: title, URL, topics, relevanceScore, estimatedTime
   - Add "Save Article" form with URL input
   - Show empty state when no articles

### Phase 2: AI Analysis & Ranking
4. **AI Content Analysis**
   - Extract topics from article content using Gemini
   - Generate relevance score based on user interests
   - Create reasoning explanation for the score
   - Store in SavedItem (topics, relevanceScore, reasoning)

5. **User Profile Setup**
   - Create onboarding flow to collect:
     - User interests (tags/topics)
     - Goals (what they want to learn)
     - Reading speed (WPM)
   - Store in User table
   - Allow editing from dashboard

6. **Smart Ranking**
   - Sort articles by relevanceScore
   - Add filters: All / Unread / Read / Archived
   - Add "Quick Read" filter (< 5 min)

### Phase 3: Reading Experience
7. **Mark as Read**
   - Add button to mark article as read
   - Update `readAt` timestamp
   - Show read articles with different styling

8. **Archive Functionality**
   - Add archive button
   - Update `archivedAt` timestamp
   - Hide from main list (show in archive view)

9. **Reading View**
   - Create article detail page
   - Display full content with clean typography
   - Show AI reasoning for recommendation
   - Progress tracking

### Phase 4: Enhancements
10. **Bulk Operations**
    - Select multiple articles
    - Bulk mark as read/unread
    - Bulk archive/delete

11. **Search & Tags**
    - Search articles by title/content
    - Filter by AI-generated topics
    - Tag management

12. **Analytics Dashboard**
    - Reading stats (articles/week, time spent)
    - Topic distribution
    - Completion rate

---

## 📁 Key File Locations

```
src/
├── app/
│   ├── api/                    # API routes (create these)
│   │   ├── articles/
│   │   │   └── save/route.ts
│   │   └── webhooks/
│   │       └── clerk/route.ts
│   ├── dashboard/
│   │   └── page.tsx           # Update this with article list
│   └── layout.tsx             # Root layout with ClerkProvider
├── lib/
│   ├── db.ts                  # Prisma client
│   └── ai.ts                  # Gemini model
├── components/
│   └── ui/                    # shadcn components
└── types/
    └── index.ts               # TypeScript types

prisma/
└── schema.prisma              # Database models
```

---

## 🛠️ Useful Commands

```bash
# Development
npm run dev                    # Start dev server
npm run build                  # Build for production
npm run lint                   # Run ESLint

# Database
npx prisma generate            # Regenerate Prisma client
npx prisma db push             # Push schema changes to DB
npx prisma studio              # Open database GUI
npx prisma migrate dev         # Create migration (for production)

# Git
git add .
git commit -m "Add feature X"
git push

# Deployment
vercel                         # Deploy to Vercel
```

---

## 💡 Prompt to Continue Work

When ready to continue, use this prompt with Claude:

> "I'm ready to continue building the read-later app. We've completed the initial setup. Please help me implement [feature name from Phase 1-4]. The project is at /mnt/c/Users/daavi/projetos/read-later"

Or for the next logical step:

> "Let's implement the Clerk webhook to sync users to the database, then build the save article functionality."

---

## ⚠️ Important Notes

- **Environment Variables**: Never commit `.env` files (already in .gitignore)
- **Middleware Warning**: Next.js 16 deprecated `middleware.ts` in favor of `proxy.ts`, but Clerk requires Edge runtime. Keep using middleware.ts until Clerk adds proxy.ts support.
- **Database**: Run `npx prisma db push` after any schema changes
- **Prisma Client**: Run `npx prisma generate` if you get import errors

---

## 📚 Documentation Links

- Next.js 16: https://nextjs.org/docs
- Prisma: https://www.prisma.io/docs
- Clerk: https://clerk.com/docs
- shadcn/ui: https://ui.shadcn.com
- Vercel AI SDK: https://sdk.vercel.ai/docs
- Google Gemini: https://ai.google.dev/docs
