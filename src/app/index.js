import { Modal } from 'bootstrap';

import PrettyMessenger from '../lib/pretty-messenger';
import StickyHeader from '../lib/sticky-header';

import polyfills from './polyfills';

// Actions
import configMenu from './actions/configMenu';
import scrollToError from './actions/scrollToError';
import hideBeforeInteraction from './actions/hideBeforeInteraction';
import searchBoxToggle from './actions/searchBoxToggle';
import { setHeightVariable } from './actions/findHeaderHeight';
import fixSearchResults from './actions/fixSearchResults';

export default () => {
  polyfills.objectFit();

  // Find Error Messages
  new PrettyMessenger().findMessages();

  // Give the header the correct Class Names on scroll
  new StickyHeader(document.querySelector('.c2-header')).init();
  
  // Display the Modal on Load (If there)
  if(document.getElementById('homeModal')) {
    new Modal(document.getElementById('homeModal')).show();
  }

  configMenu();
  scrollToError();
  hideBeforeInteraction();
  searchBoxToggle();
  fixSearchResults();


  setHeightVariable();
};
