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

/* Product Page */
const descriptionTabHeadings = document.querySelectorAll("[data-tab-heading]");
const descriptionTabContents = document.querySelectorAll("[data-tab-content]");

/* Script Variables */
const breakPoint = 1024;
const mediaQuery = window.matchMedia(`(min-width: ${breakPoint}px)`);
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
    if (showcaseIndex < showcaseList.querySelectorAll(".showcase__item").length - 1) {
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
            fd.querySelector(".footer__details-head").addEventListener("click", preventer);
        });
        accordionHeadings.forEach((ah) => {
            deactivate(ah);
            hide(ah.parentElement.querySelector(":scope > .accordion-content"));
        });
        enableBodyScroll();
    } else {
        footerDetails.forEach((fd) => {
            fd.open = false;
            fd.querySelector(".footer__details-head").removeEventListener("click", preventer);
        });
    }
}

function handleAccordion(e) {
    accordionContent = this.parentElement.querySelector(":scope > .accordion-content");
    if (
        this.contains(e.target) &&
        !this.classList.contains("active") &&
        ((!this.parentElement.classList.contains("nav__category-item") &&
            !this.parentElement.classList.contains("nav__subcategory-item")) ||
            !mediaQuery.matches)
    ) {
        activate(this);
        show(accordionContent);
    } else if (this.contains(e.target)) {
        deactivate(this);
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

function handleDescriptionTab() {
    const th = document.querySelector(this.dataset.tabHeading);
    descriptionTabContents.forEach((tc) => {
        deactivate(tc);
    });
    descriptionTabHeadings.forEach((t) => {
        deactivate(t);
    });
    activate(this);
    activate(th);
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

    accordionHeadings.forEach((ah) => {
        ah.addEventListener("click", handleAccordion);
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

    if (descriptionTabHeadings) {
        descriptionTabHeadings.forEach((tab) => {
            tab.addEventListener("click", handleDescriptionTab);
        });
    }
}
