import PrettyMessenger from '../lib/pretty-messenger';

import polyfills from './polyfills';

// Actions
import configMenu from './actions/configMenu';
import scrollToError from './actions/scrollToError';
import hideBeforeInteraction from './actions/hideBeforeInteraction';
import { setHeightVariable } from './actions/findHeaderHeight';

import ProductDetail from './product-detail';
import BasketLayout from './basket-layout';

export default () => {
  polyfills.objectFit();

  // Find Error Messages
  new PrettyMessenger().findMessages();

  configMenu();
  scrollToError();
  setHeightVariable();

  // Find all Product Detail Layouts
  let productDetails = [].slice.call(document.querySelectorAll('.c2-product-detail'));
  productDetails.forEach((productDetail, index) => {
    new ProductDetail({
      id: index,
      productDetailDom: productDetail
    }).build();
  });

  // Find all Basket Layouts
  let basketLayouts = [].slice.call(document.querySelectorAll('.c2-basket-layout'));
  basketLayouts.forEach((basketLayout, index) => {
    new BasketLayout({
      id: index,
      basketLayoutDom: basketLayout
    }).build();
  });
  
  hideBeforeInteraction();
};