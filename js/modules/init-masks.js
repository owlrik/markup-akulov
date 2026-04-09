window.App = window.App || {};

((App, $) => {
  App.masks = {
    init() {
      $('.js-phone-mask').mask('+7 (999) 999-99-99');
    }
  }
})(window.App, jQuery);
