import PropObject from '../PropObject';

const DEFAULT_OPTIONS = {
  autoSubmit: false,
  autoSubmitTimeout: 1000,
  qtyContainerClassNames: ['input-group', 'input-group-sm', 'col-auto'],
  qtyInputClassNames: ['form-control', 'text-center'],
  qtyInputSize: 3,
  qtyBtnClasses: ['btn', 'btn-outline-secondary', 'd-flex', 'align-items-center'],
  delBtnClasses: ['btn', 'btn-danger'],
  minQty: 1,
  dispatchEvents: {
    plusBtnClick: 'QUANTITY-BTN-PLUS-CLICK',
    minusBtnClick: 'QUANTITY-BTN-MINUS-CLICK',
  }
};

const DEFAULT_EVENTS = {
  plusBtn: (newValue) => {},
  minusBtn: (newValue) => {}
};

export default class QuantityBtns extends PropObject {
  constructor(props) {
    super(props, DEFAULT_OPTIONS, DEFAULT_EVENTS);

    this.btnAutoReload = 0;
  }

  buildBtn(innerHTML, overrideClasses) {
    let btn = document.createElement('span'),
        btnClasses = overrideClasses || this.options.qtyBtnClasses;
    btn.classList.add(...btnClasses);
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

  buildDeleteBtn() {
    let delBtn = this.buildBtn(`<i class="fas fa-trash"></i>`, this.options.delBtnClasses);
    delBtn.addEventListener('click', e => this.handleDelete());
    return delBtn;
  } 

  build() {
    if(!this.props.qtyContainer || !this.props.qtyInput) return;

    // Build the Input Group for Quantity box
    this.props.qtyContainer.classList.add(...this.options.qtyContainerClassNames);

    // Build the Minus Btn
    this.props.qtyContainer.insertBefore(this.buildMinusBtn(), this.props.qtyContainer.children[0]);

    // Update the Input Box
    this.props.qtyInput.classList.add(...this.options.qtyInputClassNames);
    this.props.qtyInput.size = this.options.qtyInputSize;

    // Build the Plus Btn
    this.props.qtyContainer.appendChild(this.buildPlusBtn());

    // Build the Delete Btn, if needed
    if(!this.props.delContainer || !this.props.delInput) return;
    this.props.delContainer.appendChild(this.buildDeleteBtn())
  }

  handleClick(plus) {
    let currentValue = parseInt(this.props.qtyInput.value),
        valueChanged = false;
    
    if(plus) {
      this.props.qtyInput.value = `${currentValue + 1}`;
      valueChanged = true;
      this.events.plusBtn(this.props.qtyInput.value);
    } else if(!plus && currentValue - 1 >= this.options.minQty) {
      this.props.qtyInput.value = `${currentValue - 1}`;
      valueChanged = true;
      this.events.minusBtn(this.props.qtyInput.value);
    }

    if(this.options.autoSubmit && valueChanged) {
      this.btnAutoReload += 1;
      setTimeout(e => this.reloadForm(), this.options.autoSubmitTimeout);
    }
  }

  handleDelete() {
    this.props.delInput.checked = !this.props.delInput.checked;
    
    if(this.options.autoSubmit) {
      this.btnAutoReload += 1;
      setTimeout(e => this.reloadForm(), this.options.autoSubmitTimeout);
    }
  }

  reloadForm() {
    if(this.btnAutoReload && this.btnAutoReload > 1) {
      this.btnAutoReload -= 1;
    } else {
      this.props.qtyInput.form.submit();
    }
  }
}