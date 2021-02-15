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

const breakPoint = 1024;
const summaryDetails = Array.from(document.querySelectorAll(".footer__summaries-details-summary"));
summaryDetails.forEach((summary) => {
    summary.addEventListener("click", (e) => {
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
    });
});

const showcaseList = document.querySelector(".showcase__list");
const showcaseArrowLeft = document.getElementById("showcase-arrow-left");
const showcaseArrowRight = document.getElementById("showcase-arrow-right");
const showcaseIndicators = Array.from(document.querySelectorAll(".showcase__nav-item"));
const numOfPics = document.querySelectorAll(".showcase__list-item").length;

let showcaseIndex = 0;

let browserWidth = findInner();
showcaseArrowRight.addEventListener("click", () => {
    if (showcaseIndex < numOfPics - 1) {
        showcaseIndex++;
        showcaseList.style.transform = `translateX(-${showcaseIndex * browserWidth}px)`;
        showcaseIndicators[showcaseIndex - 1].classList.remove("active");
        showcaseIndicators[showcaseIndex].classList.add("active");
    }
});
showcaseArrowLeft.addEventListener("click", () => {
    if (showcaseIndex > 0) {
        showcaseIndex--;
        showcaseList.style.transform = `translateX(-${showcaseIndex * browserWidth}px)`;
        showcaseIndicators[showcaseIndex + 1].classList.remove("active");
        showcaseIndicators[showcaseIndex].classList.add("active");
    }
});

checkAppereance();
window.addEventListener("resize", checkAppereance);

function findInner() {
    return showcaseList.clientWidth / numOfPics;
}

function checkAppereance() {
    function preventD(e) {
        e.preventDefault();
    }
    browserWidth = findInner();
    showcaseIndex = 0;
    showcaseList.style.transform = `translateX(0)`;
    showcaseIndicators.forEach((indicator) => {
        indicator.classList.remove("active");
    });
    showcaseIndicators[0].classList.add("active");
    if (window.innerWidth >= breakPoint) {
        summaryDetails.forEach((summary) => {
            summary.parentElement.setAttribute("open", true);
            summary.classList.add("details-disabled-on-large");
            summary.addEventListener("click", (e) => e.preventD);
        });
    } else {
        summaryDetails.forEach((summary) => {
            summary.parentElement.removeAttribute("open");
            summary.getElementsByTagName("i")[0].classList.remove("icon-chevron-up");
            summary.getElementsByTagName("i")[0].classList.add("icon-chevron-down");
            summary.classList.remove("details-disabled-on-large");
            summary.removeEventListener("click", (e) => e.preventD);
        });
    }
}
