// старая версия аккордеона

// $(document).ready(function () {
//     $('.faq__list > li > .answer').hide();

//     $('.faq__list > li').click(function () {
//         if ($(this).hasClass("active")) {
//             $(this).removeClass("active").find(".answer").slideUp();
//         } else {
//             $(".faq__list > li.active .answer").slideUp();
//             $(".faq__list > li.active").removeClass("active");
//             $(this).addClass("active").find(".answer").slideDown();
//         }
//         return false;
//     });
// });

// новая версия аккордеона
$(document).ready(function () {
    $('.partner-tags__list > li').click(function (e) {
        $(".partner-tags__list > li").not($(this)).removeClass("active").find(".answer").slideUp();
        $(this).toggleClass("active").find(".answer").slideToggle();
    });
});