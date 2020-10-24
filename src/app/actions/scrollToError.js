export default () => {
  var errorInput = document.querySelector('.c2form_flderror_input input');
  if(!errorInput) return;
  // If there's one on the page, scroll its form into view
  //errorInput.form.scrollIntoView({behavior: "smooth"});
  // Then scroll the Page by half (if we can)
  window.scroll({
    top: errorInput.form.offsetTop - window.innerHeight / 2 + errorInput.form.clientHeight / 2,
    left: 0,
    behavior: 'smooth'
  });
};