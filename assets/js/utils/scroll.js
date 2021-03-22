$(document).ready(function() {

    let doc = document.documentElement;
    let w = window;

    let prevScroll = w.scrollY || doc.scrollTop;
    let curScroll;
    let direction = 0;
    let prevDirection = 0;

    /* Find the navbar and the height of the navbar */
    let header = document.getElementById("nav-container");
    let headerHeight = header.clientHeight;

    let checkScroll = function() {

        /*
         ** Find the direction of scroll
         ** 0 - initial, 1 - up, 2 - down
         */
        curScroll = w.scrollY || doc.scrollTop;
        if (curScroll > prevScroll) {
            //scrolled down
            direction = 2;
        } else if (curScroll < prevScroll) {
            //scrolled up
            direction = 1;
        }

        if (direction !== prevDirection) {
            toggleHeader(direction, curScroll);
        }

        prevScroll = curScroll;
    };

    /* Use the height of the navbar to movify the top property to hide the navbar */
    let toggleHeader = function(direction, curScroll) {
        if (direction === 2 && curScroll > headerHeight) {
            header.style.top = "-" + headerHeight + "px";
            prevDirection = direction;
        } else if (direction === 1) {
            header.style.top = "0px";
            prevDirection = direction;
        }
    };

    window.addEventListener("scroll", checkScroll);

});