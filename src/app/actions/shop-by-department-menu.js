export default () => {
  let shopByDepartmentLev1 = document.querySelector('.c2-mega-menu-shop-by-departemnt__lev1'),
      shopByDepartmentLev2 = document.querySelector('.c2-mega-menu-shop-by-departemnt__lev2');
      
  if(!shopByDepartmentLev1 || !shopByDepartmentLev2) return;

  shopByDepartmentLev1.querySelectorAll('li.lev1').forEach((level1Item, index) => {
    // Find the Title of this level
    let linkDom = level1Item.querySelector('a.lev1');
    if(!linkDom) return;

    let title = linkDom ? linkDom.innerHTML : '';

    // Find the Level 2 and move it
    let lev2Dom = level1Item.querySelector('ul.lev2');
    if(lev2Dom) {
      // Create Wrapper for the Level 2
      let lev2Wrapper = document.createElement('div');

      // Create ID for the Level 2
      let id = `shop-by-department-lev2-${index}`;

      lev2Wrapper.id = id;
      lev2Wrapper.className = 'lev2wrapper';

      // Add dataset Attributes to the li item
      level1Item.dataset.c2Trigger  = 'mega-menu-item';
      level1Item.dataset.c2Target   = `#${id}`;

      // Create Title heading for the 2nd Level
      let titleDom = document.createElement('h5');
      titleDom.innerHTML = title;
      titleDom.className = 'mb-3 text-primary';

      if(title.length) {
        lev2Wrapper.appendChild(titleDom);
      }
      lev2Wrapper.appendChild(lev2Dom);
      shopByDepartmentLev2.appendChild(lev2Wrapper);
    }
  });
};