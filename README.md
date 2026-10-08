# FarmVoice AI — Regional Language AI Assistance for Farmers

Initial frontend UI shell (white-first, agriculture-focused).

## Scope (this milestone)
- Attractive Login + Registration pages
- Reusable MainLayout: Header, Sidebar, Footer, empty content container
- Language switcher UI (11 languages)
- Responsive: desktop sidebar, tablet collapse, mobile drawer
- No Dashboard content yet (placeholder only)

## Run
```bash
npm install
npm run dev
```

Routes:
- `/login`
- `/register`
- `/app/:page` (dashboard, farms, crops, weather, assistant, schemes, history, recommendations, notifications, profile, settings — all show the reusable empty placeholder)
