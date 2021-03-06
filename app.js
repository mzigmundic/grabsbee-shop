// Application IIFE
const Application = (function () {
    // Private application data
    const appVariables = {
        breakPoint: 1024,
        showcaseIndex: 0,
    };

    // Private DOM elements
    const DOM = {
        triggerSearchOpen: document.getElementById("trigger-search-open"),
        triggerSearchClose: document.getElementById("trigger-search-close"),
        searchContainer: document.querySelector(".search"),
        triggerCartOpen: document.getElementById("trigger-cart-open"),
        triggerCartClose: document.getElementById("trigger-cart-close"),
        cartContainer: document.querySelector(".cart"),
        removeFromCartButtons: document.querySelectorAll(".remove-from-cart"),
        triggerNavigationOpen: document.getElementById("trigger-menu-open"),
        triggerNavigationClose: document.getElementById("trigger-menu-close"),
        navigationContainer: document.querySelector(".nav"),
        accordionHeadings: Array.from(document.querySelectorAll(".accordion-heading")),
        newsletterForm: document.querySelector(".footer__newsletter-action"),
        footerDetails: Array.from(document.querySelectorAll(".footer__details")),
        wishlistButtons: Array.from(document.querySelectorAll(".button-wishlist")),
        compareButtons: Array.from(document.querySelectorAll(".button-compare")),
        showcaseList: document.querySelector(".showcase__items"),
        showcaseArrowLeft: document.getElementById("showcase-arrow-left"),
        showcaseArrowRight: document.getElementById("showcase-arrow-right"),
        showcaseIndicators: Array.from(document.querySelectorAll(".showcase__indicator-item")),
        triggerShopByOpen: document.getElementById("trigger-shopby-open"),
        triggerShopByClose: document.getElementById("trigger-shopby-close"),
        shoppingOptionsFilters: document.querySelector(".shopping-options__filters"),
        shoppingOptionsCurrent: document.querySelector(".shopping-options__current"),
        viewAsGrid: document.getElementById("view-as-grid"),
        viewAsList: document.getElementById("view-as-list"),
        productsGrid: document.querySelector(".products__grid"),
        subcategoryForms: Array.from(document.querySelectorAll(".product-item__action")),
        productImages: document.querySelector(".product-images"),
        productForm: document.querySelector(".product-info__action"),
        descriptionTabHeadings: document.querySelectorAll("[data-tab-heading]"),
        descriptionTabContents: document.querySelectorAll("[data-tab-content]"),
    };

    // Private Methods
    // Set event listeners
    const setEventListeners = function () {
        window.matchMedia(`(min-width: ${appVariables.breakPoint}px)`).addEventListener("change", checkBrowserWidth);

        // Search
        DOM.triggerSearchOpen.addEventListener("click", () => activate(DOM.searchContainer));
        DOM.triggerSearchClose.addEventListener("click", () => deactivate(DOM.searchContainer));

        // Cart
        DOM.triggerCartOpen.addEventListener("click", () => {
            activate(DOM.cartContainer);
            if (!window.matchMedia(`(min-width: ${appVariables.breakPoint}px)`).matches) {
                disableBodyScroll();
            }
        });
        DOM.triggerCartClose.addEventListener("click", () => {
            deactivate(DOM.cartContainer);
            enableBodyScroll();
        });

        // Main Navigation
        DOM.triggerNavigationOpen.addEventListener("click", () => {
            activate(DOM.navigationContainer);
            disableBodyScroll();
        });
        DOM.triggerNavigationClose.addEventListener("click", () => {
            deactivate(DOM.navigationContainer);
            enableBodyScroll();
        });

        // Accordions
        DOM.accordionHeadings.forEach((ah) => {
            ah.addEventListener("click", handleAccordion);
        });

        // Newsletter
        DOM.newsletterForm.addEventListener("submit", handleNewsletterForm);

        // Home page Showcase
        if (DOM.showcaseList) {
            DOM.showcaseArrowRight.addEventListener("click", handleShowcaseArrowRight);
            DOM.showcaseArrowLeft.addEventListener("click", handleShowcaseArrowLeft);
        }

        // Subcategory page Shop By
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

        // Subcategory page add new filter
        if (DOM.shoppingOptionsFilters) {
            DOM.shoppingOptionsFilters.addEventListener("click", handleAddFilter);
        }

        // Subcategory page remove filters
        if (DOM.shoppingOptionsCurrent) {
            DOM.shoppingOptionsCurrent.addEventListener("click", handleRemoveFilter);
        }

        // Subcategory page View as Grid / View as List
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

        // Subcategory page Add to Cart
        if (DOM.subcategoryForms) {
            DOM.subcategoryForms.forEach((subcategoryForm) => {
                subcategoryForm.addEventListener("submit", handleSubcategoryPageAddToCart);
            });
        }

        // Product page mini gallery
        if (DOM.productImages) {
            DOM.productImages.addEventListener("click", selectMainImage);
        }

        // Product page Add to Cart
        if (DOM.productForm) {
            DOM.productForm.addEventListener("submit", handleProductPageAddToCart);
        }

        // Product page Description Tabs
        if (DOM.descriptionTabHeadings) {
            DOM.descriptionTabHeadings.forEach((tab) => {
                tab.addEventListener("click", handleDescriptionTab);
            });
        }

        // Wishlist buttons
        if (DOM.wishlistButtons) {
            DOM.wishlistButtons.forEach((wb) =>
                wb.addEventListener("click", () => {
                    showMessage("Added to wishlist!");
                })
            );
        }

        // Compare buttons
        if (DOM.compareButtons) {
            DOM.compareButtons.forEach((cb) =>
                cb.addEventListener("click", () => {
                    showMessage("Added to compare!");
                })
            );
        }
    };

    // Utility methods
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

    // Uppercase first letter in each word of a string, lowercase other letters
    const formatName = function (string) {
        const words = string.split(" ");
        return words
            .map((word) => {
                return word[0].toUpperCase() + word.substring(1).toLowerCase();
            })
            .join(" ");
    };

    // Get color from radio buttons on product page
    const getProductColor = function (colorGroup) {
        let selectedColor = false;
        colorGroup.forEach((g) => {
            if (g.checked) {
                selectedColor = g.id;
            }
        });
        return selectedColor;
    };

    // Show popup message; Provide one argument for green success message;
    // Provide "false" as other argument to display as red error message
    const showMessage = function (message, success = true) {
        const messageContainer = document.createElement("div");
        const paragraph = document.createElement("p");
        paragraph.appendChild(document.createTextNode(message));
        messageContainer.appendChild(paragraph);
        messageContainer.classList.add("message");
        if (!success) {
            messageContainer.classList.add("error");
        }
        document.querySelector("body").appendChild(messageContainer);
        setTimeout(() => {
            document.querySelector(".message").remove();
        }, 3000);
    };

    // Close footer details and accordions when browser width hits small; Open footer on large screens
    const checkBrowserWidth = function (e) {
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

    // Accordion Handler
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

    // Newsletter submit handler
    const handleNewsletterForm = function (e) {
        e.preventDefault();
        if (!this.newsletter.value) {
            showMessage("Please enter your email address", false);
        } else {
            showMessage(`${this.newsletter.value} submited to newsletter!`);
            this.newsletter.value = "";
        }
    };

    // Home page Showcase Arrow Right Handler
    const handleShowcaseArrowRight = function () {
        const numberOfImages = DOM.showcaseList.querySelectorAll(".showcase__item").length;
        if (appVariables.showcaseIndex < numberOfImages - 1) {
            appVariables.showcaseIndex++;
            DOM.showcaseList.style.transform = `translateX(-${(appVariables.showcaseIndex * 100) / numberOfImages}%)`;
            deactivate(DOM.showcaseIndicators[appVariables.showcaseIndex - 1]);
            activate(DOM.showcaseIndicators[appVariables.showcaseIndex]);
        }
    };

    // Home Page Showcase Arrow Left Handler
    const handleShowcaseArrowLeft = function () {
        const numberOfImages = DOM.showcaseList.querySelectorAll(".showcase__item").length;
        if (appVariables.showcaseIndex > 0) {
            appVariables.showcaseIndex--;
            DOM.showcaseList.style.transform = `translateX(-${(appVariables.showcaseIndex * 100) / numberOfImages}%)`;
            deactivate(DOM.showcaseIndicators[appVariables.showcaseIndex + 1]);
            activate(DOM.showcaseIndicators[appVariables.showcaseIndex]);
        }
    };

    // Subcategory page add filter
    const handleAddFilter = function (e) {
        if (e.target.tagName == "LABEL") {
            const filterCategory = formatName(e.target.parentElement.parentElement.previousElementSibling.innerText);
            const filterSubcategory = formatName(e.target.innerText);
            DOM.shoppingOptionsCurrent.classList.remove("visually-hidden");
            DOM.shoppingOptionsCurrent.querySelector(".shopping-options__clear-filter").innerText = filterCategory;
            DOM.shoppingOptionsCurrent.querySelector(".shopping-options__current-filter").innerText = filterSubcategory;
            deactivate(e.target.parentElement.parentElement.previousElementSibling);
            hide(e.target.parentElement.parentElement);
            deactivate(DOM.shoppingOptionsFilters);
            enableBodyScroll();
            showMessage(`Now shopping by: ${filterSubcategory}`);
        }
    };

    // Subcategory page remove filters
    const handleRemoveFilter = function (e) {
        if (
            e.target.classList.contains("shopping-options__clear-filter") ||
            e.target.classList.contains("shopping-options__clear-all-filters")
        ) {
            DOM.shoppingOptionsCurrent.classList.add("visually-hidden");
            showMessage("Filter removed");
        }
    };

    // Product page select image from list of images and display as main
    const selectMainImage = function (e) {
        if (e.target.classList.contains("product-images__list-image")) {
            DOM.productImages.querySelector(".product-images__main-image").src = e.target.src;
            Array.from(DOM.productImages.querySelectorAll(".product-images__list-image")).forEach((img) => {
                deactivate(img);
            });
            activate(e.target);
        }
    };

    // Product page description tabs handler
    const handleDescriptionTab = function () {
        const thisTabHeading = document.querySelector(this.dataset.tabHeading);
        DOM.descriptionTabContents.forEach((tc) => {
            deactivate(tc);
        });
        DOM.descriptionTabHeadings.forEach((th) => {
            deactivate(th);
        });
        activate(this);
        activate(thisTabHeading);
    };

    // Cart functionalities
    // Subcategory Add to Cart handler
    const handleSubcategoryPageAddToCart = function (e) {
        e.preventDefault();
        const productName = formatName(this.parentElement.parentElement.querySelector(".product-item__name a").innerText);
        const productImage = this.parentElement.parentElement.parentElement.querySelector(".product-item__image img").src;
        const productPrice = this.parentElement.parentElement.querySelector(".product-item__price strong").innerText.replace("$", "");
        const productColor = "black";
        const productQuantity = 1;
        const fullProductDescription = {
            name: productName,
            image: productImage,
            price: productPrice,
            color: productColor,
            quantity: productQuantity,
        };
        addItemToCart(JSON.stringify(fullProductDescription));
        updateCart();
        showMessage(`${productName} added to cart!`);
    };

    // Product page Add to Cart handler
    const handleProductPageAddToCart = function (e) {
        e.preventDefault();
        const productName = this.parentElement.querySelector(".product-info__heading span").innerText;
        const productImage = document.querySelectorAll(".product-images__list-image")[0].src;
        const price = parseFloat(this.parentElement.querySelector(".product-info__price strong").innerText.replace("$", ""));
        const selectedColor = getProductColor(Array.from(this.color));
        const quantity = this.qty.value;
        if (!selectedColor && quantity < 1) {
            showMessage(`Please select a color of ${productName} and reasonable quantity!`, false);
        } else if (!selectedColor) {
            showMessage(`Please select a color of ${productName}!`, false);
        } else if (quantity < 1) {
            showMessage("Please select reasonable quantity", false);
        } else {
            const successMessage = `${quantity} ${selectedColor} ${productName}${quantity > 1 ? "s" : ""} with total price of ${(
                quantity * price
            ).toFixed(2)} added to cart!`;
            const fullProductDescription = {
                name: productName,
                image: productImage,
                price: price,
                color: selectedColor,
                quantity: quantity,
            };
            addItemToCart(JSON.stringify(fullProductDescription));
            updateCart();
            showMessage(successMessage);
        }
    };

    // Add item to cart
    const addItemToCart = function (itemJSON) {
        const item = JSON.parse(itemJSON);
        const li = document.createElement("li");
        li.classList.add("cart__product");
        const itemHtml = `<div class="cart__product-wrapper">
                <div class="cart__product-picture">
                    <picture>
                        <img src="${item.image}" alt="Cart item 1" />
                    </picture>
                </div>
                <div class="cart__product-description">
                    <h3 class="cart__product-description-name">
                        <a href="./product.html">${item.name}</a>
                    </h3>
                    <dl>
                        <div class="cart__product-description-feature">
                            <dt>Color</dt>
                            <dd>${item.color.charAt(0).toUpperCase() + item.color.slice(1)}</dd>
                        </div>
                        <div class="cart__product-description-feature">
                            <dt>Price</dt>
                            <dd class="cart__product-price">${item.price}$</dd>
                        </div>
                        <div class="cart__product-description-feature--input">
                            <dt>Qty</dt>
                            <dd>
                                <form>
                                    <fieldset>
                                        <legend class="visually-hidden">Item qty control</legend>
                                        <label for="qty" class="visually-hidden">Qty:</label>
                                        <input name="qty" type="number" value="${item.quantity}" min="1" />
                                    </fieldset>
                                </form>
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
            <div class="cart__item-manager">
                <button>
                    <span class="visually-hidden">Edit</span>
                    <i class="icon-edit"></i>
                </button>
                <button class="cart__remove-item">
                    <span class="visually-hidden">Trash</span>
                    <i class="icon-trash"></i>
                </button>
            </div>`;
        li.innerHTML = itemHtml;
        li.getElementsByTagName("input")[0].addEventListener("change", updateCart);
        li.querySelector(".cart__remove-item").addEventListener("click", handleRemoveFromCartButton);
        DOM.cartContainer.querySelector(".cart__products").appendChild(li);
    };

    // Remove from Cart handler
    const handleRemoveFromCartButton = function () {
        const cartItem = this.parentElement.parentElement;
        const name = cartItem.querySelector(".cart__product-description-name a").innerText;
        cartItem.remove();
        updateCart();
        showMessage(`${formatName(name)} Removed from cart!`);
    };

    // Update cart container values
    const updateCart = function () {
        const cartItems = Array.from(DOM.cartContainer.querySelectorAll(".cart__product"));
        if (cartItems.length > 0) {
            DOM.cartContainer.querySelector(".cart__empty").classList.add("visually-hidden");
            DOM.cartContainer.querySelector(".cart__not-empty").classList.remove("visually-hidden");
            let numberOfProductsText;
            let totalNumberOfProducts = 0;
            let totalPrice = 0;
            cartItems.forEach((item) => {
                const numberOfSameType = +item.getElementsByTagName("input")[0].value;
                totalNumberOfProducts += numberOfSameType;
                totalPrice += numberOfSameType * item.querySelector(".cart__product-price").innerText.replace("$", "");
            });
            totalNumberOfProducts > 1
                ? (numberOfProductsText = `${totalNumberOfProducts} items in cart`)
                : totalNumberOfProducts === 1
                ? (numberOfProductsText = `${totalNumberOfProducts} item in cart`)
                : (numberOfProductsText = "empty");
            DOM.cartContainer.querySelector(".cart__num-of-items-text").innerText = numberOfProductsText;
            DOM.cartContainer.querySelector(".cart__total-price").innerText = totalPrice.toFixed(2) + "$";
        } else {
            DOM.cartContainer.querySelector(".cart__empty").classList.remove("visually-hidden");
            DOM.cartContainer.querySelector(".cart__not-empty").classList.add("visually-hidden");
        }
    };

    return {
        // Public method
        initialize: function () {
            checkBrowserWidth(window.matchMedia(`(min-width: ${appVariables.breakPoint}px)`));
            setEventListeners();
        },
    };
})();

Application.initialize();
