# VPI Innovative Solutions - Emergent Industrial Rebuild

React 19 + CRACO + React Router website for VPI Innovative Solutions. The visual language follows the dark industrial Emergent build while the main VPI copy, contact details, product references and management content are sourced from the VPI website.

## Run locally

```bash
yarn install
yarn start
```

## Production build

```bash
yarn build
```

## Deploy on Vercel

1. Push the contents of this folder to the root of the existing GitHub repository.
2. Keep the repository's `.git` directory untouched when replacing local files with GitHub Desktop.
3. Vercel will build automatically from the connected `main` branch.

## Notable implementation details

- The homepage hero uses VPI-specific CNC/product imagery only, with no people, and moves/crossfades in response to scroll.
- The VG-20 CNC Collet Chuck section uses the supplied product image as a scroll-driven rotation/inspection interaction.
- `/management`, `/management-2`, and `/management-2/` route to a dedicated Management page styled to match the industrial system.
- The footer includes the VPI logo, VPI vision, address, contact details, sitemap, Make in India graphic and an embedded location map.

## Product interaction
The VG-20 product section uses the supplied VPI photographs (`public/vpi/vg20-angle-1.jpg` and `public/vpi/vg20-angle-2.jpg`) and a scroll-driven inspection/rotation transition. No exploded-view artwork is used.

## Content and imagery
The site's VPI copy, contact details, product information, industry information, and page structure are based on the current VPI Innovative Solutions website. The Emergent project supplies the visual presentation, interaction style, and animations.
