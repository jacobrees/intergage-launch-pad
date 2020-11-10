import PrettyMessenger from '../lib/pretty-messenger';

import polyfills from './polyfills';

// Actions
import configMenu from './actions/configMenu';
import scrollToError from './actions/scrollToError';
import VATToggler from './actions/vatToggler';
import searchBox from './actions/searchBox';

export default () => {
  polyfills.objectFit();

  // Find Error Messages
  new PrettyMessenger().findMessages();

  // Trigger Actions
  searchBox();
  configMenu();
  scrollToError();

  let vatToggler = new VATToggler(document.querySelector('.c2ecvatsw'));
};