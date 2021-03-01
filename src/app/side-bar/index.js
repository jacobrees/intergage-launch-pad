import PropObject from '../../PropObject';
import SideBar from './side-bar';

export default () => {
  let sideBars = {};

  let sideBarContainers = document.querySelectorAll('.c2-side-bar');
  sideBarContainers.forEach(sideBarContainer => {
    let sideBarInstance = new SideBar({
      sideBarContainer: sideBarContainer
    });

    if(sideBarInstance.id) {
      sideBars[sideBarInstance.id] = sideBarInstance;
    }
  });

  // Listen to the Triggers
  let triggers = document.querySelectorAll('[data-c2-trigger="side-bar"]');
  triggers.forEach(trigger => {
    // Find the Target and it's Side Bar Instance for this Trigger
    let target = trigger.dataset.c2Target,
        targetSideBarInstance = sideBars[target];

    if(!target || !targetSideBarInstance) return;

    trigger.addEventListener('click', e => {
      targetSideBarInstance.handleClick();
    });
  })

  return;
}
