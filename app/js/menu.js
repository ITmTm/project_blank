// мобильное меню

let menuItem = $('.header .menu > .menu-item');
let subMenu = $('.header .menu > .menu-item .sub-menu');
let burger = $('.header__burger'); // кнопка открытия мобильного меню
let headerMenu = $('.header .menu'); // меню хедера
let headerBox = $('.header'); // блок внутри контейнера хедера, например если он в виде острова и при выпадении мобильного меню, нужно его дополнительно стилизовать

menuItem.removeClass('active');
// subMenu.removeClass('active').slideUp();
burger.removeClass('active');
headerMenu.removeClass('active');
headerBox.removeClass('active');

navMenu();

function navMenu() {
    if ($(window).width() <= 1200) {

        burger.on('click', function () {
            console.log('click on burger');
            burger.toggleClass('active');
            headerBox.toggleClass('active');
            headerMenu.toggleClass('active');

            subMenu.removeClass('active').slideUp();
            menuItem.removeClass('active');
        })

        $('.upButton').on('click', function () {
            burger.removeClass('active');
            headerBox.removeClass('active');
            headerMenu.removeClass('active');

            subMenu.removeClass('active').slideUp();
            menuItem.removeClass('active');
        });

        for (let click = 0; click < menuItem.length; click++) {
            menuItem.eq(click).on('click', function () {
                if (menuItem.eq(click).hasClass('active')) {
                    menuItem.eq(click).removeClass('active');
                    subMenu.eq(click).removeClass('active').slideUp();
                } else {
                    for (let other = 0; other < menuItem.length; other++) {
                        if (menuItem.eq(other) != menuItem.eq(click)) {
                            subMenu.eq(other).removeClass('active').slideUp();
                            menuItem.removeClass('active');
                        }
                    }

                    subMenu.eq(click).addClass('active').slideDown();
                    menuItem.eq(click).addClass('active');
                }
            })
        }
    } else {
        // for (let hover = 0; hover < menuItem.length; hover++) {
        //     menuItem.eq(hover).on('mouseenter', function () {
        //
        //         if (!menuItem.eq(hover).hasClass('active')) {
        //             for (let other = 0; other < menuItem.length; other++) {
        //                 if (menuItem.eq(other) != menuItem.eq(hover)) {
        //                     subMenu.eq(other).removeClass('active').slideUp();
        //                     menuItem.eq(other).removeClass('active');
        //                 }
        //             }
        //
        //             subMenu.eq(hover).addClass('active').slideDown();
        //             menuItem.eq(hover).addClass('active');
        //         }
        //     })
        //
        //     subMenu.eq(hover).on('mouseleave', function () {
        //         subMenu.eq(hover).removeClass('active').slideUp();
        //         menuItem.eq(hover).removeClass('active');
        //     })
        // }
    }
}