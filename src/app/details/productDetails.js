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

    let accessories = this.props.detailDom.querySelectorAll('.c2-product-detail__accessories__accessory');
    accessories.forEach((accessory, id) => {
      let btn = accessory.querySelector('.btn-modal'),
          modal = accessory.querySelector('.modal'),
          modalTitle = accessory.querySelector('.modal-title');

      btn.dataset.target = `#accessoryModal${id}`;
      modal.id           = `accessoryModal${id}`;

      modal.setAttribute('aria-labelledby', `#accessoryModal${id}Label`);
      modalTitle.id      = `accessoryModal${id}Label`;
    })
  }
}