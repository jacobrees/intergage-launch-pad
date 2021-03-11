const ChromeLauncher = require('chrome-launcher');
const PackageJSON = require('../package.json');
 
ChromeLauncher.launch({
  startingUrl: PackageJSON['chrome-launcher-start-url'],
  chromeFlags: ['--disable-web-security']
});