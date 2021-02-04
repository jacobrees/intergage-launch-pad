import { Modal } from 'bootstrap';

import PrettyMessenger from '../lib/pretty-messenger';

import polyfills from './polyfills';

// Actions
import configMenu from './actions/configMenu';
import scrollToError from './actions/scrollToError';
import hideBeforeInteraction from './actions/hideBeforeInteraction';

export default () => {
  polyfills.objectFit();

  // Find Error Messages
  new PrettyMessenger().findMessages();

  if(document.getElementById('signUpForm') && !localStorage.getItem('popup')) {
    new Modal(document.getElementById('signUpForm')).show();
    localStorage.setItem('popup', 'true');
  }

  configMenu();
  scrollToError();
  hideBeforeInteraction();
};