import ProductOptions from '../product-options';

const DEFAULT_OPTIONS = {
  pdOptionContainerClasses: ['row', 'gy-2'],
  pdOptionRowContainerClasses: ['bg-dark', 'p-2', 'd-block', 'cursor-pointer'],
  pdOptionRowClasses: ['row', 'gx-3', 'row-cols-auto', 'align-items-center'],
  pdOptionRowNameColumnClasses: ['col-7'],
  pdOptionRowPriceColumnClasses: ['ml-auto'],
  pdOptionRowImageColumnClasses: ['col-2']
};

export default class LegacyProductOptions extends ProductOptions {
  constructor(props) {
    super(props, DEFAULT_OPTIONS);
  }

  handleCheckboxChange(checked, index) {
    let targetPDOptionsInput = this.productOptions[index].qtyInput;
    if(!targetPDOptionsInput) return;

    if(checked) {
      targetPDOptionsInput.value = '1';
    } else {
      targetPDOptionsInput.value = '0';
    }
  }

  buildProductOptionRow(pdOption, index) {
    let inputId = `pdOption-checkbox-${index}`;

    let pdOptionRow = document.createElement('div');
    pdOptionRow.classList.add(...this.options.pdOptionRowClasses);

    // Add the Image
    if(pdOption.image) {
      let imageColumn = document.createElement('div');
      imageColumn.classList.add(...this.options.pdOptionRowImageColumnClasses);
      imageColumn.appendChild(pdOption.image);
      pdOptionRow.appendChild(imageColumn);
    }

    // Add Checkbox
    let checkboxColumn = document.createElement('div');
    checkboxColumn.innerHTML = `<input class="form-check-input" type="checkbox" id="${inputId}" value="" aria-label="Add ${pdOption.name}">`;
    // Add Event Listener on the Checkbox
    checkboxColumn.querySelector('input').addEventListener('change', e => this.handleCheckboxChange(e.target.checked, index));
    pdOptionRow.appendChild(checkboxColumn);

    // Add Name
    let nameColumn = document.createElement('div');
    nameColumn.classList.add(...this.options.pdOptionRowNameColumnClasses);
    nameColumn.innerHTML = `<span>${pdOption.name}</span>`;
    pdOptionRow.appendChild(nameColumn);

    // Add Price
    let priceColumn = document.createElement('div');
    priceColumn.classList.add(...this.options.pdOptionRowPriceColumnClasses);
    priceColumn.innerHTML = `<b>${pdOption.price}</b>`;
    pdOptionRow.appendChild(priceColumn);

    // Wrap in a container
    let pdOptionRowContainer = document.createElement('div');
    pdOptionRowContainer.innerHTML = `<label class="${this.options.pdOptionRowContainerClasses.join(' ')}" for="${inputId}"></label>`;
    pdOptionRowContainer.querySelector('label').appendChild(pdOptionRow);
    
    return pdOptionRowContainer;
  }

  build() {
    if(!this.productOptions || !this.productOptions.length) return;

    // Build the Legacy Product Option Rows

    // Start with the Container
    let pdOptionContainer = document.createElement('div');
    pdOptionContainer.classList.add(...this.options.pdOptionContainerClasses);

    // Build Each Option
    this.productOptions.map((pdOption, index) => this.buildProductOptionRow(pdOption, index)).forEach(pdOptionRow => {
      // TBD: Add Clickhandle to pdOption Row
      pdOptionContainer.appendChild(pdOptionRow);
    });

    // Append it to the legacyProductOptionContainerDom
    this.props.legacyProductOptionContainerDom.appendChild(pdOptionContainer);
    this.props.legacyProductOptionContainerDom.classList.remove('d-none');

    this.moveHiddenBuyButton();
  }

}