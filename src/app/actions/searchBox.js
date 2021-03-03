export default () => {
  let searchBox = document.querySelector('.c2-header .searchBoxForm');
  if(!searchBox) { return }

  searchBox.classList.add('d-flex', 'bg-white', 'border');
  searchBox.querySelector('.SearchBox').classList.add('w-100');

  // Make Label the Placeholder text
  let serachInput = searchBox.querySelector('.searchBoxInput'),
    label = searchBox.querySelector('.searchBoxLabel');
  serachInput.placeholder = label.innerHTML;
  serachInput.size = '50';
  serachInput.classList.add('h-100', 'border-0', 'pl-3', 'py-3', 'w-100');

  label.classList.add('d-none');

  // Make Button a Search Icon
  let searchBtn = searchBox.querySelector('.c2btnsearch');
  searchBtn.innerHTML = `<i class="fas fa-search fa-lg"></i>`;
  searchBtn.className = "btn btn-link h-100";

  // On Mobile the Search Box is in a Side Bar, clone the search box
  let searchBoxSideBar = document.querySelector('#c2-search-box-side-bar .c2-side-bar__content');
  if(searchBoxSideBar) {
    let cloneSearchBox = searchBox.cloneNode(true); // Deep Clone
    searchBoxSideBar.appendChild(cloneSearchBox);
  }
};