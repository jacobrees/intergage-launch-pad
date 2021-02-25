import PropObject from '../../PropObject';

export default class BasketSideBar extends PropObject {
  constructor(props) {
    super(props);
    
    this.megaMenuContainer = document.querySelector('#c2-mega-menu-container');

    // Create 'mouseleave' listener for the MegaMenu Container
    this.megaMenuContainer.addEventListener('mouseleave', e => {
      this.closeMegaMenu()
    });

    // Listen to the Triggers
    let triggers = document.querySelectorAll('[data-c2-trigger="mega-menu"]');
    triggers.forEach(trigger => {
      // Find the Target for this Trigger
      let target = trigger.dataset.c2Target;
      if(!target) return;

      trigger.addEventListener('mouseenter', e => {
        this.openMegaMenu(target);
      });

      trigger.addEventListener('mouseleave', e => {
        // relatedTarget: The EventTarget the pointing device entered to
        if(e.relatedTarget.closest('#c2-mega-menu-container')) {
          // The user has moved their mouse inside the MegaMenu Container,
          // Let the 'mouseleave' listener on the MegaMenu Container close when ready
          return;
        }
        this.closeMegaMenu();
      });
    })
  }

  openMegaMenu(target) {
    let targetDom = document.querySelector(target);
    if(!targetDom) return;

    let targetHeight = targetDom.offsetHeight;

    this.megaMenuContainer.style.height = `${targetHeight}px`;
    this.megaMenuContainer.classList.add('active');
  }

  closeMegaMenu() {
    this.megaMenuContainer.style.height = '';
    this.megaMenuContainer.classList.remove('active');
  }
}