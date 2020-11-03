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
npm run js
npm run watch-js

# Bundle SCSS
npm run scss
npm run watch-scss
```

### ToDo
- [x] Prefix SCSS after Bundle
- [x] Create Watch Script for SCSS and JS
- [x] Move all Current JS to Bundle File
- [ ] Don't load the whole of Bootstrap JS in the bundle file
- [ ] Have config options for SCSS so CSS file isn't massive
- [ ] Have Site Folder for SCSS Variable File, plus other starting SCSS Files
- [ ] Be able to bundle multiple SCSS files
- [ ] Tidy up Rollup's Config