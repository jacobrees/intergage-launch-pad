import PropObject from '../../PropObject';

import MegaMenuItem from './menu-item';

const DEFAULT_OPTIONS = {
  closingDelay: 500,
};

class MegaMenuContainer extends PropObject {
  constructor(props) {
    super(props, DEFAULT_OPTIONS);

    this.activeTargetDom = null;
    this.validCloseMegaMenu = 0;
    
    this.megaMenuContainer = document.querySelector('#c2-mega-menu-container');

    if(!this.megaMenuContainer) return;

    // Create 'mouseenter' listener for the MegaMenu Container
    // This is triggered when the menu is already open and the user moves away 
    // and then quickly hovers back over during the closing animation, we 
    // don't want the menu to close if the user has hovered back over
    this.megaMenuContainer.addEventListener('mouseenter', e => {
      this.openMegaMenu();
    });

    // Create 'mouseleave' listener for the MegaMenu Container
    this.megaMenuContainer.addEventListener('mouseleave', e => {
      this.requestToCloseMegaMenu();
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
        this.requestToCloseMegaMenu();
      });
    })
  }

  updateHeight() {
    if(!this.activeTargetDom) return;

    let targetHeight = this.activeTargetDom.offsetHeight;

    this.megaMenuContainer.style.height = `${targetHeight}px`;
  }

  openMegaMenu(target) {
    let targetDom = document.querySelector(target) || this.activeTargetDom;
    if(!targetDom) return;

    this.validCloseMegaMenu = 0;

    this.activeTargetDom = targetDom;
    this.updateHeight();

    this.megaMenuContainer.classList.add('active');
  }

  requestToCloseMegaMenu() {
    this.validCloseMegaMenu += 1;
    setTimeout(e => this.closeMegaMenu(), this.options.closingDelay);
  }

  closeMegaMenu() {
    if(this.validCloseMegaMenu > 1) {
      this.validCloseMegaMenu -= 1;
    } else if (this.validCloseMegaMenu === 1) {
      this.activeTargetDom = null;
      this.megaMenuContainer.style.height = '';
      this.megaMenuContainer.classList.remove('active');
    }
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