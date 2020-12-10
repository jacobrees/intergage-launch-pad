
export default class VATToggler {
  constructor(toggler) {
    if(!toggler) {
      this.found = false;
      return;
    }
    this.found = true;
    this.toggler = toggler;

    this.toggler.classList.add('c2-toggler');

    this.inputs = this.toggler.querySelectorAll('input[type="radio"]');

    let activeInput = this.toggler.querySelector('input[checked]');
    if(activeInput) {
      this.active = parseInt(activeInput.value);
    }

    this.buildToggler();
  }

  handleClick(e, togglerWrap) {
    togglerWrap.classList.toggle('active');
    this.active = this.active ? 0 : 1;
    if(this.inputs[this.active]) {
      this.inputs[this.active].checked = true;
      this.toggler.submit();
    }
  }

  buildToggler() {
    let togglerWrap = document.createElement('div');
    togglerWrap.className = `c2-toggler__slider d-flex align-items-center justify-content-around${this.active ? ' active' : ''}`;
    togglerWrap.innerHTML = `
      <span class="text-white font-weight-bold">On</span><span class="text-white font-weight-bold">Off</span>
      <div class="c2-toggler__slider__center bg-white d-flex align-items-center justify-content-center">
        <span class="text-body font-weight-bold">VAT</span>
      </div>
    `;
    togglerWrap.addEventListener('click', e => this.handleClick(e, togglerWrap));

    this.toggler.appendChild(togglerWrap);
  }
}
