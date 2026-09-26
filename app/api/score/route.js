import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const SYSTEM_PROMPT = `You are a LinkedIn profile reviewer built specifically for college students and
early-career tech talent in India. You are direct, specific, and encouraging —
never generic. You never invent facts that aren't in the profile text; if a
section is missing entirely, say so and score it accordingly.

You will be given raw text extracted from a user's LinkedIn PDF export. This
text export does NOT include photos, banners, or logos — do not attempt to
score or comment on visual elements, since you have no information about them.
Section boundaries may be imperfect due to PDF extraction — use context and
headings to identify: Headline, About, Experience, Projects, Honors & Awards,
and Skills.

Score the profile against this rubric. For each section, give a score out of
10 and specific, actionable feedback — not vague praise or criticism.

1. HEADLINE — penalize bare "Degree + University" unless the university is globally elite
   (IIT, MIT, Stanford, etc). Reward a clear identity statement over a job-title label
   (e.g. prefer "Building applications in MERN" over "MERN Stack Developer"). Penalize
   keyword-stuffed headlines with no coherent identity.
2. CONTACT INFO — email visible? portfolio and/or GitHub linked?
3. ABOUT — opens with what they're building/working on rather than restating a resume?
   easy to read (short paragraphs)?
4. EXPERIENCE — do bullets state role, what was built/done, and a quantified impact metric
   where possible? Flag vague duty-listing bullets. Do not comment on logos — you cannot see them.
5. PROJECTS — present at all? states tech stack and what was actually built?
6. HONORS & AWARDS — broadly defined: hackathons, competitions, case study wins, pitch
   events, speaking engagements, fellowships, or other earned recognition. Flag as missing
   only if there's no evidence of any such achievement anywhere in the profile.
7. SKILLS — 5+ relevant skills listed? aligned with headline/About, or contradicting it?

Do not score Certifications as a weighted category; mention only as a minor bonus note if present.

Return ONLY valid JSON matching this shape, no prose outside the JSON:
{
  "overall_score": <0-100 integer, based only on the 7 scored sections above>,
  "sections": [
    {
      "name": "<section name from the 7 above>",
      "score": <0-10 integer>,
      "whats_working": "<1-2 sentences, or empty string>",
      "issues": ["<specific issue>", "..."],
      "rewrite_suggestion": "<a concrete rewritten example the user could paste in, or empty string>"
    }
  ],
  "top_3_priorities": ["<highest-impact fix>", "...", "..."]
}`;

const VISUAL_CHECKLIST = [
  {
    name: 'Photo & banner',
    tip: "Can't be checked from your PDF text — images aren't included in the export. Make sure your photo is a clear, professional headshot and your banner isn't left blank or default.",
  },
  {
    name: 'Company logos',
    tip: "Also not visible in the text export. Check that each Experience entry shows the correct company logo — a missing or wrong logo quietly hurts credibility.",
  },
  {
    name: 'Featured section',
    tip: "LinkedIn's PDF export doesn't include Featured content, so we can't see if you're using it. It's one of the most-skipped, highest-leverage spots on a profile — worth a manual check.",
  },
];

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Server is missing its API key. Add GEMINI_API_KEY in your Vercel project settings.' },
        { status: 500 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const pdfParse = (await import('pdf-parse/lib/pdf-parse.js')).default;
    const pdfData = await pdfParse(buffer);
    const profileText = pdfData.text?.trim();

    if (!profileText || profileText.length < 30) {
      return NextResponse.json(
        { error: "Couldn't read text from that PDF. Make sure it's the 'Save to PDF' export from your LinkedIn profile." },
        { status: 400 }
      );
    }

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: [{ role: 'user', parts: [{ text: profileText }] }],
          generationConfig: { response_mime_type: 'application/json' },
        }),
      }
    );

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      console.error('Gemini API error:', errText);
      return NextResponse.json(
        { error: 'The scoring service is temporarily unavailable. Please try again shortly.' },
        { status: 502 }
      );
    }

    const geminiJson = await geminiRes.json();
    const rawText = geminiJson?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      return NextResponse.json({ error: 'Scoring failed — no result returned.' }, { status: 502 });
    }

    let parsed;
    try {
      parsed = JSON.parse(rawText);
    } catch (e) {
      console.error('Failed to parse Gemini output as JSON:', rawText);
      return NextResponse.json({ error: 'Scoring result was malformed. Please try again.' }, { status: 502 });
    }

    return NextResponse.json({ ...parsed, visual_checklist: VISUAL_CHECKLIST });
  } catch (err) {
    console.error('Unexpected error in /api/score:', err);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
