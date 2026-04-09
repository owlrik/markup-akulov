window.App = window.App || {};

(function (App) {
  App.tabs = {
    init() {
      const tabComponents = document.querySelectorAll('.tabs');
      if (!tabComponents) {
        return;
      }

      tabComponents.forEach((tabComponent) => {
        const tabLinks = tabComponent.querySelectorAll('.tabs__link');
        const tabPanels = tabComponent.querySelectorAll('.tabs__content-item');

        const clearTabLinksActiveClass = () => {
          tabLinks.forEach((tabLink) => {
            tabLink.classList.remove('--is-active');
          });
        };

        const clearTabPanelsActiveClass = () => {
          tabPanels.forEach((tabPanel) => {
            tabPanel.classList.remove('--is-active');
          });
        };

        tabLinks.forEach((tabLink) => {
          tabLink.addEventListener('click', (evt) => {
            evt.preventDefault();
            clearTabLinksActiveClass();
            clearTabPanelsActiveClass();

            tabLink.classList.add('--is-active');
            const linkedPanel = tabComponent.querySelector('.tabs__content-item#' + tabLink.href.split('#').slice(-1).pop());
            linkedPanel.classList.add('--is-active');
          })
        })
      });
    }
  }
})(window.App);
