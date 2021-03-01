import PrettyMessenger from '../lib/pretty-messenger';

import polyfills from './polyfills';

// Actions
import configMenu from './actions/configMenu';
import scrollToError from './actions/scrollToError';
import hideBeforeInteraction from './actions/hideBeforeInteraction';
import modalSignUpForm from './actions/modal-sign-up';
import bannerPadding from './actions/banner-padding';
import replaceDonateLink from './actions/replace-donate-link';

export default () => {
  polyfills.objectFit();

  // Find Error Messages
  new PrettyMessenger().findMessages();

  modalSignUpForm();

  configMenu();
  scrollToError();
  hideBeforeInteraction();
  bannerPadding();
  replaceDonateLink();
};