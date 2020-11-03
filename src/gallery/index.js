export default class ProductGallery {
  constructor(gallery) {
    // Find the Main Image
    this.figure = gallery.querySelector('.c2-product-gallery__image');
    // Find the Thumbnails
    this.thumbnails = Array.prototype.slice.call(gallery.querySelectorAll('.c2-product-gallery__thumbnails img'));
  }

  setFigureImage(thumb) {
    this.figure.src = thumb.dataset.img;
  }

  handleThumbClick(thumb, e) {
    this.setFigureImage(thumb);
  }

  init() {
    this.setFigureImage(this.thumbnails[0]);

    this.thumbnails.forEach(thumb => {
      thumb.addEventListener('click', e => this.handleThumbClick(thumb, e))
    });
  }

}