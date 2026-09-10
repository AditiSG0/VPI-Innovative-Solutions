# VPI Industrial Website

React 19 + CRACO + React Router website for VPI Innovative Solutions.

## Run locally

```bash
yarn install
yarn start
```

## Production build

```bash
yarn build
```

## Deploy

Upload the contents of this folder to the root of your GitHub repository. The app uses Create React App/CRACO and can be deployed on Vercel, Netlify, or GitHub Pages with the appropriate SPA fallback configuration.

## Main source files

- `src/App.js` routes the site
- `src/pages/SitePages.jsx` contains page content/layout
- `src/App.css` contains the industrial visual system and animations
- `src/components/` contains navigation, transitions, scenes and reusable sections
- `public/` contains local site assets
