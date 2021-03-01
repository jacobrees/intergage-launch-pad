export default () => {
  let header = document.querySelector('.c2-header'),
      banner = document.querySelector('.c2-banner');
  if(!header || !banner) return;

  // Find Height of Header
  let headerHeight = header.offsetHeight;

  // Find the banner Container
  let bannerContainer = banner.querySelector('.c2-container');

  // Check if there is a sliding banner
  let slidingBannerContainers = banner.querySelectorAll('.slick-track .c2-container');

  if(bannerContainer && headerHeight && !slidingBannerContainers.length) {
    bannerContainer.style.setProperty("padding-top", `${headerHeight}px`, "important");
    bannerContainer.style.setProperty("padding-bottom", `${headerHeight}px`, "important");
  }

  if(headerHeight && slidingBannerContainers.length) {
    slidingBannerContainers.forEach(container => {
      container.style.setProperty("padding-top", `${headerHeight}px`, "important");
      container.style.setProperty("padding-bottom", `${headerHeight}px`, "important");
    });
  }
};
