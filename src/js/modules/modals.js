window.App = window.App || {};

((App) => {
  const body = document.querySelector('body');

  function onEscPress (evt) {
    const isEscKey = evt.key === 'Escape' || evt.key === 'Esc';
    const activeModal = document.querySelector('.modal.--is-active');

    if (isEscKey && activeModal) {
      evt.preventDefault();
      closeModal(activeModal);
    }
  }

  function openModal (modal) {
    body.classList.add('no-scroll');
    modal.classList.add('--is-active');

    document.addEventListener('keydown', onEscPress);
  }

  function closeModal (modal) {
    body.classList.remove('no-scroll');
    modal.classList.remove('--is-active');

    document.removeEventListener('keydown', onEscPress);
  }

  App.modals = {
    init() {
      const setupModal = (modal, openers, closers) => {
        if (openers) {
          openers.forEach((opener) => {
            opener.addEventListener('click', (evt) => {
              evt.preventDefault();
              openModal(modal);
            });
          });
        }

        closers.forEach((closer) => {
          closer.addEventListener('click', (evt) => {
            evt.preventDefault();
            closeModal(modal);
          });
        });
      };

      const setupAppointmentModal = () => {
        const modalAppointment = document.querySelector('.modal-appointment');
        const appointmentOpeners = document.querySelectorAll('[data-modal="appointment"]');
        const appointmentClosers = modalAppointment.querySelectorAll('[data-close]');

        setupModal(modalAppointment, appointmentOpeners, appointmentClosers);
      };
      setupAppointmentModal();

      const setupSuccessModal = () => {
        const modalSuccess = document.querySelector('.modal-success');
        const successClosers = modalSuccess.querySelectorAll('[data-close]');

        setupModal(modalSuccess, null, successClosers);
      }
      setupSuccessModal();

      const modalTestimonialTemplate = document.querySelector('#template-testimonial')
        .content
        .querySelector('.modal-testimonial');
      let modalTestimonial = null;
      const testimonialOpeners = document.querySelectorAll('[data-modal="testimonial"]');
      let testimonialClosers = null;

      const renderTestimonial = (testimonial) => {
        if (!testimonial) {
          return;
        }

        const personName = testimonial.querySelector('.card-testimonial__person-name').textContent;
        const serviceTitle = testimonial.querySelector('.card-testimonial__service-title').textContent;
        const serviceDate = testimonial.querySelector('.card-testimonial__date').textContent;
        const serviceRating = testimonial.querySelector('.card-testimonial__rating').dataset.rating;
        const testimonialImage = testimonial.querySelector('.card-testimonial__img-wrap img').getAttribute('src');
        const testimonialText = testimonial.querySelector('.card-testimonial__text').textContent.trim();

        modalTestimonial = modalTestimonialTemplate.cloneNode(true);

        modalTestimonial.querySelector('.card-testimonial__person-name').textContent = personName;
        modalTestimonial.querySelector('.card-testimonial__service-title').textContent = serviceTitle;
        modalTestimonial.querySelector('.card-testimonial__date').textContent = serviceDate;
        const ratingElements = modalTestimonial.querySelectorAll('.star-rating__rate');
        for (let i = 0; i < serviceRating; i++) {
          ratingElements[i].classList.add('--is-active');
        }
        modalTestimonial.querySelector('.card-testimonial__img-wrap').href = testimonialImage;
        modalTestimonial.querySelector('.card-testimonial__img-wrap img').src = testimonialImage;
        modalTestimonial.querySelector('.card-testimonial__text').textContent = testimonialText;

        body.append(modalTestimonial);
      };

      const addTestimonialListeners = () => {
        App.fancybox.setup('.modal-testimonial .fancybox');

        testimonialClosers = modalTestimonial.querySelectorAll('[data-close]');
        testimonialClosers.forEach((closer) => {
          closer.addEventListener('click', (evt) => {
            evt.preventDefault();
            closeModal(modalTestimonial);
          });
        });
      };

      testimonialOpeners.forEach((opener) => {
        opener.addEventListener('click', (evt) => {
          evt.preventDefault();

          const currentTestimonial = evt.currentTarget.closest('.card-testimonial');
          renderTestimonial(currentTestimonial);
          addTestimonialListeners();

          openModal(modalTestimonial);
        });
      });
    },

    openModal,
    closeModal,
  }
})(window.App);
