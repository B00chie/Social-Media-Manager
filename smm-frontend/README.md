# Social Media Manager

A dashboard for programmers to keep their social and developer presence in one place: connected accounts (Instagram, GitHub, Spotify, Steam), a unified feed, notifications and a profile page. Built as my bachelor thesis project.

**Live demo:** _add your Vercel link here_ (click **"Pogledaj demo"** on the login screen, no account or server needed)

<!-- Add screenshots here once captured, for example:
![Dashboard (dark)](docs/screenshots/dashboard-dark.png)
![Dashboard (light)](docs/screenshots/dashboard-light.png)
-->

## What's in it

- **Pages:** Login, Register, Dashboard, Feed, Connected accounts, Notifications, Profile, Settings
- **Dark and light theme**, switched globally through React Context and applied to every page
- **Protected routes:** pages behind login redirect to `/login` when there is no token
- **Auth:** JWT issued by the Spring Boot backend (`smm-backend`), stored client-side and decoded to show the signed-in username
- **Demo mode:** the login screen has a "Pogledaj demo" button that runs the full UI without the backend, using a local placeholder token. This is what the live demo uses

## Stack

| Part | Tech |
| --- | --- |
| Frontend | React 19, Vite, React Router 7, react-icons |
| Backend | Spring Boot (REST API, JWT auth), in `smm-backend/` |

## Design notes

- Palette: `#0F0F1A` background, `#1A1A2E` cards, `#6C63FF` accent, with Inter for body text
- Dark is the default. The light theme is a full second palette, not an inverted one, so cards, inputs and text each have their own light values
- The UI language is Serbian, as the project was written for a Serbian-speaking thesis committee

## Known limitations

- Dashboard figures (account counts, recent activity) are static sample data in the demo
- Styling currently uses inline style objects with the palette repeated per page. Next step: move to shared design tokens
- Only the Login and Profile pages call the backend directly; the rest of the UI runs on local data

## Run locally

```bash
# Frontend
cd smm-frontend
npm install
npm run dev        # http://localhost:5173

# Backend (needed for real login; the demo button works without it)
cd smm-backend
./mvnw spring-boot:run   # http://localhost:8080
```

## Deploy the frontend (static host)

`smm-frontend/vercel.json` rewrites all routes to `index.html`, so deep links such as `/dashboard` work on refresh. On Vercel, set the root directory to `smm-frontend`; the framework is detected as Vite.
