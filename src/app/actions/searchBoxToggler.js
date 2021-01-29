export default () => {
  let searchBox   = document.querySelector('.c2-header__search-box');
  let searchIcon  = document.querySelector('.c2-header__search-icon');
  if(!searchBox || !searchIcon) return;

  // Style up the Input Box
  let searchInput = searchBox.querySelector('.searchBoxInput'),
      searchLabel = searchBox.querySelector('.searchBoxLabel');

  searchInput.placeholder = searchLabel.innerHTML;
  searchLabel.classList.add('sr-only');
  searchInput.classList.add('form-control');

  const handleDocumentClick = (e) => {
    if(e.target.closest('.c2-header__search-box')) return; // TBD: IE Support

    searchBox.classList.remove('show');
    window.removeEventListener('click', handleDocumentClick);
  };

  searchIcon.addEventListener('click', () => {
    searchBox.classList.add('show');

    searchInput.focus();

    setTimeout(() => {
      window.addEventListener('click', handleDocumentClick);
    }, 0);
  })
};