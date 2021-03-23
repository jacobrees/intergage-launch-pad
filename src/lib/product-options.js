import PropObject from '../PropObject';

const DEFAULT_OPTIONS = {
  debug: false,
  buyBtnContainerClasses: ['BuyFormBtn', 'justify-content-end']
};

export default class ProductOptions extends PropObject {
  constructor(props, defaultOptions) {
    super(props, Object.assign(DEFAULT_OPTIONS, {...defaultOptions}));

    this.productOptions = this.getProductOptionRows();

    if(this.options.debug && this.props.productOptionTableDom) this.props.productOptionTableDom.classList.add('d-block');
  }

  getProductOptionRows() {
    if(!this.props.productOptionTableDom) return [];

    let productTableRows = [].slice.call(this.props.productOptionTableDom.querySelectorAll('tbody tr[class*="ResultsRow"]'));

    return productTableRows.map(productTableRow => {
      return {
        name: productTableRow.querySelector('.PDOptionTableName').innerHTML,
        image: productTableRow.querySelector('.PDOptionTableImage img'),
        price: productTableRow.querySelector('.PDOTQ').innerHTML,
        qtyInput: productTableRow.querySelector('.PDOTOQ input')
      };
    });
  }

  moveHiddenBuyButton() {
    if(!this.props.productOptionTableDom || !this.props.containerDom) return;

    // Products with Product Options will output the buy button into the table
    // Must Move it to the correct spot
    let buyBtn = this.props.productOptionTableDom.querySelector('.BuyFormBtn');
    if(buyBtn) {
      // Build a Button Container for it
      let buyBtnContainer = document.createElement('span');
      buyBtnContainer.classList.add(...this.options.buyBtnContainerClasses);
      buyBtnContainer.appendChild(buyBtn)
      this.props.containerDom.appendChild(buyBtnContainer);
      // The button won't submit the form as it no longer sits inside the form
      // Add our own click listener
      buyBtn.addEventListener('click', e => this.handleBuyAction());
    };
  }

  handleBuyAction() {
    if(!this.productOptions || !this.productOptions.length) return;

    // Find one of the options and submit it's form
    let aPDOption = this.productOptions.slice(0, 1)[0];
    aPDOption.qtyInput.form.submit();
  }

}