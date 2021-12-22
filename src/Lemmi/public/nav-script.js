const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarLinks = document.getElementsByClassName('nav-item-container')[0]
const userButton = document.getElementById('user-link');
const logMenuRes = document.getElementById('log-menu-res');
const logMenuNor = document.getElementById('log-menu-nor');

toggleButton.addEventListener('click', () => {
  navbarLinks.classList.toggle('-active')
});

userButton.addEventListener('click', () => {
  if ($(document).width() < 768)
    logMenuRes.classList.toggle('-active');
  else
    logMenuNor.classList.toggle('-active');
});

document.body.addEventListener('click', (e) => {
  if (e.target !== userButton){
    logMenuNor.classList.remove('-active');
    logMenuRes.classList.remove('-active');
  }
});



