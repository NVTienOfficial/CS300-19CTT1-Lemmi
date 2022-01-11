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

async function processVoteLogic(clicked, other, target, otherTarget) {
            if (clicked.classList.contains('color-voted')) {
                target.innerHTML = parseInt(target.innerHTML) - 1;
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
                clicked.classList.remove('color-voted');
            }
            else {
                clicked.classList.add('color-voted');
                target.innerHTML = parseInt(target.innerHTML) + 1;
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

deleteButton.addEventListener('click', () => {
    $('.ui.basic.modal.delete-post')
  .modal('show')
;
})
