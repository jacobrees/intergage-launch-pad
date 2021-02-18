const findHeaderHeight = () => {
  let header = document.querySelector('.c2-header');
  if(!header) return 0;
  let headerHeight = header.offsetHeight;
  if(!headerHeight) return 0;

  return parseInt(headerHeight);
}

export const setHeightVariable = () => {
  document.documentElement.style.setProperty('--headerHeight', `${findHeaderHeight()}px`);
}

export const fixBannerHeight = () => {
  let bannerText = document.querySelector('.c2-banner .c2-templated-text');
  if(bannerText) bannerText.style.setProperty('padding-top', 'var(--headerHeight)', 'important');
};

export default findHeaderHeight;