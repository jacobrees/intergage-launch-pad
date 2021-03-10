import BuyForm from './buyForm';
import PropObject from '../../PropObject';

export default class ProductDetails extends PropObject {
  constructor(props) {
    super(props);
    if(!this.props.detailDom) return;

    this.buyForm = new BuyForm({
      productPriceDom: this.props.detailDom.querySelector('.c2-product-detail__product-price'),
      buyFormDom: this.props.detailDom.querySelector('.c2-product-detail__buy-form'),
      selectBoxDropdownDom: this.props.detailDom.querySelector('.c2-product-detail__pd-option-select-box'),
      wishListBtn: this.props.detailDom.querySelector('.c2wlAddToWishListContainer') || this.props.detailDom.querySelector('.c2wlOnWishListContainer')
    });
  }

  build() {
    if(this.buyForm) this.buyForm.build();
  }
}