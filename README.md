# Bible Journal

A premium Bible reading, study and journaling application.

## Product direction

- World English Bible (WEB)
- 66-book Protestant Bible
- 365-day Bible journey
- Daily Scripture + reflection
- Bible chapter journal
- Topics
- Search
- Bookmarks and highlights
- Prayer journal
- Progress tracking
- Offline-first/PWA architecture
- Responsive mobile/tablet/desktop UI

## Current scaffold

The repository currently contains the responsive application shell and core navigation. The next content-import stage will replace the demonstration Scripture data with the complete structured WEB Bible and the supplied 365-day reading plan.

## Development

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
```

## Content

The World English Bible is public domain. The production build should use the project's supplied WEB source rather than an external Bible API so the reader can operate offline.
