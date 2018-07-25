$(document).ready(function () {

    // Dropdowns
    var $dropdowns = $('.dropdown:not(.is-hoverable)');

    if ($dropdowns.length > 0) {
        $dropdowns.each(function () {
            $(this).on('click', function (event) {
                event.stopPropagation();
                $(this).toggleClass('is-active');
                //$(this).find('.fas').toggleClass('fa-angle-up'); //화살표 변경
            });
        });

        $(document).click(function (event) {
            closeDropdowns();
        });
    }

    function closeDropdowns() {
        $dropdowns.each(function () {
            $(this).removeClass('is-active');
            //$(this).find('.fas').removeClass('fa-angle-up'); //화살표 원복
        });
    }

    // Modals
    var rootEl = document.documentElement;
    var $modals = $('.modal');
    var $modalButtons = $('.modal-button');
    var $modalCloses = $('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button, .message-header .delete');

    if ($modalButtons.length > 0) {
        $modalButtons.each(function () {
            $(this).on('click', function (event) {
                var target = $(this).attr('data-target');
                console.log(target);
                openModal(target);
            });
        });
    }

    if ($modalCloses.length > 0) {
        $modalCloses.each(function () {
            $(this).on('click', function () {
                closeModals();
            });
        });
    }

    function openModal(target) {
        var $target = document.getElementById(target);
        rootEl.classList.add('is-clipped'); //딤효과
        $target.classList.add('is-active');
    }

    function closeModals() {
        rootEl.classList.remove('is-clipped');
        $modals.each(function () {
            $(this).removeClass('is-active');
        });
    }

    // navbar burger icon
    $(".navbar-burger").click(function () {

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");

    });

});