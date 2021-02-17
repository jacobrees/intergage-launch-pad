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

export default findHeaderHeight;