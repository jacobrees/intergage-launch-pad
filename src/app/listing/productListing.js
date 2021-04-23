import FilterGroup, { configNumOfItemsPerFilterLabel } from './filterGroup';
import PropObject from '../../PropObject';

export default class Listing extends PropObject {
  constructor(props) {
    super(props);
    if(!this.props.listingDom) return;

    this.filterGroup = new FilterGroup({
      filterDom: this.props.listingDom.querySelector('.c2-list-filters'),
      filterSideBar: this.props.listingDom.querySelector('#c2-filters-side-bar')
    });

    this.loadingPanel = this.props.listingDom.querySelector('.c2-list__loading');
  }

  build() {
    this.filterGroup.build();

    if(UI) {
      UI.registerAjaxCallback(() => {
        // Autosubmit has been fired, add loading spinner on the results list
        this.loadingPanel.classList.remove('d-none');
        return true; // Safe to Reload
      });
    }
  }
}