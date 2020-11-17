import BuyForm from './buyForm';
import PropObject from '../../PropObject';

export default class ProductDetails extends PropObject {
  constructor(props) {
    super(props);
    if(!this.props.detailDom) return;

    this.buyForm = new BuyForm({
      buyFormDom: this.props.detailDom.querySelector('.c2-product-detail__buy-form'),
      wishListBtn: this.props.detailDom.querySelector('.c2wlAddToWishListContainer') || this.props.detailDom.querySelector('.c2wlOnWishListContainer')
    });
  }

  build() {
    this.buyForm.build();
  }
}