# BuyNow

A minimal SPA for e-commerce transactions built with React, Vite, and TypeScript. It uses `localStorage` for demo auth, catalog, and orders, and includes:

- Registration
- Login
- Dashboard (catalog with search)
- Item Detail
- Dummy Payment (creates order)
- Orders list

## Run (Windows PowerShell)

```powershell
Set-Location "c:\Users\z004twtz\Desktop\BuyNow"
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## Notes
- This is a demo; do not use real card info.
- Data persists in the browser via `localStorage`.
- To reset data, clear site storage in your browser.

## System Design
- Logical Architecture: see `docs/architecture.md` (layers, responsibilities, package diagram).
- ER Model: see `docs/data-model.md` (entities, constraints, relationships with Mermaid).
- Consolidated docs: see `docs/Documentation.md` for a single, crisp reference.

## Demo Guidance
- Record a short, self-explanatory video covering: Register → Login → Search in Dashboard → View Item → Purchase via Dummy Gateway → See Orders.
- Use `docs/demo-script.md` for a scene-by-scene narration and actions.
