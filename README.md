# LaterStack

Your smart reading queue. Save articles and get AI-powered recommendations on what to read next based on your interests and available time.

🔗 **[laterstack.io](https://laterstack.io)**

## Features

- 🤖 **AI-Powered Ranking** - Articles scored by relevance to your interests
- ⏱️ **Reading Time Estimates** - Know how long each article takes
- 🎯 **Personal Goals** - Get recommendations aligned with what you want to learn
- 📱 **Clean Interface** - Distraction-free reading experience
- 🔖 **Stack from Anywhere** - Simple URL paste to add articles to your stack

## How It Works

1. **Stack** - Paste any article URL
2. **AI Ranks** - Articles scored based on your interests and goals
3. **Read** - Focus on what matters most to you right now

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Authentication:** Clerk
- **AI Analysis:** Google Gemini
- **Content Extraction:** Jina AI Reader
- **Database:** Vercel Postgres (Prisma ORM)
- **Styling:** Tailwind CSS + shadcn/ui
- **Deployment:** Vercel
- **DNS/CDN:** Cloudflare

## Local Development

```bash
# Clone the repository
git clone https://github.com/davigiroux/read-later
cd read-later

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Fill in your API keys

# Run database migrations
npx prisma generate
npx prisma db push

# Start development server
npm run dev
```

Visit `http://localhost:3000`

## Environment Variables

See `.env.example` for required variables:
- `DATABASE_URL` - Postgres connection string
- `CLERK_SECRET_KEY` - Clerk authentication
- `GOOGLE_GENERATIVE_AI_API_KEY` - Gemini API
- Plus other Clerk/Next.js variables

## Deployment

Deployed on Vercel with Cloudflare DNS.

## License

MIT

## Author

Built by [Davi Giroux](https://devgiroux.com)

---

**Live Site:** [laterstack.io](https://laterstack.io)
