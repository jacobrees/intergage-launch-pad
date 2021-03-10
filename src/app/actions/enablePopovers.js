// Bootstrap Popovers are not enabled by default
// https://getbootstrap.com/docs/5.0/components/popovers/#example-enable-popovers-everywhere

import { Popover } from 'bootstrap';

export default () => {
  var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-toggle="popover"]'))
  popoverTriggerList.forEach(popoverTriggerEl => {
    new Popover(popoverTriggerEl)
  });
};