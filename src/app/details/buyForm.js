import PropObject from '../../PropObject';

import QtyBtns from '../../lib/quantity-btns';

export default class BuyForm extends PropObject {
  constructor(props) {
    super(props);
    if(!this.props.buyFormDom) return;

    this.qtyBtns = new QtyBtns({
      qtyContainer: this.props.buyFormDom.querySelector('.BuyFormQty'),
      qtyInput: this.props.buyFormDom.querySelector('.BuyFormQty input'),
      options: {
        qtyBtnClasses: ['btn', 'btn-outline-secondary', 'd-flex', 'align-items-center']
      }
    });

    this.btnContainer  = this.props.buyFormDom.querySelector('.BuyFormBtn');
    this.qtyContainer  = this.props.buyFormDom.querySelector('.BuyFormQty');
    this.qtyInput      = this.props.buyFormDom.querySelector('input');
  }

  build() {
    if(this.qtyBtns) this.qtyBtns.build();
    // Move Add to Wish List Btn
    if(this.props.wishListBtn) {
      this.btnContainer.appendChild(this.props.wishListBtn);
      this.props.wishListBtn.children[0].classList.remove('mr-md-2', 'd-md-inline-block');
      this.props.wishListBtn.children[0].classList.add('d-md-inline-flex', 'align-items-center', 'h-100');
    }
  }

}