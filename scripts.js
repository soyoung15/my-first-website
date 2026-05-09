/* HOMEPAGE */

const introPage = document.getElementById("intro_page");
const introText = document.getElementById("intro_text");
const actualHomepage = document.getElementById("actual_homepage");
const introLogo = document.querySelector(".introLogo");

const hamburgerMenubar = document.getElementById("menu_bar");
const menubarClose = document.getElementById("close_menu_bar");
const mobileNavi = document.getElementById("mobile_navi");

if (window.location.hash === "#actual_Homepage") {
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

/* GALLERY */

const slider_artwork = document.getElementById("slider_artwork");
const left_artwork = document.getElementById("left_artwork");
const right_artwork = document.getElementById("right_artwork");
const going_left = document.getElementById("going_left");
const going_right = document.getElementById("going_right");

if (slider_artwork && left_artwork && right_artwork && going_left && going_right) {
    const foryouArtwork = [
        "images/gallery/water/water-13.png",
        "images/gallery/people/people-10.png",
        "images/gallery/people/people-3.png",
        "images/gallery/archive/archive-16.png",
        "images/gallery/archive/archive-8.png",
        "images/gallery/water/water-7.png",
    ];

    let currentArtwork = 1;

    function showImages() {
        let leftNumber = currentImage - 1;
        let rightNumber = currentImage + 1;

        if (leftNumber < 0) {
            leftNumber = foryouArtwork.length - 1;
        }

        if (rightNumber >= foryouArtwork.length) {
            rightNumber = 0;
        }

        left_artwork.src = foryouArtwork[leftNumber];
        slider_artwork.src = foryouArtwork[currentArtwork];
        right_artwork.src = foryouArtwork[rightNumber];
    }
    foryouRightButton.addEventListener("click", function () {
        currentArtwork++;

        if (currentArtwork >= foryouArtwork.length) {
            currentArtwork = 0;
        }

        showImages();
    });

    foryouLeftButton.addEventListener("click", function () {
        currentArtwork--;

        if (currentArtwork < 0 {
            currentArtwork = foryouArtwork.length - 1;
        }

        showImages();
    });

    showImages();
}