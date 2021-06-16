import PrettyMessenger from '../lib/pretty-messenger';

// Actions
import configMenu from './actions/configMenu';
import scrollToError from './actions/scrollToError';
import hideBeforeInteraction from './actions/hideBeforeInteraction';

// Search Bar
//import searchBox from './actions/searchBox';

// Ecom
//import ecomInit from './actions/ecomInit';

export default () => {
  // Find Error Messages
  new PrettyMessenger().findMessages();

  configMenu();

  // Search Bar
  //searchBox();
  
  scrollToError();
  hideBeforeInteraction();

  // Ecom
  // ecomInit();
  
};