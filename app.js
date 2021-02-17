/* Search Elements */
const triggerSearchOpen = document.getElementById("trigger-search-open");
const triggerSearchClose = document.getElementById("trigger-search-close");
const searchContainer = document.querySelector(".search");

/* Cart Elements */
const triggerCartOpen = document.getElementById("trigger-cart-open");
const triggerCartClose = document.getElementById("trigger-cart-close");
const cartContainer = document.querySelector(".cart");

/* Main Navigation */
const triggerNavigationOpen = document.getElementById("trigger-menu-open");
const triggerNavigationClose = document.getElementById("trigger-menu-close");
const navigationContainer = document.querySelector(".navigation");

/* Accordion */
const accordionHeadings = Array.from(document.querySelectorAll(".accordion-heading"));

/* Showcase Elements */
const showcaseList = document.querySelector(".showcase__items");
const showcaseArrowLeft = document.getElementById("showcase-arrow-left");
const showcaseArrowRight = document.getElementById("showcase-arrow-right");
const showcaseIndicators = Array.from(document.querySelectorAll(".showcase__indicator-item"));

/* Footer */
const footerDetails = Array.from(document.querySelectorAll(".footer__details"));

/* Script Variables */
const mediaQuery = window.matchMedia("(min-width: 1024px)");
const breakPoint = 1024;
const numOfPics = showcaseList.querySelectorAll(".showcase__item").length;
let showcaseIndex;
let browserWidth;
handleWidescreenChange(mediaQuery);
checkShowcaseAppereance();
setEventListeners();

/* Functions */
function activate(element) {
    element.classList.add("active");
}

function deactivate(element) {
    element.classList.remove("active");
}

function show(element) {
    element.classList.add("visible");
}

function hide(element) {
    element.classList.remove("visible");
}

function disableBodyScroll() {
    document.body.classList.add("no-scroll");
}

function enableBodyScroll() {
    document.body.classList.remove("no-scroll");
}

function preventer(event) {
    event.preventDefault();
}

function handleShowcaseArrowRight() {
    if (showcaseIndex < numOfPics - 1) {
        showcaseIndex++;
        showcaseList.style.transform = `translateX(-${showcaseIndex * browserWidth}px)`;
        deactivate(showcaseIndicators[showcaseIndex - 1]);
        activate(showcaseIndicators[showcaseIndex]);
    }
}

function handleShowcaseArrowLeft() {
    if (showcaseIndex > 0) {
        showcaseIndex--;
        showcaseList.style.transform = `translateX(-${showcaseIndex * browserWidth}px)`;
        deactivate(showcaseIndicators[showcaseIndex + 1]);
        activate(showcaseIndicators[showcaseIndex]);
    }
}

function handleWidescreenChange(e) {
    if (e.matches) {
        footerDetails.forEach((fd) => {
            fd.open = true;
            fd.addEventListener("click", preventer);
        });
    } else {
        footerDetails.forEach((fd) => {
            fd.open = false;
            fd.removeEventListener("click", preventer);
        });
    }
}

function handleAccordion(e, accordionHead) {
    accordionContent = accordionHead.parentElement.querySelector(":scope > .accordion-content");
    if (accordionHead.contains(e.target) && !accordionHead.classList.contains("active")) {
        activate(accordionHead);
        show(accordionContent);
    } else if (accordionHead.contains(e.target) && accordionHead.classList.contains("active")) {
        deactivate(accordionHead);
        hide(accordionContent);
    }
}

function checkShowcaseAppereance() {
    browserWidth = document.body.clientWidth;
    showcaseIndex = 0;
    if (showcaseList) {
        showcaseList.style.transform = `translateX(0)`;
        showcaseIndicators.forEach((indicator) => {
            deactivate(indicator);
        });
        activate(showcaseIndicators[0]);
    }
}

function setEventListeners() {
    window.addEventListener("resize", checkShowcaseAppereance);
    mediaQuery.addEventListener("change", handleWidescreenChange);

    if (showcaseList) {
        showcaseArrowRight.addEventListener("click", handleShowcaseArrowRight);
        showcaseArrowLeft.addEventListener("click", handleShowcaseArrowLeft);
    }

    triggerSearchOpen.addEventListener("click", () => activate(searchContainer));
    triggerSearchClose.addEventListener("click", () => deactivate(searchContainer));

    triggerCartOpen.addEventListener("click", () => {
        activate(cartContainer);
        disableBodyScroll();
    });
    triggerCartClose.addEventListener("click", () => {
        deactivate(cartContainer);
        enableBodyScroll();
    });

    triggerNavigationOpen.addEventListener("click", () => {
        activate(navigationContainer);
        disableBodyScroll();
    });
    triggerNavigationClose.addEventListener("click", () => {
        deactivate(navigationContainer);
        enableBodyScroll();
    });

    accordionHeadings.forEach((ah) => {
        ah.addEventListener("click", (e) => handleAccordion(e, ah));
    });
}
