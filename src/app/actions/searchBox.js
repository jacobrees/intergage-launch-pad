import $ from 'jquery';

export default () => {
  let searchBox = document.querySelector('.c2-header .c2-header__search__box'),
      searchIcon  = document.querySelector('.c2-header .c2-header__search__icon'),
      searchBtn = document.querySelector('.c2-header__search'),
      searchInput = searchBox.querySelector('.searchBoxInput'),
      searchLabel = searchBox.querySelector('.searchBoxLabel');
  
  if(!searchBox || !searchIcon || !searchInput || !searchLabel || !searchBtn) { return }

  searchBtn.classList.remove('d-none');

  // Style up the Input Box
  searchInput.placeholder = searchLabel.innerHTML;
  searchLabel.classList.add('sr-only');
  searchInput.classList.add('form-control');

  const handleDocumentClick = (e) => {
    // jquery used for IE support
    if($(e.target).closest('.c2-header__search__box').get(0)) { return };

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