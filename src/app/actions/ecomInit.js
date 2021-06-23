import QtyBtns from '../../lib/quantity-btns';

export default () => {
  // Product Detail Page
  let productBuyForms = [].slice.call(document.querySelectorAll('.c2-product-detail .c2-product-detail__buy-form'));
  productBuyForms.forEach(productBuyForm => {
    new QtyBtns({
      qtyContainer: productBuyForm.querySelector('.BuyFormQty'),
      qtyInput: productBuyForm.querySelector('.BuyFormQty input'),
      options: {
        qtyContainerClassNames: ['input-group', 'input-group-sm', 'col', 'flex-nowrap'],
        qtyBtnClasses: ['btn', 'btn-outline-primary', 'd-flex', 'align-items-center']
      }
    }).render();
  });

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
