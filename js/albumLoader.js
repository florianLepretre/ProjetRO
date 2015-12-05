
$(window).load(function (){

    var ils = new ILS(new HillClimberFI(3500));

    /********************************
     *          Album builder       *
     ********************************/

    var album = $('#album');
    var pageDOM = '<ul class="page"></ul>';

    var solution = new Solution();
    solution.setRandomSolution();

    var solution = ils.run(solution);

    $.each(solution.getSol(), function (index, value) {
        if (index % 6 == 0) {
            album.append(pageDOM);
        }
        $('ul.page:last-child')
            .append('<li class="photo"> <img src="img/' + photoData[value]["name"] + '"/> </li>');
    });

    $('#album').fadeIn();

    /********************************
     *     Slider initialization    *
     ********************************/

    var page = 0;
    var pages = $('ul.page');
    var bubbles = $('li.bubble');

    $(pages[0]).toggleClass('active');

    $(document).keydown(function (e) {
        if (e.which == 37) {
            page = (page != 0) ? page - 1 : 9;
        } else if (e.which == 39) {
            page = (page != 9) ? page + 1 : 0;
        }
        changePage(page);
    });

    bubbles.click(function () {
        page = $(this).index();
        changePage(page);
    });

    function changePage(page) {
        $('.active').toggleClass('active');
        $(bubbles[page]).toggleClass('active');
        $(pages[page]).toggleClass('active');
        album.css("marginLeft", (-740 * page) + 'px');
    }
});