# Abacus Worksheet Generator (React)

Multi-page abacus learning site built with React + Vite. No login, no backend.

## Features

- Homepage with product overview and quick mode navigation
- Full SIP-aligned curriculum page for stages `Junior` to `Grand Master`
- Local-first worksheet generator focused on printable worksheets
- Addition, subtraction, or mixed vertical multi-row practice
- Configurable questions, rows, max digits, negatives policy
- Optional separate answer key page
- Deterministic generation via seed
- Print presets for US Letter (default) and A4
- Anki-style practice mode with phone/tablet numpad
- Time Attack mode with configurable countdown durations
- Optional practice BGM with default-off toggle and hurry-up countdown cue
- Local progress motivation card: streaks, badges, and session save tracking
- Bilingual UI: Bahasa Indonesia (default) + English alternative
- Kids-friendly theme selector (`Neutral`, `Bright A`, `Bright B`)
- Curriculum lesson links can prefill Generator/Anki/Time Attack via URL query
- Netlify-ready static build

## Routes

- `/` Home page
- `/curriculum` Curriculum learning page
- `/generator` Worksheet generator
- `/anki` Anki-style practice
- `/time-attack` Countdown practice

## Project Structure

- `src/domain/worksheet`: pure worksheet generation and validation logic
- `src/domain/curriculum`: curriculum stages/levels/lesson presets
- `src/features/worksheet/components`: UI blocks for settings/preview/warnings
- `src/features/worksheet/hooks`: worksheet state and orchestration hooks
- `src/features/practice`: practice settings, question/session logic, and numpad components
- `src/features/theme`: theme preference hook and switcher component
- `src/features/language`: language switcher component
- `src/shared/presets`: curriculum preset query parsing/building helpers
- `src/i18n`: localization resources and i18n initialization
- `src/app`: route and shell composition
- `src/pages`: route-level page components

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
