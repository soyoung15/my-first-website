const introPage = document.getElementById("intro_page");
const introText = document.getElementById("intro_text");
const actualHomepage = document.getElementById("actual_homepage");
const introLogo = document.querySelector(".introLogo");

const hamburgerMenubar = document.getElementById("menu_bar");
const menubarClose = document.getElementById("close_menu_bar");
const mobileNavi = document.getElementById("mobile_navi");

if (window.location.hash === "#actualHomepage") {
    introPage.style.display = "none";
    actualHomepage.style.display = "block";
}   else {
        actualHomepage.style.display = "none";
}

let tap = 0;

introPage.addEventListener("click", function () {
    tap++;

    if (tap === 1) {
        introLogo.classList.add("moveup");
        introText.classList.add("show");
    } else {
        introPage.style.display = "none";
        actualHomepage.style.display = "block";
    }
});

hamburgerMenubar.addEventListener("click", function () {
    mobileNavi.classList.add("open");
});

menubarClose.addEventListener("click", function () {
    mobileNavi.classList.remove("open");
});