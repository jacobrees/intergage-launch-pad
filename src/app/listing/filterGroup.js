import PropObject from '../../PropObject';

export default class FilterGroup extends PropObject {
  constructor(props) {
    super(props);
    this.filters = [];
    if(!this.props.filterDom) return;

    let fitlerRows = Array.prototype.slice.call(this.props.filterDom.querySelectorAll('.c2form_row'));
    fitlerRows.forEach(row => {
      this.filters.push({
        id: row.querySelector('label').htmlFor,
        label: row.querySelector('label'),
        inputContainer: row.querySelector('.c2form_input'),
        open: this.isOpen(row.querySelector('label').htmlFor)
      });
    })
  }

  build() {
    if(!this.props.filterDom) return;

    this.filters.forEach(filter => {
      // Remove the ':' on the label
      filter.label.innerHTML = filter.label.innerHTML.replace(':', '');

      // Remove '()' around the number of items per filter
      let badges = filter.inputContainer.querySelectorAll('.ldifoc');
      badges.forEach(badge => {
        badge.innerHTML = badge.innerHTML.replace('(', '');
        badge.innerHTML = badge.innerHTML.replace(')', '');
        badge.classList.add('badge', 'bg-secondary');
      })

      filter.label.addEventListener('click', e => this.openFilter(filter));
      if(filter.open) {
        this.openFilter(filter, true); // No animation on initial load
      }
    });
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
}
