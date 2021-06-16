import 'bootstrap';
import './lib/remove-default-styles';

import app from './app';

if (document.readyState != 'loading'){
  app();
} else {
  document.addEventListener('DOMContentLoaded', app);
}
