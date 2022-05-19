(function () {
  'use strict';

  $(document).ready(function () {
    if ($('.swiper').length) {
      const testimonialsSlider = new Swiper('.testimonials-slider .swiper', {
        slidesPerView: 1,
        spaceBetween: 20,

        navigation: {
          nextEl: '.testimonials-slider .slider-controls__btn.--next',
          prevEl: '.testimonials-slider .slider-controls__btn.--prev',
        },
        breakpoints: {
          768: {
            slidesPerView: 1.5,
          },
          1024: {
            slidesPerView: 2,
          },
          1440: {
            slidesPerView: 2.5,
            spaceBetween: 30,
          }
        }
      });
    }
  });
})();
