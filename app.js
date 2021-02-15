/* Search Elements */
const triggerSearchOpen = document.getElementById("trigger-search-open");
const triggerSearchClose = document.getElementById("trigger-search-close");
const searchContainer = document.querySelector(".header__search");

/* Cart Elements */
const triggerCartOpen = document.getElementById("trigger-cart-open");
const triggerCartClose = document.getElementById("trigger-cart-close");
const cartContainer = document.querySelector(".cart");

/* Main Navigation */
const triggerMainNavOpen = document.getElementById("trigger-menu-open");
const triggerMainNavClose = document.getElementById("trigger-menu-close");
const mainNavContainer = document.querySelector(".main-nav");

/* Accordion */
const accordionLevelOneHeadings = Array.from(document.querySelectorAll(".accordion__item-level-1-heading"));
const accordionLevelTwoHeadings = Array.from(document.querySelectorAll(".accordion__item-level-2-heading"));

/* Footer Summaries */
const summaryDetails = Array.from(document.querySelectorAll(".footer__summaries-details-summary"));

/* Showcase Elements */
const showcaseList = document.querySelector(".showcase__list");
const showcaseArrowLeft = document.getElementById("showcase-arrow-left");
const showcaseArrowRight = document.getElementById("showcase-arrow-right");
const showcaseIndicators = Array.from(document.querySelectorAll(".showcase__nav-item"));
const numOfPics = document.querySelectorAll(".showcase__list-item").length;

/* Script Variables */
const breakPoint = 1024;
let showcaseIndex;
let browserWidth;
checkAppereance();
setEventListeners();

/* Functions */
function hide(element) {
    element.classList.add("visually-hidden");
}

function show(element) {
    element.classList.remove("visually-hidden");
}

function disableMainPageScroll() {
    document.body.classList.add("modal-open");
}

function enableMainPageScroll() {
    document.body.classList.remove("modal-open");
}

function handleShowcaseArrowRight() {
    if (showcaseIndex < numOfPics - 1) {
        showcaseIndex++;
        showcaseList.style.transform = `translateX(-${showcaseIndex * browserWidth}px)`;
        showcaseIndicators[showcaseIndex - 1].classList.remove("active");
        showcaseIndicators[showcaseIndex].classList.add("active");
    }
}

function handleShowcaseArrowLeft() {
    if (showcaseIndex > 0) {
        showcaseIndex--;
        showcaseList.style.transform = `translateX(-${showcaseIndex * browserWidth}px)`;
        showcaseIndicators[showcaseIndex + 1].classList.remove("active");
        showcaseIndicators[showcaseIndex].classList.add("active");
    }
}

function handleFooterSummaryClick(summary, e) {
    if (summary.contains(e.target)) {
        const icon = summary.getElementsByTagName("i")[0];
        if (icon.classList.contains("icon-chevron-down")) {
            icon.classList.remove("icon-chevron-down");
            icon.classList.add("icon-chevron-up");
        } else {
            icon.classList.remove("icon-chevron-up");
            icon.classList.add("icon-chevron-down");
        }
    }
}

function updateSummariesAppereance() {
    if (window.innerWidth >= breakPoint) {
        summaryDetails.forEach((summary) => {
            summary.parentElement.setAttribute("open", true);
            summary.classList.add("details-disabled-on-large");
            summary.addEventListener("click", (e) => e.target);
        });
    } else {
        summaryDetails.forEach((summary) => {
            summary.parentElement.removeAttribute("open");
            summary.getElementsByTagName("i")[0].classList.remove("icon-chevron-up");
            summary.getElementsByTagName("i")[0].classList.add("icon-chevron-down");
            summary.classList.remove("details-disabled-on-large");
            summary.removeEventListener("click", (e) => e.target);
        });
    }
}

function resetAllPageValues() {
    browserWidth = document.body.clientWidth;
    showcaseIndex = 0;
    showcaseList.style.transform = `translateX(0)`;
    showcaseIndicators.forEach((indicator) => {
        indicator.classList.remove("active");
    });
    showcaseIndicators[0].classList.add("active");
}

function checkAppereance() {
    resetAllPageValues();
    updateSummariesAppereance();
}

function setEventListeners() {
    window.addEventListener("resize", checkAppereance);

    showcaseArrowRight.addEventListener("click", handleShowcaseArrowRight);
    showcaseArrowLeft.addEventListener("click", handleShowcaseArrowLeft);

    triggerSearchOpen.addEventListener("click", () => show(searchContainer));
    triggerSearchClose.addEventListener("click", () => hide(searchContainer));

    triggerCartOpen.addEventListener("click", () => {
        show(cartContainer);
        disableMainPageScroll();
    });
    triggerCartClose.addEventListener("click", () => {
        hide(cartContainer);
        enableMainPageScroll();
    });

    triggerMainNavOpen.addEventListener("click", () => {
        show(mainNavContainer);
        disableMainPageScroll();
    });
    triggerMainNavClose.addEventListener("click", () => {
        hide(mainNavContainer);
        enableMainPageScroll();
    });

    summaryDetails.forEach((summary) => {
        summary.addEventListener("click", (e) => handleFooterSummaryClick(summary, e));
    });

    accordionLevelOneHeadings.forEach((acc) => {
        acc.addEventListener("click", (e) => {
            if (acc.contains(e.target) && !acc.classList.contains("active")) {
                acc.classList.add("active");
                show(acc.parentElement.querySelector(".accordion__item-level-1-content"));
            } else if (acc.contains(e.target) && acc.classList.contains("active")) {
                acc.classList.remove("active");
                hide(acc.parentElement.querySelector(".accordion__item-level-1-content"));
            }
        });
    });

    accordionLevelTwoHeadings.forEach((acc) => {
        acc.addEventListener("click", (e) => {
            if (acc.contains(e.target) && !acc.classList.contains("active")) {
                acc.classList.add("active");
                show(acc.parentElement.querySelector(".accordion__item-level-2-content"));
            } else if (acc.contains(e.target) && acc.classList.contains("active")) {
                acc.classList.remove("active");
                hide(acc.parentElement.querySelector(".accordion__item-level-2-content"));
            }
        });
    });
}
