const triggerSearchOpen = document.getElementById("trigger-search-open");
const triggerSearchClose = document.getElementById("trigger-search-close");
const searchContainer = document.querySelector(".header__search");

triggerSearchOpen.addEventListener("click", () => {
    searchContainer.classList.remove("visually-hidden");
});

triggerSearchClose.addEventListener("click", () => {
    searchContainer.classList.add("visually-hidden");
});

const triggerCartOpen = document.getElementById("trigger-cart-open");
const triggerCartClose = document.getElementById("trigger-cart-close");
const cartContainer = document.querySelector(".cart");
const body = document.body;

triggerCartOpen.addEventListener("click", () => {
    cartContainer.classList.remove("visually-hidden");
    body.classList.add("modal-open");
});

triggerCartClose.addEventListener("click", () => {
    cartContainer.classList.add("visually-hidden");
    body.classList.remove("modal-open");
});
