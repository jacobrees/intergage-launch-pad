import BuyForm from './buyForm';
import PropObject from '../../PropObject';

const DEFAULT_OPTIONS = {
  extraBuyButtonText: 'Buy'
};

export default class ProductDetails extends PropObject {
  constructor(props) {
    super(props, DEFAULT_OPTIONS);
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

    // Does this page have extra buy buttons, if so change the text and classes
    let extraBuyButtons = this.props.detailDom.querySelectorAll('.c2-product-detail__accessories button.BuyFormBtn');
    extraBuyButtons.forEach(extraBuyButton => {
      extraBuyButton.innerHTML = this.options.extraBuyButtonText;
      extraBuyButton.classList.add('btn-sm');
      extraBuyButton.classList.remove('d-md-inline-block', 'w-md-auto');
    });

    // Check the tabs are open
    // If the the Description tab isn't on the on the product the tabs won't open initially
    let firstLink = this.props.detailDom.querySelector('.c2-product-tabs .nav-link'),
        firstTab  = this.props.detailDom.querySelector('.c2-product-tabs .tab-pane');
    if(firstLink && firstTab) {
      firstLink.classList.add('active');
      firstTab.classList.add('active', 'show');
    }
  }
}