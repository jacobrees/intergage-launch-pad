import PropObject from '../../PropObject';
import passiveIfSupported  from '../../lib/passiveSupported';

export const configNumOfItemsPerFilterLabel = badge => {
  badge.innerHTML = badge.innerHTML.replace('(', '');
  badge.innerHTML = badge.innerHTML.replace(')', '');
  badge.classList.add('badge', 'bg-secondary', 'float-right');
}

export default class FilterGroup extends PropObject {
  constructor(props) {
    super(props);
    this.filters = [];
    if(!this.props.filterDom) return;

    this.inSideBar = false;

    let fitlerRows = Array.prototype.slice.call(this.props.filterDom.querySelectorAll('.c2form_row'));
    fitlerRows.forEach(row => {
      this.filters.push({
        id: row.querySelector('label').htmlFor,
        label: row.querySelector('label'),
        inputContainer: row.querySelector('.c2form_input'),
        open: this.isOpen(row.querySelector('label').htmlFor)
      });
    })

    // Move the Filter Side bar to the end of the body tag
    if(this.props.filterSideBar) {
      document.body.appendChild(this.props.filterSideBar);
      this.filterUnstyledContainer = this.props.filterDom.querySelector('.ldic');
    }
  }

  build() {
    if(!this.props.filterDom) return;

    this.filters.forEach(filter => {
      // Remove the ':' on the label
      filter.label.innerHTML = filter.label.innerHTML.replace(':', '');

      // Remove '()' around the number of items per filter
      let badges = filter.inputContainer.querySelectorAll('.ldifoc');
      badges.forEach(badge => {
        configNumOfItemsPerFilterLabel(badge);
      })

      filter.label.addEventListener('click', e => this.openFilter(filter));
      if(filter.open) {
        this.openFilter(filter, true); // No animation on initial load
      }
    });

    if(!this.props.filterSideBar) return;

    // Check if the filtes need to move to the sidebar
    if(document.documentElement.clientWidth < 992) {
      this.moveFiltersToSideBar();
    }

    // Listen to Window Resize so the filters can move to the sidebar when needed
    window.addEventListener('resize', () => {
      let clientWidth = document.documentElement.clientWidth;

      if(clientWidth < 992 && !this.inSideBar) {
        this.moveFiltersToSideBar();
      }

      if(clientWidth >= 992 && this.inSideBar) {
        this.moveFiltersFromSideBar();
      }
    }, passiveIfSupported);
  }

  openFilter(filter, force) {
    filter.label.classList.toggle("active");

    // Toggle between hiding and showing the active panel
    let panel = filter.inputContainer;
    if(force) {
      panel.classList.add('force');
    } else {
      panel.classList.remove('force');
    }
    if (panel.style.maxHeight) {
      // Close the panel
      panel.style.maxHeight = null;
      localStorage.setItem(filter.id, '0');
    } else {
      // Open the panel
      panel.style.maxHeight = panel.scrollHeight + "px";
      localStorage.setItem(filter.id, '1');
    }
  }

  isOpen(id) {
    return localStorage.getItem(id) == '1' ? true : false;
  }

  moveFiltersToSideBar() {
    this.props.filterSideBar.querySelector('.c2-filters-side-bar__filters').appendChild(this.filterUnstyledContainer);
    this.inSideBar = true;
  }

  moveFiltersFromSideBar() {
    this.props.filterDom.children[0].appendChild(this.filterUnstyledContainer)
    this.inSideBar = false;
  }
}
