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
const navigationContainer = document.querySelector(".nav");

/* Accordion */
const accordionHeadings = Array.from(document.querySelectorAll(".accordion-heading"));

/* Footer */
const footerDetails = Array.from(document.querySelectorAll(".footer__details"));

/* Home Page */
const showcaseList = document.querySelector(".showcase__items");
const showcaseArrowLeft = document.getElementById("showcase-arrow-left");
const showcaseArrowRight = document.getElementById("showcase-arrow-right");
const showcaseIndicators = Array.from(document.querySelectorAll(".showcase__indicator-item"));

/* Subcategory Page */
const triggerShopByOpen = document.getElementById("trigger-shopby-open");
const triggerShopByClose = document.getElementById("trigger-shopby-close");
const shoppingOptionsFilters = document.querySelector(".shopping-options__filters");
const viewAsGrid = document.getElementById("view-as-grid");
const viewAsList = document.getElementById("view-as-list");
const productsGrid = document.querySelector(".products__grid");

/* Script Variables */
const breakPoint = 1024;
const mediaQuery = window.matchMedia(`(min-width: ${breakPoint}px)`);
let numOfPics;
if (showcaseList) {
    numOfPics = showcaseList.querySelectorAll(".showcase__item").length;
}

let showcaseIndex;
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
        showcaseList.style.transform = `translateX(-${showcaseIndex * document.body.clientWidth}px)`;
        deactivate(showcaseIndicators[showcaseIndex - 1]);
        activate(showcaseIndicators[showcaseIndex]);
    }
}

function handleShowcaseArrowLeft() {
    if (showcaseIndex > 0) {
        showcaseIndex--;
        showcaseList.style.transform = `translateX(-${showcaseIndex * document.body.clientWidth}px)`;
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

    if (showcaseList) {
        showcaseArrowRight.addEventListener("click", handleShowcaseArrowRight);
        showcaseArrowLeft.addEventListener("click", handleShowcaseArrowLeft);
    }

    if (triggerShopByOpen && triggerShopByClose) {
        triggerShopByOpen.addEventListener("click", () => {
            activate(shoppingOptionsFilters);
            disableBodyScroll();
        });
        triggerShopByClose.addEventListener("click", () => {
            deactivate(shoppingOptionsFilters);
            enableBodyScroll();
        });
    }

    if (viewAsGrid && viewAsList) {
        viewAsGrid.addEventListener("click", () => {
            productsGrid.classList.remove("list");
            deactivate(viewAsList);
            activate(viewAsGrid);
        });
        viewAsList.addEventListener("click", () => {
            productsGrid.classList.add("list");
            deactivate(viewAsGrid);
            activate(viewAsList);
        });
    }

    accordionHeadings.forEach((ah) => {
        ah.addEventListener("click", (e) => handleAccordion(e, ah));
    });
}
