import supportsPassive from './supports-passive';

export default class StickyHeader {
  constructor(headerDom) {
    this.headerDom = headerDom;
    this.headerStates = {
      sticky: false,
      display: true,
      initial: false,
      oldScroll: 0,
    };
  }

  /**
   * checkForUpdate - Called to check if classes on the header needs to be updated,
   *                  usually called from a page scroll listener
   * 
   * @param {obj} e: The event object from the event listener
   */
  checkForUpdate(e) {
    var scroll = window.pageYOffset;

    // The Header has become sticky
    if (scroll > this.headerDom.clientHeight && !this.headerStates.sticky) {
      this.headerDom.classList.add("c2-header--sticky");
      this.headerStates.sticky = true;
    }

    // The Header is no Longer Sticky
    if (scroll + this.headerDom.clientHeight <= this.headerDom.clientHeight && this.headerStates.sticky) {
      this.headerDom.classList.remove("c2-header--sticky");
      this.headerStates.sticky = false;
    }

    // Store the Current Scroll
    this.headerStates.oldScroll = scroll;
  }

  init() {
    let initialScroll = window.pageYOffset;
    // If page load was below the header, make header sticky
    if (initialScroll > this.headerDom.clientHeight) {
      this.headerDom.classList.add("c2-header--sticky");
      this.headerStates.sticky = true;
    }

    // Listen to Page Scroll
    window.addEventListener('scroll', e => {
      this.checkForUpdate(e)
    }, supportsPassive ? { passive: true } : false)
  }
}