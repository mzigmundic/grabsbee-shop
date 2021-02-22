const Application = (function () {
    const appVariables = {
        breakPoint: 1024,
        showcaseIndex: 0,
    };

    const DOM = {
        triggerSearchOpen: document.getElementById("trigger-search-open"),
        triggerSearchClose: document.getElementById("trigger-search-close"),
        searchContainer: document.querySelector(".search"),
        triggerCartOpen: document.getElementById("trigger-cart-open"),
        triggerCartClose: document.getElementById("trigger-cart-close"),
        cartContainer: document.querySelector(".cart"),
        triggerNavigationOpen: document.getElementById("trigger-menu-open"),
        triggerNavigationClose: document.getElementById("trigger-menu-close"),
        navigationContainer: document.querySelector(".nav"),
        accordionHeadings: Array.from(document.querySelectorAll(".accordion-heading")),
        footerDetails: Array.from(document.querySelectorAll(".footer__details")),
        showcaseList: document.querySelector(".showcase__items"),
        showcaseArrowLeft: document.getElementById("showcase-arrow-left"),
        showcaseArrowRight: document.getElementById("showcase-arrow-right"),
        showcaseIndicators: Array.from(document.querySelectorAll(".showcase__indicator-item")),
        triggerShopByOpen: document.getElementById("trigger-shopby-open"),
        triggerShopByClose: document.getElementById("trigger-shopby-close"),
        shoppingOptionsFilters: document.querySelector(".shopping-options__filters"),
        viewAsGrid: document.getElementById("view-as-grid"),
        viewAsList: document.getElementById("view-as-list"),
        productsGrid: document.querySelector(".products__grid"),
        descriptionTabHeadings: document.querySelectorAll("[data-tab-heading]"),
        descriptionTabContents: document.querySelectorAll("[data-tab-content]"),
    };

    const setEventListeners = function () {
        window.addEventListener("resize", checkShowcaseAppereance);
        window.matchMedia(`(min-width: ${appVariables.breakPoint}px)`).addEventListener("change", handleWidescreen);

        DOM.triggerSearchOpen.addEventListener("click", () => activate(DOM.searchContainer));
        DOM.triggerSearchClose.addEventListener("click", () => deactivate(DOM.searchContainer));

        DOM.triggerCartOpen.addEventListener("click", () => {
            activate(DOM.cartContainer);
            disableBodyScroll();
        });
        DOM.triggerCartClose.addEventListener("click", () => {
            deactivate(DOM.cartContainer);
            enableBodyScroll();
        });

        DOM.triggerNavigationOpen.addEventListener("click", () => {
            activate(DOM.navigationContainer);
            disableBodyScroll();
        });
        DOM.triggerNavigationClose.addEventListener("click", () => {
            deactivate(DOM.navigationContainer);
            enableBodyScroll();
        });

        DOM.accordionHeadings.forEach((ah) => {
            ah.addEventListener("click", handleAccordion);
        });

        if (DOM.showcaseList) {
            DOM.showcaseArrowRight.addEventListener("click", handleShowcaseArrowRight);
            DOM.showcaseArrowLeft.addEventListener("click", handleShowcaseArrowLeft);
        }

        if (DOM.triggerShopByOpen && DOM.triggerShopByClose) {
            DOM.triggerShopByOpen.addEventListener("click", () => {
                activate(DOM.shoppingOptionsFilters);
                disableBodyScroll();
            });
            DOM.triggerShopByClose.addEventListener("click", () => {
                deactivate(DOM.shoppingOptionsFilters);
                enableBodyScroll();
            });
        }

        if (DOM.viewAsGrid && DOM.viewAsList) {
            DOM.viewAsGrid.addEventListener("click", () => {
                DOM.productsGrid.classList.remove("list");
                deactivate(DOM.viewAsList);
                activate(DOM.viewAsGrid);
            });
            DOM.viewAsList.addEventListener("click", () => {
                DOM.productsGrid.classList.add("list");
                deactivate(DOM.viewAsGrid);
                activate(DOM.viewAsList);
            });
        }

        if (DOM.descriptionTabHeadings) {
            DOM.descriptionTabHeadings.forEach((tab) => {
                tab.addEventListener("click", handleDescriptionTab);
            });
        }
    };

    const activate = function (element) {
        element.classList.add("active");
    };

    const deactivate = function (element) {
        element.classList.remove("active");
    };

    const show = function (element) {
        element.classList.add("visible");
    };

    const hide = function (element) {
        element.classList.remove("visible");
    };

    const disableBodyScroll = function () {
        document.body.classList.add("no-scroll");
    };

    const enableBodyScroll = function () {
        document.body.classList.remove("no-scroll");
    };

    const preventer = function (event) {
        event.preventDefault();
    };

    const handleShowcaseArrowRight = function () {
        if (appVariables.showcaseIndex < DOM.showcaseList.querySelectorAll(".showcase__item").length - 1) {
            appVariables.showcaseIndex++;
            DOM.showcaseList.style.transform = `translateX(-${appVariables.showcaseIndex * document.body.clientWidth}px)`;
            deactivate(DOM.showcaseIndicators[appVariables.showcaseIndex - 1]);
            activate(DOM.showcaseIndicators[appVariables.showcaseIndex]);
        }
    };

    const handleShowcaseArrowLeft = function () {
        if (appVariables.showcaseIndex > 0) {
            appVariables.showcaseIndex--;
            DOM.showcaseList.style.transform = `translateX(-${appVariables.showcaseIndex * document.body.clientWidth}px)`;
            deactivate(DOM.showcaseIndicators[appVariables.showcaseIndex + 1]);
            activate(DOM.showcaseIndicators[appVariables.showcaseIndex]);
        }
    };

    const checkShowcaseAppereance = function () {
        appVariables.showcaseIndex = 0;
        if (DOM.showcaseList) {
            DOM.showcaseList.style.transform = `translateX(0)`;
            DOM.showcaseIndicators.forEach((indicator) => {
                deactivate(indicator);
            });
            activate(DOM.showcaseIndicators[0]);
        }
    };

    const handleWidescreen = function (e) {
        if (e.matches) {
            DOM.footerDetails.forEach((fd) => {
                fd.open = true;
                fd.querySelector(".footer__details-head").addEventListener("click", preventer);
            });
            DOM.accordionHeadings.forEach((ah) => {
                deactivate(ah);
                hide(ah.parentElement.querySelector(":scope > .accordion-content"));
            });
            enableBodyScroll();
        } else {
            DOM.footerDetails.forEach((fd) => {
                fd.open = false;
                fd.querySelector(".footer__details-head").removeEventListener("click", preventer);
            });
        }
    };

    const handleAccordion = function (e) {
        accordionContent = this.parentElement.querySelector(":scope > .accordion-content");
        if (
            this.contains(e.target) &&
            !this.classList.contains("active") &&
            ((!this.parentElement.classList.contains("nav__category-item") &&
                !this.parentElement.classList.contains("nav__subcategory-item")) ||
                !window.matchMedia(`(min-width: ${appVariables.breakPoint}px)`).matches)
        ) {
            activate(this);
            show(accordionContent);
        } else if (this.contains(e.target)) {
            deactivate(this);
            hide(accordionContent);
        }
    };

    const handleDescriptionTab = function () {
        const th = document.querySelector(this.dataset.tabHeading);
        DOM.descriptionTabContents.forEach((tc) => {
            deactivate(tc);
        });
        DOM.descriptionTabHeadings.forEach((t) => {
            deactivate(t);
        });
        activate(this);
        activate(th);
    };

    return {
        initialize: function () {
            handleWidescreen(window.matchMedia(`(min-width: ${appVariables.breakPoint}px)`));
            checkShowcaseAppereance();
            setEventListeners();
        },
    };
})();

Application.initialize();
