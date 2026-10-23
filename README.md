# HKU, A Life — GitHub Pages upload

The complete annual-mode game, updated 24 October 2026. One 10-point plan per year, optional deeper exploration, automated routine events and a six-year maximum. This version preserves the admission-letter reveal and pre-Year 1 hall/Ocamp choices, shows only the expected study years, and allows up to three automatic interviews when study and work experience are prioritised together. Offers are not guaranteed.

This update adds automatic semester-exchange departures (one per life, before the projected final year), 1-point repeatable winter/summer schools, a broader employer pool, penultimate-summer return offers with a 25–35% game chance, comparison of up to two graduate jobs, accurate placement date ranges, hall activities and a Random career focus that develops from Year 3. Exchange application outcomes appear in the yearly recap; a successful booking reserves 3 points in the following year.

No build, terminal, backend, account or API key is required to play.

## Files to upload

Keep these 11 files together at the top level of your repository:

| File | Purpose |
| --- | --- |
| index.html | Website entry page |
| styles.css | Main visual design |
| annual.css | Annual-mode layout |
| app.js | Screens, controls, browser saves and CV |
| annual.js | Annual planning and automation |
| year-view.js | Annual planner, timeline and recap |
| engine.js | Simulation, hiring and graduation rules |
| business.js | Programmes, societies, destinations and employers |
| campus.js | Memberships, competitions and connections |
| data.js | Activities and story events |
| README.md | This upload guide |

## Publish by dragging files

1. Unzip **hku-a-life-github.zip** on your computer.
2. Open your existing game repository on GitHub, or create one named **hku-a-life**. GitHub Free requires a public repository for Pages; the game and its source will be public.
3. Choose **Add file → Upload files**. On an empty repository, use **uploading an existing file**.
4. Open the extracted folder and drag all **11 files inside it** onto GitHub. Do not upload the ZIP or place the enclosing folder inside the repository. **index.html must be at the repository’s top level.**
5. Choose **Commit changes** and commit to **main**. For an update, keep the same filenames so GitHub replaces the old files. Upload the new annual.js, year-view.js and annual.css too.
6. Open **Settings → Pages**. Choose **Deploy from a branch**, then **main** and **/ (root)**, and save.
7. Wait for deployment, then use **Visit site** or the URL shown in Pages settings. If Pages already uses main / (root), committing the files triggers the update automatically.

## If something looks wrong

- A 404 or README appears: confirm index.html is at the top level and Pages uses main / (root).
- A blank page or missing styling: confirm all 11 files were uploaded, including the three annual-mode files, with their filenames unchanged.
- Old screens remain: wait for the Pages deployment in Actions to finish, then refresh the page.
- Double-clicking index.html locally is not a reliable preview because the game uses JavaScript modules. Open the deployed Pages URL.

## Saves and privacy

Each player’s save stays in their own browser. Existing saves on the same GitHub Pages address continue. Saves on the ChatGPT-hosted site do not automatically transfer to a different address. Starting a fresh life shows the admission and orientation sequence again. The ZIP contains no player saves, hosting credentials or account information.

This is an independent, unofficial HKU-inspired game. All students, openings, outcomes and simulation probabilities are fictional. The degree keepsake is not an HKU credential. Sources and assumptions are available in the game.

## Official GitHub help

- [Upload files](https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository)
- [Configure Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
