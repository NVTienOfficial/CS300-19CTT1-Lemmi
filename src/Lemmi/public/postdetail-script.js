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