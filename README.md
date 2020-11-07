# Intergage Launch Pad Framework

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

### ToDo
- [x] Prefix SCSS after Bundle
- [x] Create Watch Script for SCSS and JS
- [x] Move all Current JS to Bundle File
- [x] Tidy up Rollup's Config
- [x] Be able to bundle multiple SCSS files

- [ ] Don't load the whole of Bootstrap JS in the bundle file
- [ ] Have config options for SCSS so CSS file isn't massive
