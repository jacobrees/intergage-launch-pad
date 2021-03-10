import PropObject from '../../PropObject';

import QtyBtns from '../../lib/quantity-btns';
import ProductOptionDropdown from '../../lib/product-options-dropdown';

export default class BuyForm extends PropObject {
  constructor(props) {
    super(props);
    if(!this.props.buyFormDom) return;

    // Does this Product have a Price?
    let hasPrice = this.props.buyFormDom.querySelector('.c2ecbuyfrm') ? true : false;


    // If it does then build the regular Quantity Buttons
    if(hasPrice) {
      this.qtyBtns = new QtyBtns({
        qtyContainer: this.props.buyFormDom.querySelector('.BuyFormQty'),
        qtyInput: this.props.buyFormDom.querySelector('.BuyFormQty input')
      });
    }


    // If it doesn't then this product has Product Options
    // Build the Product Options Dropdown and the Quantity Buttons within there
    if(!hasPrice) {
      this.productOptions = new ProductOptionDropdown({
        containerDom: this.props.buyFormDom,
        selectBoxContainerDom: this.props.selectBoxDropdownDom,
        productPriceDom: this.props.productPriceDom,
        productOptionTableDom: this.props.buyFormDom.querySelector('.PDOT')
      });
    }

    this.btnContainer  = this.props.buyFormDom.querySelector('span.BuyFormBtn');
  }

  build() {
    if(this.qtyBtns) this.qtyBtns.build();
    if(this.productOptions) this.productOptions.build();

    // Move Add to Wish List Btn
    let btnContainer  = this.props.buyFormDom.querySelector('span.BuyFormBtn');
    if(this.props.wishListBtn && btnContainer) {
      btnContainer.appendChild(this.props.wishListBtn);
      this.props.wishListBtn.children[0].classList.remove('mr-md-2', 'd-md-inline-block');
      this.props.wishListBtn.children[0].classList.add('d-md-inline-flex', 'align-items-center', 'h-100');
    }
  }

}