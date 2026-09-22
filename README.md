# Bible Journal

A responsive Bible reading, study and journaling app for web, Android and iOS/PWA use.

## Included
- World English Bible (WEB), 66-book Protestant Bible, stored as structured book/chapter/verse JSON.
- Supplied 365-day reading plan with all 365 days, titles, core readings, supporting readings and study methods.
- Daily Scripture reading with journal prompts and explicit completion tracking.
- Full Bible library with book/chapter navigation, verse saving, highlights and chapter journaling.
- Topic study, global Scripture search, prayer journal and local progress persistence.
- Responsive mobile/tablet/desktop design using the Modern Sacred Editorial palette.
- GitHub Pages deployment workflow and offline-first service worker.

## Run locally

```bash
npm install
npm run dev
``

Build:

```bash
npm run build
```

## Source note
The World English Bible used by this project is the public-domain 2020 stable text edition. The app keeps the Bible data inside the repository rather than depending on a third-party Bible API.

## GitHub Pages
The Vite base path is configured for this repository: `/Bible-journal/`. The workflow in `.github/workflows/deploy.yml` builds and deploys the app to GitHub Pages when enabled for the repository.
