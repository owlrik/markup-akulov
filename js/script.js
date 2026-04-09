window.App = window.App || {};

((App) => {
  window.addEventListener('DOMContentLoaded', () => {
    App.header.init();
    App.smoothScroll.init();

    window.addEventListener('load', () => {
      App.aos.init();
      App.masks.init();
      App.fancybox.init();
      App.forms.init();
      App.sliders.init();
      App.modals.init();
      App.tabs.init();
    });
  });
})(window.App);
