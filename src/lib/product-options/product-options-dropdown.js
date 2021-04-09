import ProductOptions from '../product-options';

import QtyBtns from '../quantity-btns';

const DEFAULT_OPTIONS = {
  selectClasses: ['form-select', 'mt-1'],
  qtyContainerClasses: ['d-flex', 'flex-wrap', 'align-items-center', 'mt-2', 'justify-content-end']
};

export default class ProductOptionDropdown extends ProductOptions {
  constructor(props) {
    super(props, DEFAULT_OPTIONS);
    if(!this.props.productOptionTableDom) return;

    // Find the heading for 'Quantity' row - so it can be translated by the CMS
    let qtyLabelDom = this.props.productOptionTableDom.querySelector('tbody tr:first-child td:last-child');
    this.qtyLabel = qtyLabelDom ? qtyLabelDom.innerHTML : 'Quantity';
  }

  updateQtyValueForSelectedOption(newValue) {
    this.currentSelectedOption.qtyInput.value = newValue;
  }

  selectOption(productOption) {
    if(this.currentSelectedOption) {
      // Unselect the current one
      this.currentSelectedOption.qtyInput.value = '0';
    }
    // Select the new one
    this.currentSelectedOption = productOption;
    // Update its quantity value
    this.updateQtyValueForSelectedOption(this.qtyInput ? this.qtyInput.value : '1');
    // Update Price
    this.priceBox.innerHTML = productOption.price;
  }

  build() {
    if(!this.productOptions || !this.productOptions.length) return;

    // Create Price Box
    this.priceBox = document.createElement('span');

    if(this.props.productPriceDom) {
      this.props.productPriceDom.appendChild(this.priceBox);
    } else {
      this.props.containerDom.appendChild(this.priceBox);
    }
    
    // Create the Select box based on the product options
    let selectElement = document.createElement('select');
    selectElement.classList.add(...this.options.selectClasses);
    this.productOptions.forEach((productOption, index) => {
      if(index === 0) {
        // As the first option will be selected by default
        // Update it's input to be value '1'
        this.selectOption(productOption);
      }

      let optionElement = document.createElement('option');
      optionElement.innerHTML = productOption.name;
      optionElement.value = index;

      selectElement.appendChild(optionElement);
    });
    selectElement.addEventListener('change', e => this.handleSelectChange(e.target.value));

    if(this.props.selectBoxContainerDom) {
      this.props.selectBoxContainerDom.classList.remove('d-none');
      this.props.selectBoxContainerDom.appendChild(selectElement);
    } else {
      this.props.containerDom.appendChild(selectElement);
    }

    // Build new Quantity Buttons
    let qtyContainer = document.createElement('div');
    qtyContainer.classList.add(...this.options.qtyContainerClasses);
    qtyContainer.innerHTML = `
      <span class="BuyFormFieldName d-inline">${this.qtyLabel}</span>
      <div class="BuyFormQty">
        <input type="text" value="1">
      </div>
    `;

    new QtyBtns({
      qtyContainer: qtyContainer.querySelector('.BuyFormQty'),
      qtyInput: qtyContainer.querySelector('.BuyFormQty input'),
      events: {
        plusBtn: newValue => this.updateQtyValueForSelectedOption(newValue),
        minusBtn: newValue => this.updateQtyValueForSelectedOption(newValue)
      }
    }).build();

    this.qtyInput = qtyContainer.querySelector('.BuyFormQty input');

    this.props.containerDom.appendChild(qtyContainer);

    this.moveHiddenBuyButton();
  }

  handleSelectChange(optionIndex) {
    this.selectOption(this.productOptions[optionIndex]);
  }

}