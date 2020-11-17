import PropObject from '../../PropObject';

export default class BuyForm extends PropObject {
  constructor(props) {
    super(props);
    if(!this.props.buyFormDom) return;

    this.btnContainer  = this.props.buyFormDom.querySelector('.BuyFormBtn');
    this.qtyContainer  = this.props.buyFormDom.querySelector('.BuyFormQty');
    this.qtyInput      = this.props.buyFormDom.querySelector('input');
  }

  buildBtn(innerHTML) {
    let btn = document.createElement('span');
    btn.classList.add('btn', 'btn-outline-secondary');
    btn.innerHTML = innerHTML;
    return btn;
  }

  buildMinusBtn() {
    let minusBtn = this.buildBtn(`<i class="fas fa-minus"></i>`);
    minusBtn.addEventListener('click', e => this.handleClick(false));
    return minusBtn;
  }

  buildPlusBtn() {
    let plusBtn = this.buildBtn(`<i class="fas fa-plus"></i>`);
    plusBtn.addEventListener('click', e => this.handleClick(true));
    return plusBtn;
  }

  build() {
    // Move Add to Wish List Btn
    if(this.props.wishListBtn) {
      this.btnContainer.appendChild(this.props.wishListBtn);
      this.props.wishListBtn.children[0].classList.remove('mr-md-2', 'd-md-inline-block');
      this.props.wishListBtn.children[0].classList.add('d-md-inline-flex', 'align-items-center', 'h-100');
    }
    // Build the Input Group for Quantity box
    this.qtyContainer.classList.add('input-group', 'input-group-sm', 'col-auto');
    this.qtyContainer.insertBefore(this.buildMinusBtn(), this.qtyContainer.children[0]);
    this.qtyInput.classList.add('form-control', 'text-center');
    this.qtyInput.size = 1;
    this.qtyContainer.appendChild(this.buildPlusBtn());
  }

  handleClick(plus) {
    let currentValue = parseInt(this.qtyInput.value);

    if(plus) {
      this.qtyInput.value = `${currentValue + 1}`;
    } else if(!plus && currentValue - 1 !== 0) {
      this.qtyInput.value = `${currentValue - 1}`;
    }
  }

}