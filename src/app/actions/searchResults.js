export default () => {
  let searchResults = document.querySelector('.c2-site-search');
  if(!searchResults) { return }

  let inputs = searchResults.querySelectorAll('input[type="text"]'),
      selects = searchResults.querySelectorAll('select'),
      title = searchResults.querySelector('.slitext');

  inputs.forEach(input => {
    input.classList.add('form-control', 'my-2');
  });

  selects.forEach(select => {
    select.classList.add('form-select', 'mt-2');
  });

  if(title) {
    title.classList.add('h3', 'mb-2');
  }
};