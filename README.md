# VPI Innovative Solutions - GitHub Ready

## Run locally

```bash
yarn install
yarn start
```

Open `http://localhost:3000`.

## Vercel

- Install command: `yarn install`
- Build command: `yarn build`
- Output directory: `build`

## Recent UI fixes

- Company dropdown routes for About, Management, CSR, Company Vision, Company History, Why Us and R&D are active.
- Industries now display the five supplied industry images: Automobile, Electronics, Robotics, Medical and Aerospace.
- Removed Die & Mould, Energy, Food, Advanced Critical R&D and Telecom from the navigation and active routes.
- Company Vision content is kept inside the Company section rather than repeated site-wide.
- Location/address/map are shown only on Contact Us.
- Services, Career and Contact hero images use the three supplied images.
- Text contrast has been redesigned around VPI gold `#D4A843`, navy `#1B2A4A`, white and light gray.
- Smooth scrolling, cursor coordinates and scroll interactions remain enabled.


## Latest VPI UI/UX update
- Company overview is now a fully populated page at `/company`, with links to About Us, Management, CSR, Company Vision, Company History, Why Us and R&D.
- Industries is limited to Automobile, Electronics, Robotics, Medical and Aerospace and uses the supplied industry images.
- Contact location is set to: 13 P A, KIADB 1ST MAIN ROAD, INDUSTRIAL AREA, Koorgally, Mysuru, Karnataka 571130, India, including the embedded Google Maps query.
- Career hero now reads “Build the next cut” with “Join Our Team” as the supporting line.
- Products hero now reads “VPI’s Premium line.”
- Final theme: #4050e3, #121212, #e9eaf0, with white highlights and high-contrast text.


## Private VPI Inventory Dashboard

A separate management-only React dashboard is available at `/inventory`. It supports daily raw-material movement entry, batch-linked production entries, month filtering, dashboard charts, CSV export, and Excel/CSV import.

Before deployment, follow [docs/INVENTORY_SETUP.md](docs/INVENTORY_SETUP.md):
- Create the Supabase project and run `supabase/schema.sql`.
- Invite management users and add their Auth UUIDs to `vpi_management_users`.
- Set `REACT_APP_SUPABASE_URL`, `REACT_APP_SUPABASE_ANON_KEY`, and `REACT_APP_MANAGEMENT_EMAILS` in Vercel.
- Redeploy the app.

The dashboard uses Supabase Auth and row-level security. Never put a service-role key in frontend environment variables. Historical opening balances must be imported and reconciled before the calculated stock is treated as an official balance.
