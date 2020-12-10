import { ScrollSpy } from 'bootstrap';
import PropObject from '../../PropObject';

import findHeaderHeight from '../actions/findHeaderHeight';

export default class ProductScrollSpy extends PropObject {
  constructor(props) {
    super(props);
    if(!this.props.scrollSpyContainerDom) return;

    this.spyMenu = this.props.scrollSpyContainerDom.querySelector('.c2-product-detail__scroll-spy__menu');
    this.spyContent = this.props.scrollSpyContainerDom.querySelector('.c2-product-detail__scroll-spy__content');
    this.spyContentTabs = [].slice.call(this.spyContent.querySelectorAll('.c2-product-detail__scroll-spy__content__tab'));
  }

  buildMenuItems() {
    this.spyContentTabs.forEach(tab => {
      // Build each menu item
      let menuItem = document.createElement('a');
      this.spyMenu.appendChild();
    });
  }

  build() {
    if(!this.spyMenu
      || !this.spyContent
      || !this.spyContentTabs
      || !this.spyContentTabs.length 
      || this.spyContentTabs.length === 1) {
      // Don't build the menu is there is only one tab
      return;
    }

    this.spyContentTabs.forEach((tab, index) => {
      // Build each menu item
      let menuItem = document.createElement('a');
      menuItem.className = 'list-group-item list-group-item-action';

      // Add ids to the tab and Menu Item
      let itemId = `product-tab-${this.props.productId}-${index}`;
      tab.id = itemId;
      menuItem.href = '#' + itemId;

      // Find First Element in the tab and assume that's the heading
      let assumedHeading = tab.children[0];
      if(!assumedHeading) return;

      // Make the menu item match the heading
      menuItem.innerHTML = assumedHeading.innerHTML;

      menuItem.addEventListener('click', e => this.handleClick(e));

      this.spyMenu.appendChild(menuItem);
    });

    document.body.classList.add('position-relative');
    new ScrollSpy(document.body, {
      target: this.spyMenu,
      offset: findHeaderHeight() + 50 - window.scrollY
    })

    window.addEventListener('resize', () => {
      ScrollSpy.getInstance(document.body).refresh()
    })
  }

  handleClick(e) {
    e.preventDefault();
    let id = e.target.hash;
    document.querySelector(id).scrollIntoView();
    scrollBy(0, -findHeaderHeight());
  }
}