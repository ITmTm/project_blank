// табы для таблиц
let tableBtn = $(".start-instruments__btn");
let tableTable = $(".start-instruments__table");
let tableShow = $(".start-instruments__show");
let tableHide = $(".start-instruments__hide");
let tableTr = $(".start-instruments__table tr");

tableHide.css('display', 'none');

for (let i = 0; i < tableBtn.length; i++) {
    tableBtn.eq(i).on("click", () => {
        for (let n = 0; n < tableBtn.length; n++) {
            tableBtn.eq(n).removeClass("active");
            tableTable.eq(n).removeClass("active");
        };

        tableBtn.eq(i).addClass("active");
        tableTable.eq(i).addClass("active");
        hideTr();
    });
};

function showTr() {
    tableTr.addClass('active');
    tableShow.css('display', 'none');
    tableHide.css('display', 'flex');
}

function hideTr() {
    tableTr.removeClass('active');
    tableHide.css('display', 'none');
    tableShow.css('display', 'flex');

    $("body, html").animate({
        scrollTop: $('.start-instruments').offset().top
    }, 600);
}

tableShow.on('click', showTr);
tableHide.on('click', hideTr);
