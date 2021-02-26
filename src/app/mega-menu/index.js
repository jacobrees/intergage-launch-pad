import PropObject from '../../PropObject';

import MegaMenuItem from './menu-item';

class MegaMenuContainer extends PropObject {
  constructor(props) {
    super(props);

    this.activeTargetDom = null;
    
    this.megaMenuContainer = document.querySelector('#c2-mega-menu-container');

    if(!this.megaMenuContainer) return;

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
        if(e.relatedTarget.closest('#c2-mega-menu-container')) { // TBD: IE Support
          // The user has moved their mouse inside the MegaMenu Container,
          // Let the 'mouseleave' listener on the MegaMenu Container close when ready
          return;
        }
        this.closeMegaMenu();
      });
    })
  }

  updateHeight() {
    if(!this.activeTargetDom) return;

    let targetHeight = this.activeTargetDom.offsetHeight;

    this.megaMenuContainer.style.height = `${targetHeight}px`;
  }

  openMegaMenu(target) {
    let targetDom = document.querySelector(target);
    if(!targetDom) return;

    this.activeTargetDom = targetDom;
    this.updateHeight();

    this.megaMenuContainer.classList.add('active');
  }

  closeMegaMenu() {
    this.activeTargetDom = null;
    this.megaMenuContainer.style.height = '';
    this.megaMenuContainer.classList.remove('active');
  }
}

export default () => {
  // Config the Container for the Menus
  let megaMenuContainer = new MegaMenuContainer();
  // Config each Menu Item for the Menus
  new MegaMenuItem({
    updateMegaMenuContainerHeight: () => megaMenuContainer.updateHeight()
  });
};