# VPI Innovative Solutions

This is the GitHub-ready React/CRACO source for the VPI Innovative Solutions website.

## Run locally

Requirements:
- Node.js 20 LTS recommended
- Yarn 1.x (the repository includes yarn.lock)

```bash
yarn install
yarn start
```

Then open http://localhost:3000

## Production build

```bash
yarn build
```

## GitHub + Vercel

Upload the **contents of this folder** to the root of your GitHub repository (not the ZIP as a single file).

Connect the GitHub repository to Vercel. Vercel should detect Create React App/CRACO and use:

- Install command: `yarn install`
- Build command: `yarn build`
- Output directory: `build`

The included `vercel.json` provides SPA routing for React Router pages.
