import ProductGallery from './gallery';

import PhotoSwipe from 'photoswipe';
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default';

let oldGallery = () => {
  let productGalleries = []
  // Initialise all Product Galleries on the page
  Array.prototype.slice.call(document.querySelectorAll('.c2-product-gallery')).forEach(gallery => {
    let galleryInstance = new ProductGallery(gallery);
    galleryInstance.init();
    productGalleries.push(galleryInstance);
  });

};

const buildPhotoSwipeGallery = (galleryId, { aImages }) => {
  let pswpElement = document.querySelector('#pswp-' + galleryId);
  if(!pswpElement || !aImages) return;

  let galleyImages = aImages.map(image => ({
    src: image.sSrc,
    w: image.nWidth,
    h: image.nHeight
  }));

  // Must move the PhotoSwipe Container to the end of the 
  // body tag for IE support
  document.body.appendChild(pswpElement);

  let photoSwipeInstance = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, galleyImages);
  photoSwipeInstance.init();
};

export default () => {
  if(!UI) return;

  let galleriesOnPage = UI.aGalleries || {};

  for(let galleryId in galleriesOnPage) {
    if(!galleriesOnPage.hasOwnProperty(galleryId)) return;

    buildPhotoSwipeGallery(galleryId, galleriesOnPage[galleryId]);
  }
}