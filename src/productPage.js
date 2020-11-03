export default () => {
  let buyFormContainer = Array.prototype.slice.call(document.querySelectorAll('.c2-product-detail__buy-form'));
  buyFormContainer.forEach(container => {
    let wishListBtn = container.querySelector('.c2wlAddToWishListContainer');
    let buyForm = container.querySelector('.c2ecbuyfrm');
    if(wishListBtn && buyForm) {
      buyForm.appendChild(wishListBtn);
    }
  });
};