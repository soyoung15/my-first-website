/* HOMEPAGE */

const introPage = document.getElementById("intro_page");
const introText = document.getElementById("intro_text");
const actualHomepage = document.getElementById("actual_homepage");
const introLogo = document.querySelector(".introLogo");

if (introPage && introText && actualHomepage && introLogo) {
    if (window.location.hash === "#actual_homepage") {
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
}

const hamburgerMenubar = document.getElementById("menu_bar");
const menubarClose = document.getElementById("close_menu_bar");
const mobileNavi = document.getElementById("mobile_navi");

if (hamburgerMenubar && menubarClose && mobileNavi) {
    hamburgerMenubar.addEventListener("click", function () {
        mobileNavi.classList.add("open");
    });

    menubarClose.addEventListener("click", function () {
        mobileNavi.classList.remove("open");
    });
}

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
        "images/gallery/people/people-11.png",
        "images/gallery/people/people-3.png",
        "images/gallery/archive/archive-16.png",
        "images/gallery/archive/archive-8.png",
        "images/gallery/water/water-7.png",
    ];

    let currentArtwork = 1;

    function showImages() {
        let leftNumber = currentArtwork - 1;
        let rightNumber = currentArtwork + 1;

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
    going_right.addEventListener("click", function () {
        currentArtwork++;

        if (currentArtwork >= foryouArtwork.length) {
            currentArtwork = 0;
        }

        showImages();
    });

    going_left.addEventListener("click", function () {
        currentArtwork--;

        if (currentArtwork < 0) {
            currentArtwork = foryouArtwork.length - 1;
        }

        showImages();
    });

    showImages();
}

/* SEARCH RESULT */

const allArtworks = [
    {
        name: "Charles",
        image: "images/gallery/people/people-7.png",
        category: "People",
        categoryPage: "people.html",
        related: [
            "images/gallery/people/people-1.png",
            "images/gallery/people/people-2.png",
            "images/gallery/people/people-3.png",
            "images/gallery/people/people-4.png",
            "images/gallery/people/people-5.png",
            "images/gallery/people/people-6.png",
            "images/gallery/people/people-8.png",
        ]
    },

    {
        name: "What's On The Menu?",
        image: "images/productlist/what's on the menu.png",
        category: "Shop",
        categoryPage: "shop.html",
        price: "$490.00",
        related: [
            "images/productlist/grandmother's gown.png",
            "images/productlist/cave explorers.png",
            "images/productlist/melb.png",
            "images/productlist/shoreline.png",
            "images/productlist/venetian.png",
            "images/productlist/morning sunlight.png",
            "images/productlist/Rowing in Hyde Park.png",
        ]

    },
];

const search_function = document.getElementById("search_function");
const search_input = document.getElementById("search_input");

if (search_function && search_input) {
    search_function.addEventListener("submit", function (event) {
        event.preventDefault();
        
        const typed = search_input.value.trim();

        if (typed !== "") {
            window.location.href = "result_gallery.html?search=" + encodeURIComponent(typed);
        }
    });
}

/* SEARCH RESULT GALLERY */

const result_artwork = document.getElementById("result_artwork")
const result_title = document.getElementById("result_title");
const result_category = document.getElementById("result_category");
const breadcrumbNavi = document.getElementById("breadcrumbNavi_collection");
const breadcrumbNavi_result = document.getElementById("breadcrumbNavi_result");
const goingback_navi = document.getElementById("goingback_navi");
const goingback_category = document.getElementById("goingback_category");

if (result_artwork && result_title) {
    const params = new URLSearchParams(window.location.search);
    const query = params.get("search");

    if (query) {
        const found = allArtworks.find(function(artwork) {
            return artwork.name.toLowerCase() === query.toLowerCase();
        });

        if (search_input) {
            search_input.value = query;
        }

        if (found) {
            /* SHOWING THE RESULT ARTWORK */
            result_artwork.src = found.image;
            result_artwork.alt = found.name;
            result_title.textContent = found.name;
            if (found.price) {
                result_category.textContent = found.price;
            } else {
                result_category.textContent = "From " + found.category + " collection";
            }

            /* BREADCRUMB */
            breadcrumbNavi.textContent = found.category;
            breadcrumbNavi.href = found.categoryPage;
            breadcrumbNavi_result.textContent = found.name;
            goingback_navi.href = found.categoryPage;
            goingback_category.textContent = found.category;

            /* SUGGESTION */
            const related_artworks = found.related;
            let current = 1;

            const left_artwork = document.getElementById("left_artwork");
            const middle_artwork = document.getElementById("slider_artwork");
            const right_artwork = document.getElementById("right_artwork");

            function showRelated() {
                let leftIndex = current - 1;
                let rightIndex = current + 1;

                if (leftIndex < 0) leftIndex = related_artworks.length - 1;
                if (rightIndex >= related_artworks.length) rightIndex = 0;

                left_artwork.src = related_artworks[leftIndex];
                middle_artwork.src = related_artworks[current];
                right_artwork.src = related_artworks[rightIndex];
            }

            document.getElementById("going_left").addEventListener("click", function() {
                current--;
                if (current < 0) current = related_artworks.length - 1;
                showRelated();
            });

            document.getElementById("going_right").addEventListener("click", function() {
                current++;
                if (current >= related_artworks.length) current = 0;
                showRelated();
            });

            showRelated();

        } else {
            /* NO RESULT FOUND */
            result_artwork.style.display = "none";
            result_title.textContent = "No results found for \"" + query + "\"";
            result_category.style.display = "none";
        }
    }
}

/* SHOP */
/* FILTER FUNCTION */

const filter_button = document.getElementById("filter_button");
const filter_option = document.getElementById("filter_option");

if (filter_button && filter_option) {
    filter_button.addEventListener("click", function() {
        filter_option.classList.toggle("open");
    });
}