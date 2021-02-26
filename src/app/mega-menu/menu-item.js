import PropObject from '../../PropObject';

export default class MegaMenuItem extends PropObject {
  constructor(props) {
    super(props);

    this.activeTrigger = null;
    this.activeTarget  = null;

    let lev2Container = document.querySelector('#c2-mega-menu-shop-by-departemnt__lev2');
    if(lev2Container) lev2Container.addEventListener('mouseleave', e => {
      this.handleMenuTrigger(this.activeTrigger, this.activeTarget, false);
    });

    // Find all Menu Item Triggers and Listen to them
    let triggers = document.querySelectorAll('[data-c2-trigger="mega-menu-item"]');
    triggers.forEach(trigger => {
      // Find the Target for this Trigger
      let target = trigger.dataset.c2Target;
      if(!target) return;

      trigger.addEventListener('mouseenter', e => {
        this.handleMenuTrigger(trigger, target, true);
      });

      trigger.addEventListener('mouseleave', e => {
        // relatedTarget: The EventTarget the pointing device entered to
        if(e.relatedTarget.closest('.c2-mega-menu-shop-by-departemnt__lev2')) { // TBD: IE Support
          // The user has moved their mouse inside the Level 2 Container,
          // Let the 'mouseleave' listener on the Level 2 Container close when ready
          return;
        }
        this.handleMenuTrigger(trigger, target, false);
      });
    });

  }

  handleMenuTrigger(trigger, target, open) {
    let targetDom = document.querySelector(target);
    if(!targetDom) return;

    if(open) {
      trigger.classList.add('active');
      targetDom.classList.add('active');
      this.activeTrigger = trigger;
      this.activeTarget = target;
    }

    if(!open) {
      trigger.classList.remove('active');
      targetDom.classList.remove('active');
      this.activeTrigger = null;
      this.activeTarget = null;
    }

    this.props.updateMegaMenuContainerHeight();
  }
}
