const createPostButton = document.getElementById('create-post');
const closeFormButton = document.getElementById('close-form');
// const submitFormButton = document.getElementById('submit-form');
const returnFormButton = document.getElementById('return-form');
const confirmedSubmit = document.getElementById('confirm-submit-form')


$('.ui.dropdown')
  .dropdown()
;

closeFormButton.addEventListener('click', () => {
    $('.ui.modal').modal('hide');
})

createPostButton.addEventListener('click', () => {

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

// submitFormButton.addEventListener('click', () => {
//     const title = document.getElementById('title');
//     const district = document.getElementById('select-district');
//     const desc = document.getElementById('description');
//     const tagVal = $('#multi-select-tags').dropdown('get value');
//     const cateVal = $('#multi-select-category').dropdown('get value');
//     // const data = {
//     //     title: title.value,
//     //     district: district.value,

//     // }
    
// })