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
          let target = evt.currentTarget.href.split('#').slice(-1).pop();
          if (menuToggle.classList.contains('--is-active')) {
            App.header.closeMenu();
          }

          $('html, body').animate({
            scrollTop: $(`#${target}`).offset().top - 50,
          }, 1000);
        });
      });
    }
  }
})(window.App, jQuery);
