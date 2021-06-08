# WGM Launch Pad Framework

## Usage
Be sure to have [Node.js](https://nodejs.org/) installed before proceeding.
```
# Clone the repo
git clone https://github.com/owenjs/intergage-launch-pad.git
cd intergage-launch-pad

# Install dependencies
npm i

# Bundle JS
npm run build-js
npm run watch-js

# Bundle SCSS
npm run build-scss
npm run watch-scss

# Serve JS and Bundle SCSS
npm start
```

## Text Resources
Mapping for the Text Resources within the admin to the start files within the repo.

### JavaScript
- IE Polyfill for objectFit
  - src/object-fit-polyfill.rollup.js
- Product Gallery
  - src/productGallery.rollup.js
- Product Scripts
  - src/productPage.rollup.js
- App
  - src/main.rollup.js

### SCSS
- WGM Theme
  - scss/wgm-main.scss
- MWU Theme
  - scss/mwu-main.scss
- FAA Theme
  - scss/faa-main.scss
- Product Styles
  - scss/product.scss
- Bootstrap IE Styles
  - scss/ie.scss