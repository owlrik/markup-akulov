window.App = window.App || {};

((App) => {
  const page = document.querySelector('.page');
  const body = document.querySelector('body');
  const header = document.querySelector('.page-header');
  const menuToggle = header.querySelector('.page-header__toggle');
  const breakpointMd = window.matchMedia('(max-width: 1023px)');

  const openMenu = () => {
    menuToggle.ariaPressed = 'true';
    menuToggle.classList.add('--is-active');
    body.classList.add('no-scroll');
    page.classList.add('--show-menu');
  };

  const closeMenu = () => {
    menuToggle.ariaPressed = 'false';
    menuToggle.classList.remove('--is-active');
    body.classList.remove('no-scroll');
    page.classList.remove('--show-menu');
  };

  const toggleMenu = () => {
    if (menuToggle.ariaPressed === 'true') {
      closeMenu();
    } else {
      openMenu();
    }

    try {
      breakpointMd.addEventListener('change', closeMenu);
    } catch (e1) {
      try {
        // Safari < 15
        breakpointMd.addListener(closeMenu);
      } catch (e2) {
        console.error(e2);
      }
    }
  };

  App.header = {
    init() {
      menuToggle.addEventListener('click', (evt) => {
        evt.preventDefault();
        toggleMenu();
      });
    },

    openMenu,
    closeMenu,
    toggleMenu,
  }
})(window.App);
