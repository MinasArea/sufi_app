# Maqām Mobile

A modular Expo/React Native implementation of the supplied Maqām mobile HTML design.

## Run

```powershell
cd mobile
npm install
npx expo start
```

## Architecture

- `src/app/navigation` — app-level navigation/state
- `src/shared/components` — reusable visual components
- `src/shared/theme` — colors/design tokens
- `src/features/home` — hero, fan cards, teaching/library highlights
- `src/features/teachings` — teachings
- `src/features/library` — library
- `src/features/gatherings` — gatherings/countdown
- `src/features/questions` — questions form/board

The data layer is deliberately separated from screens so a future REST API, Firebase, Supabase, SQL backend, or custom backend can replace local data without redesigning the UI.

## Design preserved

The implementation follows the supplied HTML's dark forest palette, gold accents, rounded surfaces, fan-card hero, ornamental lantern/star, sticky-style top identity bar, bottom navigation, entrance motion, shadows, typography hierarchy, countdown cards, question board, and responsive mobile framing.
