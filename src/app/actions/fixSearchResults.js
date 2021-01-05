export default () => {
  let searchResultsForms = [].slice.call(document.querySelectorAll('.sssearchform'));
  searchResultsForms.forEach(searchResultsForms => {
    let searchBox = searchResultsForms.querySelector('input'),
        searchSelect = searchResultsForms.querySelector('select');

    if(searchBox) searchBox.classList.add('form-control');
    if(searchSelect) searchSelect.classList.add('form-select');
  });
};