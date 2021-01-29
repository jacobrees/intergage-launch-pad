export default () => {
  let searchBtn = document.querySelector('.c2-header .c2search-btn'),
      searchBox = document.querySelector('.c2-header .c2search-box');
  if(!searchBtn || !searchBox) return;

  // Style up the Input Box
  let searchInput = searchBox.querySelector('.searchBoxInput'),
      searchLabel = searchBox.querySelector('.searchBoxLabel');

  if(!searchInput || !searchLabel) {
    // The search box hasn't been inserted into the header
    searchBtn.querySelector('i').classList.add('d-none');
    return;
  };

  searchInput.placeholder = searchLabel.innerHTML;
  searchInput.classList.add('form-control');

  // Create Input Group
  let inputGroup = document.createElement('div');
  inputGroup.classList.add('input-group', 'px-3');
  inputGroup.innerHTML = `
    <button class="btn btn-primary btn-no-arrow bg-dark"><i class="fas fa-search"></i></button>
  `;
  inputGroup.insertBefore(searchInput, inputGroup.firstChild);

  // Add the input group back into the form
  let searchForm = searchBox.querySelector('.searchBoxForm');
  searchForm.insertBefore(inputGroup, searchForm.firstChild);

  const handleDocumentClick = (e) => {
    // If the click was within the Search Box
    // Don't hide it
    if(e.target.closest('.c2search-box')) return; // TBD: IE Support

    searchBox.classList.remove('show');

    // Switch the Icon to the search icon
    searchBtn.querySelector('i').classList.remove('fa-times');
    searchBtn.querySelector('i').classList.add('fa-search');

    window.removeEventListener('click', handleDocumentClick);
  };

  searchBtn.addEventListener('click', () => {
    if(searchBox.classList.contains('show')) return; // Already open

    searchBox.classList.add('show');

    // Switch the Icon to the close icon
    searchBtn.querySelector('i').classList.remove('fa-search');
    searchBtn.querySelector('i').classList.add('fa-times');

    setTimeout(() => {
      window.addEventListener('click', handleDocumentClick);
    }, 0);
  })
};