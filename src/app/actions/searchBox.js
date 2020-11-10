export default () => {
  let searchBox = document.querySelector('.c2-header .searchBoxForm');
  if(!searchBox) { return }

  searchBox.classList.add('d-flex', 'bg-white', 'border');

  // Make Label the Placeholder text
  let serachInput = searchBox.querySelector('.searchBoxInput'),
    label = searchBox.querySelector('.searchBoxLabel');
  serachInput.placeholder = label.innerHTML;
  serachInput.classList.add('h-100', 'border-0', 'pl-3', 'py-3');

  label.classList.add('d-none');

  // Make Button a Search Icon
  let searchBtn = searchBox.querySelector('.c2btnsearch');
  searchBtn.innerHTML = `<i class="fas fa-search fa-lg"></i>`;
  searchBtn.className = "btn btn-link h-100";
};