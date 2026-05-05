const introPage = document.getElementById("intro_page");
const introText = document.getElementById("intro_text");
const instructionToStart = document.getElementById("Instruction_tap");
const actualHomepage = document.getElementById("actual_homepage");

const hamburgerMenubar = document.getElementById("menu_bar");
const menubarClose = document.getElementById("close_menu_bar");
const mobileNavi = document.getElementById("mobile_navi");

let clicked = false;

actualHomepage.style.display = "none";

introPage.addEventListener("click", function () {
    introPage.style.display = "none";
    actualHomepage.style.display = "block";
});

hamburgerMenubar.addEventListener("click", function () {
    mobileNavi.classList.add("open");
});

menubarClose.addEventListener("click", function () {
    mobileNavi.classList.remove("open");
});