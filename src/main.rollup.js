import $ from 'jquery';
import '../node_modules/bootstrap/dist/js/bootstrap.js';
import './lib/remove-default-styles';

import app from './app';

// jQuery .ready() function is safer to use here, as stated in documentation:
//    If the DOM becomes ready and the browser fires DOMContentLoaded before 
//    the code calls .ready( handler ), the function handler will still be executed. 
//    In contrast, a DOMContentLoaded event listener added after the event fires is NEVER executed.
// As this File is being defered when loaded, the DOMContentLoaded event may have already fired...
$(document).ready(function() {
  // Run the App
  app();
  
  // Are we on the Product Listings / Details?
  try {
    productGallery();
  } catch (error) {
    // Not on the Product Pages
    console.log(error);
  }
  try {
    productPage();
  } catch (error) {
    // Not on the Product Pages
    console.log(error);
  }
});