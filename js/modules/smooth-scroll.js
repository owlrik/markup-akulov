window.App = window.App || {};

((App, $) => {
  App.smoothScroll = {
    init() {
      const menuToggle = document.querySelector('.page-header__toggle');
      const links = document.querySelectorAll('.js-scroll-to');
      if (!links.length) {
        return;
      }

      links.forEach((link) => {
        link.addEventListener('click', (evt) => {
          const targetName = evt.currentTarget.href.split('#').slice(-1).pop();
          const targetElement = document.querySelector(`#${targetName}`);
          const offset = (targetElement.dataset.anchorOffset) ? +targetElement.dataset.anchorOffset : 50;
          if (menuToggle.classList.contains('--is-active')) {
            App.header.closeMenu();
          }

          $('html, body').animate({
            scrollTop: $(targetElement).offset().top - offset,
          }, 1000);
        });
      });
    }
  }
})(window.App, jQuery);
