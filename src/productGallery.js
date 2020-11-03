import ProductGallery from './gallery';

export default () => {
  let productGalleries = []
  // Initialise all Product Galleries on the page
  Array.prototype.slice.call(document.querySelectorAll('.c2-product-gallery')).forEach(gallery => {
    let galleryInstance = new ProductGallery(gallery);
    galleryInstance.init();
    productGalleries.push(galleryInstance);
  });

};