export default () => {
  let searchResultsForms = [].slice.call(document.querySelectorAll('.sssearchform'));
  searchResultsForms.forEach(searchResultsForms => {
    let searchBox = searchResultsForms.querySelector('input'),
        searchSelect = searchResultsForms.querySelector('select');

    if(searchBox) searchBox.classList.add('form-control', 'mb-2', 'mt-1');
    if(searchSelect) searchSelect.classList.add('form-select', 'mb-2');
  });
};