# Pokéwiki

A responsive field guide to the original 151 Pokémon, built with Angular and TypeScript.

[Live site](https://higueradev.github.io/pokemon-wiki/) · [Source](https://github.com/higueraDev/pokemon-wiki)

## Experience

- Complete Kanto catalog with locally bundled official artwork, descriptions, abilities, measurements, and base stats.
- Search by name or Pokédex number, combine type filters, and sort alphabetically or numerically.
- Favorites stored on the current device, with graceful recovery when storage is unavailable.
- Shareable search/type query parameters, progressive rendering, and lazy-loaded images.
- Native detail dialog with keyboard dismissal, focus restoration, accessible labels, and reduced-motion support.
- Responsive layouts for phones, tablets, and desktop.

## Development

```sh
npm ci
npm start
```

Open http://localhost:4200. The app requires no Firebase account, API key, or runtime data service. Google Fonts are optional; system fonts provide a fallback.

```sh
npm run test:ci
npm run build:pages
```

Tests use headless Chromium. Set `CHROME_BIN` to a Chromium browser executable if Chrome is not installed. Production output is in `dist/pokemon-wiki`; the Pages build sets `/pokemon-wiki/` as its base path.

## Data

`npm run sync:data` fetches the first 151 entries and official artwork from PokéAPI. Review the generated data and assets before committing. The checked-in snapshot allows catalog browsing without a live API request. Types reflect PokéAPI's current classifications, including Fairy and Steel, rather than the original games' historical classifications.

Favorites stay in this browser's local storage and are not synchronized across devices. Search and type filters are encoded in the URL; favorites are not.

## Deployment

The GitHub Actions workflow runs tests and a production build for pull requests. Pushes to `main` deploy the built artifact through GitHub Pages. In repository Settings → Pages, select **GitHub Actions** as the source before the first workflow deployment.

This redesign replaces the original Firebase CRUD demo with a curated read-only catalog and private local favorites. It does not modify or delete the original remote Firestore records.

## Attribution

Data and artwork: [PokéAPI](https://pokeapi.co/) and its [sprites repository](https://github.com/PokeAPI/sprites). Pokémon and character artwork belong to Nintendo, Creatures, and GAME FREAK. This is an unofficial fan and portfolio project with no affiliation or endorsement. The repository's code license does not grant rights to Pokémon artwork.

## Maintenance

The project retains its existing Angular 15 foundation. A framework/toolchain upgrade remains separate maintenance work; the visual and functional refresh is not a dependency security certification.
