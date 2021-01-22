const findHeaderHeight = () => {
  let header = document.querySelector('#header');
  if(!header) return 0;
  let headerHeight = window.getComputedStyle(header, ':after').height;
  if(!headerHeight) return 0;

  return parseInt(headerHeight);
}

export const setHeightVariable = () => {
  // If we are on the Blog Detail Page don't all the banenr section to have a min height
  let banner = document.querySelector('.c2-banner');
  if(document.querySelector('.c2-blog-details') && banner) {
    banner.style.minHeight = '0';
  }
  
  document.documentElement.style.setProperty('--headerHeight', `${findHeaderHeight()}px`);
}

export default findHeaderHeight;