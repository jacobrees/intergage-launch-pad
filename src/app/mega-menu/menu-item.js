import PropObject from '../../PropObject';

const DEFAULT_OPTIONS = {
  closingDelay: 300,
};

export default class MegaMenuItem extends PropObject {
  constructor(props) {
    super(props, DEFAULT_OPTIONS);

    this.validCloseMenuItem = 0;

    this.queuedTrigger = null;
    this.activeTrigger = null;

    let lev2Container = document.querySelector('#c2-mega-menu-shop-by-departemnt__lev2');
    if(lev2Container) {
      lev2Container.addEventListener('mouseenter', e => {
        this.requestToOpenMenuItem(this.activeTrigger);
      });
      lev2Container.addEventListener('mouseleave', e => {
        this.requestToCloseMenuItem(this.activeTrigger);
      });
    } 

    // Find all Menu Item Triggers and Listen to them
    let triggers = document.querySelectorAll('[data-c2-trigger="mega-menu-item"]');
    triggers.forEach(trigger => {
      // Find the Target for this Trigger
      let targetDom = document.querySelector(trigger.dataset.c2Target);
      if(!targetDom) return;

      let triggerInfo = {
        target: trigger.dataset.c2Target,
        targetDom: targetDom,
        trigger: trigger
      };

      trigger.addEventListener('mouseenter', e => {
        this.requestToOpenMenuItem(triggerInfo);
      });

      trigger.addEventListener('mouseleave', e => {
        this.requestToCloseMenuItem(triggerInfo);
      });
    });

  }

  requestToOpenMenuItem(triggerInfo) {
    if(!triggerInfo) return;

    if(this.activeTrigger && this.activeTrigger.target === triggerInfo.target) {
      // User has hovered over the same menu item as the active one
      // Remove the item in the queue and do nothing
      this.validCloseMenuItem = 0;
      this.queuedTrigger = null;
    } else if(this.activeTrigger && this.activeTrigger.target !== triggerInfo.target) {
      // User has hovered over a different menu item than the active one
      // Add this item to the queue and do nothing
      this.queuedTrigger = triggerInfo;
    } else {
      // There is no active Trigger and the user has hovered over a menu item
      // Open this menu item
      this.handleMenuTrigger(triggerInfo, true);
    }
  }

  requestToCloseMenuItem(triggerInfo) {
    if(!triggerInfo || triggerInfo.target !== this.activeTrigger.target) return;

    this.validCloseMenuItem += 1;

    let triggerInfoToClose = this.activeTrigger && triggerInfo.target !== this.activeTrigger.target 
      ? this.activeTrigger 
      : triggerInfo;

    setTimeout(e => this.handleMenuTrigger(triggerInfoToClose, false), this.options.closingDelay);
  }

  handleMenuTrigger(triggerInfo, open) {
    let validRequest = true;

    if(open) {
      this.openMenuItem(triggerInfo);
    }

    if(!open) {
      validRequest = this.closeMenuItem(triggerInfo);
    }

    if(validRequest) {
      this.props.updateMegaMenuContainerHeight();
    }

    if(validRequest && !open && this.queuedTrigger) {
      this.requestToOpenMenuItem(this.queuedTrigger);
    }
  }

  openMenuItem(triggerInfo) {
    triggerInfo.trigger.classList.add('active');
    triggerInfo.targetDom.classList.add('active');

    this.validCloseMenuItem = 0;
    this.queuedTrigger      = null;

    this.activeTrigger = triggerInfo;
  }

  closeMenuItem(triggerInfo) {
    if(this.validCloseMenuItem > 1) {
      this.validCloseMenuItem -= 1;
    } else if (this.validCloseMenuItem === 1) {
      triggerInfo.trigger.classList.remove('active');
      triggerInfo.targetDom.classList.remove('active');

      this.activeTrigger = null;

      return true;
    }
    return false;    
  }
}
