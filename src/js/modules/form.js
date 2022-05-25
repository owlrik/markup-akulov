window.App = window.App || {};

((App, $) => {
  App.forms = {
    init() {
      const forms = document.querySelectorAll('.form');
      const modalSuccess = document.querySelector('.modal-success');

      if (!forms.length) {
        return;
      }

      const sendForm = (form) => {
        App.modals.openModal(modalSuccess);

        // let data = $(form).serialize();
        // $.ajax({
        //   type: 'POST',
        //   url: './forms.php',
        //   dataType: 'json',
        //   data: data,
        //   beforeSend: function (data) {
        //     $(form).find('input[type="submit"]').attr('disabled', 'disabled');
        //   },
        //   success: function (data) {
        //     App.modals.closeModal(form.closest('.modal'));
        //     App.modals.openModal(modalSuccess);
        //     $(form).trigger('reset');
        //   },
        //   error: function (xhr, ajaxOptions, thrownError) {
        //     console.log(xhr.status);
        //     console.log(thrownError);
        //   },
        //   complete: function (data) {
        //     $(form).find('input[type="submit"]').prop('disabled', false);
        //   }
        // });
      };

      forms.forEach((form) => {
        form.addEventListener('submit', (evt) => {
          evt.preventDefault();
          sendForm(evt.currentTarget);
        })
      });
    },
  }
})(window.App, jQuery);
