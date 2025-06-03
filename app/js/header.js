const header = document.querySelector('.header');

function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 50);
}

window.addEventListener('scroll', onScroll);
onScroll();