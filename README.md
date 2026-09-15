# LinkedIn Profile Reviewer (v1)

Free tool: upload your LinkedIn "Save to PDF" export, get a section-by-section
score plus specific rewrite suggestions.

## Deploy this yourself (no coding required beyond copy/paste)

1. **Create a new GitHub repo** and push this folder to it.
   - Easiest way: on github.com, click "New repository", then use the
     "uploading an existing file" option to drag this whole folder in — or,
     if you're comfortable with git:
     ```
     git init
     git add .
     git commit -m "v1"
     git branch -M main
     git remote add origin <your-repo-url>
     git push -u origin main
     ```

2. **Import the repo into Vercel.**
   - Go to vercel.com → New Project → import your GitHub repo.
   - Framework preset should auto-detect as Next.js. Leave defaults as-is.

3. **Add your API key.**
   - In the Vercel project → Settings → Environment Variables.
   - Add a variable named exactly `GEMINI_API_KEY` with your Google AI Studio
     key as the value. Save.

4. **Deploy.**
   - Click Deploy (or redeploy if you added the env var after the first
     deploy — env vars only apply to new deployments).
   - Vercel gives you a live URL like `your-project.vercel.app`. That's your
     public product.

## Testing locally first (optional but recommended)

```
npm install
cp .env.local.example .env.local   # then paste your real key into .env.local
npm run dev
```
Visit http://localhost:3000, upload a test PDF, confirm it scores correctly
before deploying.

## Notes

- `GEMINI_API_KEY` must stay a server-side environment variable — never put
  it in any file inside `app/` that runs in the browser.
- The scoring prompt lives in `app/api/score/route.js` inside the
  `SYSTEM_PROMPT` constant — this is what to edit if we tweak the rubric
  later based on real usage.
- Uses Gemini's free tier (`gemini-2.5-flash`) — no billing required, but
  subject to Google's free-tier rate limits.
