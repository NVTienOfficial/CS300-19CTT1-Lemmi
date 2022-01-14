const imagesContainer = document.getElementsByClassName('ui small images')[0];
const postImages = imagesContainer.getElementsByClassName('ui image');

for (let el of postImages) {
    el.addEventListener('click', () => {
        let okay = true;
        for (const other of postImages) {
            if (other !== el && other.classList.contains('enlarge'))
                okay = false;
        }
        if (okay)
            el.classList.toggle('enlarge');
    })
}

$('#post-manipulate')
  .dropdown()
;

async function deleteVote (){
    try {
        const response = await fetch('http://localhost:8080/vote', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json' 
                },
            body: JSON.stringify({
                user_id: userid,
                post_id: postid
            })
        })
            console.log(response);
        } catch (err) {
            console.log(err)
        }
}

async function processVoteLogic(clicked, other, target, otherTarget) {
            if (clicked.classList.contains('color-voted')) {
                target.innerHTML = parseInt(target.innerHTML) - 1;
                deleteVote()
                clicked.classList.remove('color-voted');
            }
            else {
                clicked.classList.add('color-voted');
                target.innerHTML = parseInt(target.innerHTML) + 1;
                deleteVote()
                let type;
                if (clicked.classList.contains('fa-arrow-up'))
                    type = "true";
                else
                    type = "false";

                try {
                    const response = await fetch('http://localhost:8080/vote', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            user_id: userid,
                            post_id: postid,
                            type: type
                        })
                    })
                    console.log(response);
                } catch (err) {
                    console.log(err);
                }
            }
            if (other.classList.contains('color-voted')) {
                otherTarget.innerHTML = parseInt(otherTarget.innerHTML) - 1;
                other.classList.remove('color-voted');
            }
            
}

const voteTotal = document.getElementsByClassName('-vote -total');
const upVoteTotal = document.getElementById('up-vote-total');
const downVoteTotal = document.getElementById('down-vote-total');
const userid = document.getElementById('user-id').value;
const postid = document.getElementById('post-id').value;
if (userid !== null && userid !== undefined && userid.length){
    for (let el of voteTotal) {
        el.addEventListener('click', (event) => {
            if (userid) {
                if (event.target === voteTotal[0]) {
                    processVoteLogic(voteTotal[0], voteTotal[1], upVoteTotal, downVoteTotal);
                } else {
                    processVoteLogic(voteTotal[1], voteTotal[0], downVoteTotal, upVoteTotal);
            }
            }
        })
    }
}


const deleteButton = document.getElementById('post-delete');
const editButton = document.getElementById('post-edit');

deleteButton.addEventListener('click', () => {
    $('.ui.basic.modal.delete-post')
  .modal('show')
;
})

const closeFormButton = document.getElementById('close-form');
const submitFormButton = document.getElementById('submit-form');
const returnFormButton = document.getElementById('return-form');
const confirmedSubmit = document.getElementById('continue-form');
const finalSubmit = document.getElementById('confirm-submit-form');

finalSubmit.style.display = 'none';


closeFormButton.addEventListener('click', () => {
    $('.ui.modal').modal('hide');
})

editButton.addEventListener('click', () => {

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

    $('#select-star')
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