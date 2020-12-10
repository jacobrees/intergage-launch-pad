const findHeaderHeight = () => {
  let header = document.querySelector('#header');
  if(!header) return 0;
  let headerHeight = window.getComputedStyle(header, ':after').height;
  if(!headerHeight) return 0;

  return parseInt(headerHeight);
}

export const setHeightVariable = () => {
  document.documentElement.style.setProperty('--headerHeight', `${findHeaderHeight()}px`);
}

export default findHeaderHeight;