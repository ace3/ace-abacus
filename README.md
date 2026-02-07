# Abacus Worksheet Generator (React)

Print-first abacus worksheet generator built with React + Vite. No login, no backend.

## Features

- Local-first generator focused on printable worksheets
- Addition, subtraction, or mixed vertical multi-row practice
- Configurable questions, rows, max digits, negatives policy
- Optional separate answer key page
- Deterministic generation via seed
- Print presets for US Letter (default) and A4
- Netlify-ready static build

## Project Structure

- `src/domain/worksheet`: pure worksheet generation and validation logic
- `src/features/worksheet/components`: UI blocks for settings/preview/warnings
- `src/features/worksheet/hooks`: feature state and orchestration hooks
- `src/shared`: reusable format/print helpers

This structure is meant for easy future feature additions without touching core domain logic.

## Local Development

```bash
npm install
npm run dev
```

Open the dev URL shown by Vite.

## Tests

```bash
npm test
```

## Production Build

```bash
npm run build
npm run preview
```

## Netlify Deployment

This repo includes `netlify.toml` with:
- Build command: `npm run build`
- Publish directory: `dist`

In Netlify, connect the repo and deploy with defaults from `netlify.toml`.
