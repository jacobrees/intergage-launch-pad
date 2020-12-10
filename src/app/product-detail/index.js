import PropObject from '../../PropObject';

import QtyBtns from '../../lib/quantity-btns';
import ProductScrollSpy from './product-scrollSpy';
import ProductOptionDropdown from '../../lib/product-options-dropdown';

export default class ProductDetail extends PropObject {
  constructor(props) {
    super(props);
    if(!this.props.productDetailDom) return;

    this.qtyBtns = new QtyBtns({
      qtyContainer: this.props.productDetailDom.querySelector('.c2-product-detail__buyForm .BuyFormQty'),
      qtyInput: this.props.productDetailDom.querySelector('.c2-product-detail__buyForm .BuyFormQty input')
    });

    this.scrollSpy = new ProductScrollSpy({
      productId: this.props.id,
      scrollSpyContainerDom: this.props.productDetailDom.querySelector('.c2-product-detail__scroll-spy')
    });

    this.productOptions = new ProductOptionDropdown({
      containerDom: this.props.productDetailDom.querySelector('.c2-product-detail__buyForm > .lead'),
      productOptionTableDom: this.props.productDetailDom.querySelector('.PDOT')
    });
  }

  build() {
    if(this.qtyBtns) this.qtyBtns.build();
    if(this.scrollSpy) this.scrollSpy.build();
    if(this.productOptions) this.productOptions.build();
  }
}