import PropObject from '../../PropObject';

import QtyBtns from '../../lib/quantity-btns';

export default class BasketLayout extends PropObject {
  constructor(props) {
    super(props);
    if(!this.props.basketLayoutDom) return;

    let basketItems = [].slice.call(this.props.basketLayoutDom.querySelectorAll('tbody tr'));
    this.qtyBtns = [];
    basketItems.forEach(basketItem => {
      this.qtyBtns.push(new QtyBtns({
        qtyContainer: basketItem.querySelector('.BuyFormQty'),
        qtyInput: basketItem.querySelector('.BuyFormQty input'),
        delContainer: basketItem.querySelector('.delete-wrap'),
        delInput: basketItem.querySelector('.delete-wrap input'),
        options: {
          autoSubmit: true,
          qtyInputSize: 6
        }
      }));
    });
  }

  build() {
    if(this.qtyBtns) this.qtyBtns.forEach(qtyBtn => {
      qtyBtn.build();
    });
  }
}