// кнопка наверх

$(window).on('scroll', trackScroll);
$('.upButton').on('click', backToTop);

function trackScroll() {
    let scrolled = window.pageYOffset;

    if (scrolled > 100) {
        $('.upButton').addClass('show');
        $('.header').addClass('scrolled');
    }
    if (scrolled < 100) {
        $('.upButton').removeClass('show');
        $('.header').removeClass('scrolled');
    }
}

function backToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
};