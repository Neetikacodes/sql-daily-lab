# SQL Daily Lab (Hinglish)
Business problems se SQL seekhne ki static website. HTML, CSS, vanilla JS. No backend, no login.

## Structure
`index.html` · `style.css` · `script.js` (UI, progress) · `data.js` (lessons, case, interview questions, sample data)

## Local test
`python3 -m http.server` chalao aur http://localhost:8000 kholo.

## GitHub Pages
1. New repository (Public), naam: `sql-daily-lab`.
2. **uploading an existing file** se paanchon files daalo, **Commit changes**.
3. **Settings → Pages → Deploy from a branch → main → / (root) → Save**.
4. ~1-2 minute baad: `https://USERNAME.github.io/sql-daily-lab/`.
Saare paths relative hain.

## Content kaise badlein
`data.js` mein `L` (lessons), `IVQ` (interview), `GL` (glossary). Case ke outputs sample data se compute hote hain, isliye data badalne par outputs khud update hote hain.

## Testing checklist (browser mein haath se karo)
- Har menu link khulta hai; mobile par menu wrap hota hai
- Lesson: Copy Query, quiz Check, Bookmark, Confidence, Mark complete
- Case: saare 10 steps khulte hain, Hint aur Show Solution kaam karte hain
- Interview: Show Answer, Sahi/Practice, Agla/Pichhla
- Progress page numbers refresh ke baad bhi wahi rehte hain; Reset kaam karta hai
- Glossary search; GitHub Pages subpath URL par site khulti hai

## Verification
Lesson aur case ke SQL outputs SQLite par run karke expected outputs se match kiye gaye (13 queries). PostgreSQL par run nahi kiye gaye, aur site browser mein haath se test nahi hui.

## Limitations
Abhi 8 lessons, 1 poora case, 8 interview questions. 5 portfolio projects aur in-browser SQL engine built nahi hain.
