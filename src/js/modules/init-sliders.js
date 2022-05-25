window.App = window.App || {};

((App) => {
  App.sliders = {
    init() {
      const initSlider = (slider, options) => {
        if (!slider) {
          return;
        }

        return new Swiper(slider, options);
      };

      const initSliders = (sliders, options) => {
        if (!sliders.length) {
          return;
        }

        sliders.forEach((slider) => {
          initSlider(slider, options);
        });
      };

      const initSliderOnBreakpoint = (slider, sliderOptions, mediaQuery) => {
        if (!slider) {
          return;
        }

        let swiperSlider;
        const breakpoint = window.matchMedia(mediaQuery);
        const checkBreakpoint = () => {
          if (breakpoint.matches) {
            swiperSlider = initSlider(slider, sliderOptions);
          } else {
            if (swiperSlider) {
              swiperSlider.destroy(true, true);
            }
          }
        };
        checkBreakpoint();

        try {
          breakpoint.addEventListener('change', checkBreakpoint);
        } catch (e1) {
          try {
            // Safari < 15
            breakpoint.addListener(checkBreakpoint);
          } catch (e2) {
            console.error(e2);
          }
        }
      };

      const initTestimonialSlider = () => {
        const slider = document.querySelector('.testimonials-slider .swiper');
        const options = {
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
            },
          },
        };

        initSlider(slider, options);
      };
      initTestimonialSlider();
    }
  };
})(window.App);
