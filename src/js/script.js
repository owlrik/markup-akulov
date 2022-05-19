(function () {
  'use strict';

  $(document).ready(function () {
    // Маска номера
    $('.js-phone-mask').mask('+7 (999) 999-99-99');

    // Fancybox
    $('.fancybox').fancybox();

    // Кнопка мобильного меню
    const menuToggle = $('.page-header__toggle');
    const breakpointMd = window.matchMedia('(max-width: 1023px)');

    const openMenu = () => {
      $(menuToggle).attr('ariaPressed', 'true');
      $(menuToggle).addClass('--is-active');
      $('body').css('overflow', 'hidden');
      $('.page').addClass('--show-menu');
    };

    const closeMenu = () => {
      $(menuToggle).attr('ariaPressed', 'false');
      $(menuToggle).removeClass('--is-active');
      $('body').css('overflow', '');
      $('.page').removeClass('--show-menu');
    };

    const toggleMenu = () => {
      if (menuToggle) {
        $(menuToggle).on('click', function () {
          if ($(menuToggle).attr('ariaPressed') === 'true') {
            closeMenu();
          }
          else {
            openMenu();
          }
        });
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

    toggleMenu();

    // Модальные окна
    const openModal = (modal) => {
      $(modal).addClass('--is-active');
      $('body').css('overflow', 'hidden');
    };

    const closeModal = (modal) => {
      $(modal).removeClass('--is-active');
      $('body').css('overflow', '');
    };

    const onEscPress = (evt, modal) => {
      const isEscKey = evt.key === 'Escape' || evt.key === 'Esc';

      if (isEscKey && $(modal).hasClass('--is-active')) {
        evt.preventDefault();
        closeModal(modal);
      }
    };

    const setModalListeners = (modal) => {
      // const overlay = $(modal).find('.modal__overlay')[0];
      const closeBtn = $(modal).find('.modal__close')[0];

      $(closeBtn).on('click', function () {
        closeModal(modal);
      });

      // overlay.addEventListener('click', () => {
      //   closeModal(modal);
      // });

      $(document).on('keydown', (evt) => {
        onEscPress(evt, modal);
      });
    };

    const setupModal = (modal, modalBtns, noPrevDefault) => {
      if (modalBtns) {
        $(modalBtns).each(function () {
          $(this).on('click', function (evt) {
            if (!noPrevDefault) {
              evt.preventDefault();
            }

            openModal(modal);
          });
        });
      }

      setModalListeners(modal);
    };

    const modalSearch = $('.modal-search');
    const modalSearchBtns = $('[data-modal="search"]');

    const modalCite = $('.modal-cite');
    const modalCiteBtns = $('[data-modal="cite"]');

    const initModals = () => {
      if (modalSearch && modalSearchBtns.length) {
        setupModal(modalSearch, modalSearchBtns, false);
      }

      if (modalCite && modalCiteBtns.length) {
        setupModal(modalCite, modalCiteBtns, false);
      }
    };

    initModals();
  });
})();
