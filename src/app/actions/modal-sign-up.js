import { Modal } from 'bootstrap';

export default () => {
  if(document.getElementById('signUpForm') && !localStorage.getItem('popup')) {
    new Modal(document.getElementById('signUpForm')).show();
    localStorage.setItem('popup', 'true');
  }
};