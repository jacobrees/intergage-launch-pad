import QtyBtns from '../../lib/quantity-btns';

export default () => {
  // Basket Items
  let basketItems = [].slice.call(document.querySelectorAll('.c2-basket-layout .c2-basket-layout__item'));
  basketItems.forEach(basketItem => {
    new QtyBtns({
      qtyContainer: basketItem.querySelector('.BuyFormQty'),
      qtyInput: basketItem.querySelector('.BuyFormQty input'),
      delContainer: basketItem.querySelector('.delete-wrap'),
      delInput: basketItem.querySelector('.delete-wrap input'),
      options: {
        autoSubmit: true,
        qtyInputSize: 6
      }
    }).render();
  });
};
