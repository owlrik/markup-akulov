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

      const modalReviewTemplate = document.querySelector('#template-review')
        .content
        .querySelector('.modal-review');
      let modalReview = null;
      const reviewOpeners = document.querySelectorAll('[data-modal="review"]');
      let reviewClosers = null;

      const renderReview = (review) => {
        if (!review) {
          return;
        }

        const personName = review.querySelector('.card-review__person-name').textContent;
        const serviceTitle = review.querySelector('.card-review__service-title').textContent;
        const serviceDate = review.querySelector('.card-review__date').textContent;
        const serviceRating = review.querySelector('.card-review__rating').dataset.rating;
        const reviewImage = review.querySelector('.card-review__img-wrap img').getAttribute('src');
        const reviewText = review.querySelector('.card-review__text').textContent.trim();

        modalReview = modalReviewTemplate.cloneNode(true);

        modalReview.querySelector('.card-review__person-name').textContent = personName;
        modalReview.querySelector('.card-review__service-title').textContent = serviceTitle;
        modalReview.querySelector('.card-review__date').textContent = serviceDate;
        const ratingElements = modalReview.querySelectorAll('.star-rating__rate');
        for (let i = 0; i < serviceRating; i++) {
          ratingElements[i].classList.add('--is-active');
        }
        modalReview.querySelector('.card-review__img-wrap').href = reviewImage;
        modalReview.querySelector('.card-review__img-wrap img').src = reviewImage;
        modalReview.querySelector('.card-review__text').textContent = reviewText;

        body.append(modalReview);
      };

      const addReviewListeners = () => {
        App.fancybox.setup('.modal-review .fancybox');

        reviewClosers = modalReview.querySelectorAll('[data-close]');
        reviewClosers.forEach((closer) => {
          closer.addEventListener('click', (evt) => {
            evt.preventDefault();
            closeModal(modalReview);
          });
        });
      };

      reviewOpeners.forEach((opener) => {
        opener.addEventListener('click', (evt) => {
          evt.preventDefault();

          const currentReview = evt.currentTarget.closest('.card-review');
          renderReview(currentReview);
          addReviewListeners();

          openModal(modalReview);
        });
      });
    },

    openModal,
    closeModal,
  }
})(window.App);
