import FilterGroup from './filterGroup';
import PropObject from '../../PropObject';

export default class Listing extends PropObject {
  constructor(props) {
    super(props);
    if(!this.props.listingDom) return;

    let listingFilters = Array.prototype.slice.call(this.props.listingDom.querySelectorAll('.c2-list-filters'));
    this.filterGroups = []
    listingFilters.forEach(filter => {
      this.filterGroups.push(new FilterGroup({filterDom: filter}))
    });

    this.loadingPanel = this.props.listingDom.querySelector('.c2-list__loading');
  }

  build() {
    this.filterGroups.forEach(filterGroup => filterGroup.build());

    if(UI) {
      UI.registerAjaxCallback(() => {
        // Autosubmit has been fired, add loading spinner on the results list
        this.loadingPanel.classList.remove('d-none');
        return true; // Safe to Reload
      });
    }
  }
}