import MmenuLight from 'mmenu-light';

export default () => {
  // Build the MMenu Light Plugin
  var MMenuAPI = new MmenuLight(
    document.querySelector('#c2-mobile-menu-structure #mobile-nav'),
    'all'
  );
  var navigator = MMenuAPI.navigation({
    selected: 'cur'
  });
  var drawer = MMenuAPI.offcanvas({
    position: "left"
  });

  // Add Event Listener to Navbar Toggler
  document.querySelector(".navbar-toggler").addEventListener('click', function (event) {
    event.preventDefault();
    // Open MMenu
    drawer.open();
  });
};