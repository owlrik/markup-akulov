window.App = window.App || {};

((App, $) => {
  const setup = (selector) => {
    $(selector).fancybox();
  };

  App.fancybox = {
    init() {
      setup('.fancybox');
    },

    setup,
  }
})(window.App, jQuery);
