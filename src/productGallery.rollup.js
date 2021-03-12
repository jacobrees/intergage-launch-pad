import PropObject from './PropObject';

import PhotoSwipe from 'photoswipe';
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default';

class ProductGallery extends PropObject {
  constructor(props) {
    super(props);

    this.id = this.props.gallery.id || 0;

    // Find the Main Image
    this.figure = this.props.gallery.querySelector('.c2-product-gallery__image');
    // Find the Thumbnails
    this.thumbnails = [].slice.call(this.props.gallery.querySelectorAll('.c2-product-gallery__thumbnails img'));

    // Find this Gallery's PhotoSwipe Container
    this.pswpElement = document.querySelector('#pswp-' + this.id);
  }

  setFigureImage(thumbnail) {
    this.figure.src = thumbnail.dataset.img;

    this.figure.addEventListener('click', e => {
      this.openPhotoSwipeGallery(thumbnail.dataset.index, this.figure);
    });
  }

  configThumbnail(thumbnail) {
    // Add Click Handler for this Thumbnail
    thumbnail.addEventListener('click', e => {
      this.openPhotoSwipeGallery(thumbnail.dataset.index, thumbnail);
    });
  }

  openPhotoSwipeGallery(index, target) {
    let photoSwipeInstance = this.buildPhotoSwipeGalleryInstance(index, target);
    if(photoSwipeInstance) {
      photoSwipeInstance.init();
    }
  }

  findGalleryUIObject() {
    if(!UI || !this.id) return {};

    let galleriesOnPage = UI.aGalleries || {};

    return galleriesOnPage[this.id] || {};
  }

  buildPhotoSwipeGalleryInstance(sIndex, target) {
    let { aImages } = this.findGalleryUIObject(),
        index = parseInt(sIndex, 10);

    if(!this.pswpElement || !aImages) return null;
    
    let galleyImages = aImages.map(image => ({
      src: image.sSrc,
      w: image.nWidth,
      h: image.nHeight
    }));

    let galleryOptions = {
      index: index,

      // Give PhotoSwipe Coordinates of the Thumbnail click so it can do a 
      // fancy zoom animation
      getThumbBoundsFn: () => {
        // Get window scroll Y
        let pageYScroll = window.pageYOffset || document.documentElement.scrollTop; 

        // Get position of element relative to viewport
        let rect = target.getBoundingClientRect(); 

        return {x: rect.left, y: rect.top + pageYScroll, w: rect.width};
      }
    };
  
    return new PhotoSwipe(this.pswpElement, PhotoSwipeUI_Default, galleyImages, galleryOptions);
  }

  init() {
    // Config each Thumbnail
    this.thumbnails.forEach((thumbnail, index) => {
      if(index === 0) {
        // Set the First Thumbnail as the main image
        this.setFigureImage(thumbnail);
      }

      this.configThumbnail(thumbnail);
    });

    if(this.pswpElement) {
      // Must move the PhotoSwipe Container to the end of the 
      // body tag for IE support
      document.body.appendChild(this.pswpElement);
    }
  }

}

export default () => {
  // Initialise all Product Galleries on the page
  [].slice.call(document.querySelectorAll('.c2-product-gallery')).forEach(gallery => {
    new ProductGallery({gallery: gallery}).init();
  });
}