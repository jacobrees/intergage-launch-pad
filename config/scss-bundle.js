const fs = require('fs');
const path = require('path');
const { Bundler } = require('scss-bundle');

const NODE_MODULES_PATH = '../node_modules';

const IMPORT_PATTERN    = /@import\s+['"](.+)['"];/g;

const INPUT_FILE_PATH   = '../scss/bootstrap.scss';
const INPUT_FILE_IGNORE = ['functions', 'variables'];

const OUTPUT_FILE_PATH  = '../build/scss';
const OUTPUT_FILE_NAME  = 'bundled.scss';

(async () => {
  const projectDirectory = path.resolve(__dirname, NODE_MODULES_PATH);
  const bundler = new Bundler(undefined, projectDirectory);

  // Bundle all the SCSS files
  const result = await bundler.bundle(INPUT_FILE_PATH, [], [], INPUT_FILE_IGNORE);
  if(!result.found) {
    console.log('No File Found');
    return;
  };

  // Remove the left over @import lines, CMS doesn't understand @import files
  const fileToWrite = result.bundledContent.replace(IMPORT_PATTERN, "");
 
  const fileToWritePath = path.resolve(__dirname, OUTPUT_FILE_PATH);
  // If this file path doesn't already exist, create it!
  !fs.existsSync(fileToWritePath) && fs.mkdirSync(fileToWritePath);
  
  // Write new Bundled File
  fs.writeFile(path.join(fileToWritePath, OUTPUT_FILE_NAME), fileToWrite, 'utf8', (err) => {
    if(err) throw err;

    console.log('Bundled File Created');
  });
})();