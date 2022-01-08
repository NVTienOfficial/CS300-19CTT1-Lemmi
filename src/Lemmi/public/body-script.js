const createPostButton = document.getElementById('create-post');
const closeFormButton = document.getElementById('close-form');
const submitFormButton = document.getElementById('submit-form');
const returnFormButton = document.getElementById('return-form');
const confirmedSubmit = document.getElementById('continue-form');
const finalSubmit = document.getElementById('confirm-submit-form');

finalSubmit.style.display = 'none';

$('.ui.dropdown')
  .dropdown()
;

closeFormButton.addEventListener('click', () => {
    $('.ui.modal').modal('hide');
})

createPostButton.addEventListener('click', () => {

    submitFormButton.style.display = 'inline-block';
    finalSubmit.style.display = 'none';

    $('.coupled.modal')
        .modal({
        allowMultiple: false
    });
// attach events to buttons
    $('.second.modal')
        .modal('setting', 'closable', false)
        .modal('attach events', '.first.modal #submit-form');

    $('.ui.first.modal')
        .modal('setting', 'closable', false)
        .modal('show');

    $('#select-district')
        .dropdown();

    $('#multi-select-tags')
        .dropdown();

    $('#multi-select-category')
        .dropdown();
    
})

returnFormButton.addEventListener('click', () => {
    
    $('.second.modal')
        .modal('toggle');
    $('.ui.first.modal')
        .modal('show');
})

confirmedSubmit.addEventListener('click', () => {

    finalSubmit.style.display = 'inline-block';
    submitFormButton.style.display = 'none';
    $('.second.modal')
        .modal('toggle');
    $('.ui.first.modal')
        .modal('show');
})