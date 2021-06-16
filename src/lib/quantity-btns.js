import PropObject from '../PropObject';

/**
 * Quantity Buttons - quantity-btns.js
 * Written by: Owen Evans
 * 
 * Create a Plus and Minus Button on a form field input and auto submit parent
 * form on field input change. Optionally can create a toggler for a checkbox 
 * field with auto submit on change.
 * 
 * Original built for the quantity box on the buy form of e-commmerce products 
 * and the quantity box and delete checkbox on basket item rows.
 * 
 * 
 * USAGE:
 * `` import QtyBtns from '/lib/quantity-btns';
 * ``
 * `` let qtyBtnsInstance = new QtyBtns({
 * ``   REQUIRED PROPS,
 * ``   ADDITIONAL PROPS, 
 * ``   options: {
 * ``     OPTIONS
 * ``   },
 * ``   events: {
 * ``     EVENTS
 * ``   }
 * `` });
 * ``
 * `` qtyBtnsInstance.render();
 * 
 * 
 * REQUIRED PROPS:
 * {
 *    // The container element where the Plus and Minus Buttons will be 
 *    // prepended and appended into
 *    qtyContainer: HTMLElement,
 * 
 *    // The quantity input field which is changed by the Plus and Minus 
 *    // Buttons
 *    qtyInput: HTMLInputElement,
 * }
 * 
 * 
 * ADDITIONAL PROPS:
 * {
 *    // The container element where the checkbox toggle will be place in
 *    delContainer: HTMLElement,
 * 
 *    // The checkbox which the toggle will change
 *    delInput: HTMLInputElement
 * }
 * 
 * OPTIONS:
 * Please see DEFAULT_OPTIONS below
 * 
 * EVENTS:
 * Please see DEFAULT_EVENTS below
 * 
 */

const DEFAULT_OPTIONS = {
  // Allow parent form to be submitted on Input Change
  autoSubmit: false,
  // Wait for X number of milliseconds before the form is auto submitted, 
  // allowing the user to make multiple changes without the page reloading 
  // before they're finished
  autoSubmitTimeout: 1000,

  // Additional classes added to the qtyContainer element
  qtyContainerClassNames: ['input-group', 'input-group-sm', 'col-auto', 'flex-nowrap'],
  // Additional classes added to the qtyInput field
  qtyInputClassNames: ['form-control', 'text-center'],

  // HTML size attribute of qtyInput field
  qtyInputSize: 3,
  // The minimum number the qtyInput will reach
  minQty: 1,

  // Plus and Minus button classes
  qtyBtnClasses: ['btn', 'btn-outline-secondary', 'd-flex', 'align-items-center'],
  // Inner HTML markup for the Plus Button
  plusBtnInnerHTML: `<i class="fas fa-plus"></i>`,
  // Inner HTML markup for the Minus Button
  minusBtnInnerHTML: `<i class="fas fa-minus"></i>`,

  // Delete button classes
  delBtnClasses: ['btn', 'btn-danger'],
  // Inner HTML markup for the Delete Button
  delBtnInnerHTML: `<i class="fas fa-trash"></i>`
};

const DEFAULT_EVENTS = {
  // Event for when the plus button is clicked
  plusBtn: (newValue) => {},
  // Event for when the minus button is clicked
  minusBtn: (newValue) => {},
  // Event for when the delete toggle is clicked
  delBtn: (newValue) => {}
};

export default class QuantityBtns extends PropObject {
  constructor(props) {
    super(props, DEFAULT_OPTIONS, DEFAULT_EVENTS);

    this.btnAutoSubmit = 0;
  }

  /**
   * Wraps the innerHTML given in a span element with the default button classes 
   * unless an override is given
   * 
   * @param {String} innerHTML Button text and/or additional HTML
   * @param {Array} overrideClasses classes to use instead of the default
   * @returns The button HTML element
   */
  buildBtn(innerHTML, overrideClasses) {
    let btn = document.createElement('span'),
        btnClasses = overrideClasses || this.options.qtyBtnClasses;
    btn.classList.add(...btnClasses);
    btn.innerHTML = innerHTML;
    return btn;
  }

  /**
   * Creates the minus button and adds a on click event listener to it
   * @returns The minus button HTML element
   */
  buildMinusBtn() {
    let minusBtn = this.buildBtn(this.options.minusBtnInnerHTML);
    minusBtn.addEventListener('click', e => this.handleClick(false));
    return minusBtn;
  }

  /**
   * Creates the plus button and adds a on click event listener to it
   * @returns The plus button HTML element
   */
  buildPlusBtn() {
    let plusBtn = this.buildBtn(this.options.plusBtnInnerHTML);
    plusBtn.addEventListener('click', e => this.handleClick(true));
    return plusBtn;
  }

  /**
   * Creates the delete button and adds a on click event listener to it
   * @returns The delete button HTML element
   */
  buildDeleteBtn() {
    let delBtn = this.buildBtn(this.options.delBtnInnerHTML, this.options.delBtnClasses);
    delBtn.addEventListener('click', e => this.handleDelete());
    return delBtn;
  } 

  /**
   * Renders the quantity buttons and delete button within the given containers
   */
  render() {
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

  /**
   * Updates the quantity input and will request to 
   * submit the parent form if nessassary
   * 
   * @param {Boolean} plus Was this a click from the plus button
   */
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
      this.btnAutoSubmit += 1;
      setTimeout(e => this.reloadForm(), this.options.autoSubmitTimeout);
    }
  }

  /**
   * Updates the checked state of the delete checkbox and will request to 
   * submit the parent form if nessassary
   */
  handleDelete() {
    this.props.delInput.checked = !this.props.delInput.checked;
    this.events.delBtn(this.props.delInput.checked);
    
    if(this.options.autoSubmit) {
      this.btnAutoSubmit += 1;
      setTimeout(e => this.reloadForm(), this.options.autoSubmitTimeout);
    }
  }

  /**
   * Will submit the parent form if one request has 
   * been made within the last x milliseconds
   */
  reloadForm() {
    if(this.btnAutoSubmit && this.btnAutoSubmit > 1) {
      this.btnAutoSubmit -= 1;
    } else {
      this.props.qtyInput.form.submit();
    }
  }
}
