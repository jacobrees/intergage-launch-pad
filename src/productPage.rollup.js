import ProductListing from './app/listing/productListing';
import ProductDetails from './app/details/productDetails';

export default () => {
  let productListings = Array.prototype.slice.call(document.querySelectorAll('.c2-list--product-grid'));
  productListings.forEach(listing => {
    new ProductListing({listingDom: listing}).build();
  })

  let productDetails = Array.prototype.slice.call(document.querySelectorAll('.c2-product-detail'));
  productDetails.forEach(detail => {
    new ProductDetails({detailDom: detail}).build();
  });
};