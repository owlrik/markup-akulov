window.App = window.App || {};

((App) => {
  App.aos = {
    init() {
      AOS.init({
        once: true,
      });
    }
  }
})(window.App);
