(function () {
  'use strict';

  $(document).ready(function () {
    // Маска номера
    $('.js-phone-mask').mask('+7 (999) 999-99-99');

    // AOS
    AOS.init({
      once: true,
    });

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

    // Плавный скролл
    $('.js-scroll-to').on('click', function () {
      let target = $(this).attr('href');

      if ($(menuToggle).hasClass('--is-active')) {
        closeMenu();
      }

      $('html, body').animate({
        scrollTop: $(target).offset().top - 50
      }, 1000);

      return false;
    });

    // Отзывы
    const renderTestimonialModal = (trigger) => {
      const card = trigger.closest('.card-testimonial');
      const personName = $(card).find('.card-testimonial__person-name').text();
      const serviceTitle = $(card).find('.card-testimonial__service-title').text();
      const serviceDate = $(card).find('.card-testimonial__date').text();
      const serviceRating = $(card).find('.card-testimonial__rating').data('rating');
      const testimonialImage = $(card).find('.card-testimonial__img-wrap img').attr('src');
      const testimonialText = $(card).find('.card-testimonial__text').text().trim();

      const testimonialModalTemplate = $('#template-testimonial')[0];
      const testimonialModal = testimonialModalTemplate
        .content
        .querySelector('.modal-testimonial')
        .cloneNode(true);

      testimonialModal.querySelector('.card-testimonial__person-name').textContent = personName;
      testimonialModal.querySelector('.card-testimonial__service-title').textContent = serviceTitle;
      testimonialModal.querySelector('.card-testimonial__date').textContent = serviceDate;
      const ratingElements = testimonialModal.querySelectorAll('.star-rating__rate');
      for (let i = 0; i < serviceRating; i++) {
        ratingElements[i].classList.add('--is-active');
      }
      testimonialModal.querySelector('.card-testimonial__img-wrap img').src = testimonialImage;
      testimonialModal.querySelector('.card-testimonial__text').textContent = testimonialText;

      document.body.append(testimonialModal);

      return testimonialModal;
    };

    // Модальные окна
    const openModal = (modal, trigger, callback) => {
      if (callback) {
        modal = callback(trigger);
      }

      $(modal).addClass('--is-active');
      $('body').css('overflow', 'hidden');
    };

    const closeModal = (modal, callback) => {
      $(modal).removeClass('--is-active');
      $('body').css('overflow', '');

      if (callback) {
        callback();
      }
    };

    const onEscPress = (evt, modal, callback) => {
      const isEscKey = evt.key === 'Escape' || evt.key === 'Esc';

      if (isEscKey && $(modal).hasClass('--is-active')) {
        evt.preventDefault();
        closeModal(modal, callback);
      }
    };

    const setModalListeners = (modal, closeCallback) => {
      const overlay = $(modal).find('.modal__overlay')[0];
      const closeBtn = $(modal).find('.modal__close')[0];

      $(closeBtn).on('click', function () {
        closeModal(modal, closeCallback);
      });

      overlay.addEventListener('click', () => {
        closeModal(modal, closeCallback);
      });

      $(document).on('keydown', (evt) => {
        onEscPress(evt, modal, closeCallback);
      });
    };

    const setupModal = (modal, modalBtns, noPrevDefault, openCallback, closeCallback) => {
      if (modalBtns) {
        $(modalBtns).each(function () {
          $(this).on('click', function (evt) {
            if (!noPrevDefault) {
              evt.preventDefault();
            }

            const trigger = $(this);

            openModal(modal, trigger, openCallback);
          });
        });
      }

      setModalListeners(modal, closeCallback);
    };

    const modalAppointment = $('.modal-appointment');
    const modalAppointmentBtns = $('[data-modal="appointment"]');
    const modalTestimonial = $($('#template-testimonial').html());
    const modalTestimonialBtns = $('[data-modal="testimonial"]');

    const modalSuccess = $('.modal-success');

    const initModals = () => {
      if (modalSuccess) {
        setupModal(modalSuccess, null, false);
      }

      if (modalAppointment && modalAppointmentBtns.length) {
        setupModal(modalAppointment, modalAppointmentBtns, false);
      }

      if (modalTestimonial && modalTestimonialBtns.length) {
        setupModal(modalTestimonial, modalTestimonialBtns, false, renderTestimonialModal);
      }
    };

    initModals();

    const formSubmit = function (form) {
      let data = $(form).serialize();
      $.ajax({
        type: 'POST',
        url: './forms.php',
        dataType: 'json',
        data: data,
        beforeSend: function(data) {
          $(form).find('input[type="submit"]').attr('disabled', 'disabled');
        },
        success: function(data) {
          closeModal($(form)[0].closest('.modal'));
          $('.modal-success').addClass('--is-active');
          $('body').css('overflow', 'hidden');
          $(form).trigger('reset');
        },
        error: function (xhr, ajaxOptions, thrownError) {
          console.log(xhr.status);
          console.log(thrownError);
        },
        complete: function(data) {
          $(form).find('input[type="submit"]').prop('disabled', false);
        }
      });
    };

    $(".form").on('submit', function(evt) {
      evt.preventDefault();
      formSubmit(this);
    });
  });
})();
