import PrettyMessenger from '../lib/pretty-messenger';

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

  configMenu();
  scrollToError();
  hideBeforeInteraction();
  setHeightVariable();
  searchBoxToggle();
  fixSearchResults();
};
