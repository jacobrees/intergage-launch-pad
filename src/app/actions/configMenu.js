import MmenuLight from 'mmenu-light';

const bsGridBreakpoints = {
  'xs': '0',
  'sm': '576px',
  'md': '768px',
  'lg': '992px',
  'xl': '1200px',
  'xxl': '1400px'
}

export default () => {
  let narBars = Array.prototype.slice.call(document.querySelectorAll(".navbar"));
  narBars.forEach(function(navBar) {
    if(!navBar.dataset.navbarExpand
      || navBar.dataset.toggle != 'standard') {
      // Don't Build the Menu, it's not from the Templated Page Item
      // Must be a custom menu somewhere else on the page
      // Or if the Menu is not in Standard Mode
      return;
    }

    // Find the BreakPoint for the Menu
    var breakpoint = navBar.dataset.navbarExpand.replace("navbar-expand-", "");

    if(!bsGridBreakpoints[breakpoint]) return;

    // Build the MMenu Light Plugin
    var MMenuAPI = new MmenuLight(
      navBar.querySelector('#navbarNavDropdown .navbar-nav'),
      (bsGridBreakpoints[breakpoint] != '0') ? '(max-width: ' + bsGridBreakpoints[breakpoint] + ')' : 'all'
    );
    var navigator = MMenuAPI.navigation({
      selected: 'cur'
    });
    var drawer = MMenuAPI.offcanvas({
      position: "right"
    });

    // Add Click Handle to Mav bar Toggler
    navBar.querySelector(".navbar-toggler").addEventListener('click', function (event) {
      event.preventDefault();
      // Open MMenu
      drawer.open();
    });
  });
};