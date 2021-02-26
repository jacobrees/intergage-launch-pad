import PrettyMessenger from '../lib/pretty-messenger';

import polyfills from './polyfills';

// Actions
import configMenu from './actions/configMenu';
import scrollToError from './actions/scrollToError';
import VATToggler from './actions/vatToggler';
import searchBox from './actions/searchBox';
import shopByDepartmentConfig from './actions/shop-by-department-menu';

import BasketLayout from './basket-layout';
import SideBar from './side-bar';
import megaMenu from './mega-menu';

export default () => {
  polyfills.objectFit();

  // Find Error Messages
  new PrettyMessenger().findMessages();

  // Trigger Actions
  searchBox();
  configMenu();
  scrollToError();

  new SideBar().listen();

  // Config the Menu Menu and it's menus inside
  shopByDepartmentConfig();
  megaMenu();

  let vatToggler = new VATToggler(document.querySelector('.c2ecvatsw'));

  // Find all Basket Layouts
  let basketLayouts = [].slice.call(document.querySelectorAll('.c2-basket-layout'));
  basketLayouts.forEach((basketLayout, index) => {
    new BasketLayout({
      id: index,
      basketLayoutDom: basketLayout
    }).build();
  });
};