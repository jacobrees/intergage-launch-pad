import 'bootstrap';
import './lib/remove-default-styles';

import app from './app';

// Run the App
if (document.readyState != 'loading'){
  app();
} else {
  document.addEventListener('DOMContentLoaded', () => app());
}
