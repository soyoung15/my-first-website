const introPage = document.getElementById("intro_page");
const actualHomepage = document.getElementById("actual_homepage");

actualHomepage.style.display = "none";

introPage.addEventListener("click", function () {
    introPage.style.display = "none";
    actualHomepage.style.display = "block";
});