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

### ✅ Phase 1: User Sync & Basic Save (COMPLETE)
1. **Clerk Webhook for User Sync** ✅
   - Sync Clerk users to database User table
   - Handle user.created and user.updated events

2. **Save Article Functionality** ✅
   - Server action to save articles
   - Uses Jina AI Reader to extract article content
   - Calculates estimated reading time
   - Calls AI analysis for topics and relevance scoring

3. **Dashboard UI Update** ✅
   - Displays SavedItems list with topics, relevance scores, estimated time
   - Save Article form with URL input
   - Empty state when no articles

### ✅ Phase 2: AI Analysis & Ranking (COMPLETE)
4. **AI Content Analysis** ✅
   - Uses `generateObject` with Zod for type-safe structured output
   - Extracts topics from article content using Gemini 2.0 Flash
   - Generates relevance score (0-1) based on user interests and goals
   - Creates reasoning explanation for the score
   - Stored in SavedItem (topics, relevanceScore, reasoning)

5. **User Profile Setup** ✅
   - Settings page to update interests, goals, reading speed
   - Stored in User table
   - Used by AI for relevance scoring

6. **Smart Ranking** ✅
   - Articles sorted by relevanceScore (desc) then savedAt (desc)
   - Filter tabs: All / Unread / Read / Archived / Quick Read (< 5 min)
   - URL-based filtering with counts
   - Mark as read/unread and archive/unarchive actions
   - Optimistic UI updates for instant feedback
   - Database indexes for optimal filter performance

### 🔄 Phase 3: Reading Experience (PARTIALLY COMPLETE)
7. **Mark as Read** ✅
   - Mark as read/unread buttons with icons
   - Updates `readAt` timestamp
   - Read articles shown with reduced opacity
   - Optimistic UI updates

8. **Archive Functionality** ✅
   - Archive/unarchive buttons with icons
   - Updates `archivedAt` timestamp
   - Hidden from main list (shown in archive filter)
   - Optimistic UI updates

9. **Reading View** 📋 TODO
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
