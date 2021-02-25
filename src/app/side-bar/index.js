import PropObject from '../../PropObject';

export default class BasketSideBar extends PropObject {
  constructor(props) {
    super(props);
    
    this.sideBarContainer = document.querySelector('.c2-side-bar');

    if(this.sideBarContainer) {
      this.sideBarContainer.addEventListener('click', e => {
        this.close(e);
      })
    }
  }

  listen() {
    if(!this.sideBarContainer) {
      return;
    }

    let triggers = document.querySelectorAll('[data-c2-trigger="side-bar"]');
    triggers.forEach(trigger => {
      trigger.addEventListener('click', e => {
        this.handleClick();
      });
    })
  }

  handleClick() {
    this.sideBarContainer.classList.toggle('open');
  }

  close(e) {
    if(e.target.classList.contains('c2-side-bar')) {
      this.sideBarContainer.classList.remove('open');
    }
  }
}