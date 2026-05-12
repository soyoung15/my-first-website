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
            return artwork.name.toLowerCase().replace("?", "") === query.toLowerCase().replace("?", "");
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
const product_list = document.getElementById("product_list");

if (filter_button && filter_option) {
    filter_button.addEventListener("click", function() {
        filter_option.classList.toggle("open");
    });
}

if (product_list) {
    const filter_buttons = document.querySelectorAll(".filterOption button");
    
    filter_buttons.forEach(function(btn) {
        btn.addEventListener("click", function() {
            const artworks = Array.from(product_list.querySelectorAll(".productArtwork"));

            artworks.sort(function(a, b) {
                const titleA = a.querySelector("h2").textContent.trim();
                const titleB = b.querySelector("h2").textContent.trim();
                const priceA = parseFloat(a.querySelector("p").textContent.replace(/[^0-9.]/g, ""));
                const priceB = parseFloat(b.querySelector("p").textContent.replace(/[^0-9.]/g, ""));

                const label = btn.textContent.trim();

                if (label === "Alphabetically, A-Z") {
                    return titleA.localeCompare(titleB);
                }

                if (label === "Alphabetically, Z-A") {
                    return titleB.localeCompare(titleA);
                }

                if (label === "Price, low to high") {
                    return priceA - priceB;
                }

                if (label === "Price, high to low") {
                    return priceB - priceA;
                }
            });

            artworks.forEach(function(artwork) {
                product_list.appendChild(artwork);
            });

            filter_option.classList.remove("open");
        });
    });
}

/* PRODUCT DETAIL */

const products = [
    {
        id: "shoreline",
        name: "Shoreline",
        price: "$1,290.00",
        images: [
            "images/productlist/shoreline.png",
            "images/productlist/shoreline-2.png",
            "images/productlist/shoreline-3.png",
        ],
        medium: "Pastel",
        sku: "0608-P",
        frame: "Unframed",
        size: "40 x 40 cm (16\" x 16\")"
    },
    {
        id: "what's_on_the_menu",
        name: "What's On The Menu?",
        price: "$490.00",
        images: [
            "images/productlist/what's on the menu.png"
        ],
        medium: "Oil on linen board",
        sku: "0559-O",
        frame: "Unframed",
        size: "25 x 25 cm (10\" x 10\")"
    }
];

const artwork_thumbnails = document.getElementById("artwork_thumbnails");
const product_detail_artwork = document.getElementById("product_detail_artwork");
const product_detail_title = document.getElementById("product_detail_title");
const product_detail_price = document.getElementById("product_detail_price");
const product_detail_info = document.getElementById("product_detail_info");
const productBreadcrumb_result = document.getElementById("breadcrumbNavi_result");
const addtoCart_button = document.getElementById("addtocart_button");

if (product_detail_artwork && product_detail_title && product_detail_price) {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("product") || "shoreline";

    const found = products.find(function(product) {
        return product.id === productId;
    }) || products[0];
    
    product_detail_artwork.src = found.images[0];
    product_detail_artwork.alt = found.name;
    product_detail_title.textContent = found.name;
    product_detail_price.textContent = found.price;

    if (productBreadcrumb_result) {
        productBreadcrumb_result.textContent = found.name;
    }

    product_detail_info.innerHTML = 
        "<div class='infoRow'><span>" + found.medium + "</span><span>SKU " + found.sku + "</span></div>" +
        "<div class='infoRow'><span>" + found.frame + "</span><span>" + found.size + "</span></div>";

    artwork_thumbnails.innerHTML = "";

    found.images.forEach(function(imgSrc, index) {
        const thumb = document.createElement("img");
        thumb.src = imgSrc;
        thumb.alt = found.name + "thumbnail";
        
        if (index === 0) {
            thumb.classList.add("active");
        }

        thumb.addEventListener("click", function() {
            product_detail_artwork.src = imgSrc;
                    
            artwork_thumbnails.querySelectorAll("img").forEach(function(item) {
                item.classList.remove("active");
            });
            
            thumb.classList.add("active");
        });

        artwork_thumbnails.appendChild(thumb);
    });
    
    let inCart = false;

    if (addtoCart_button) {
        addtoCart_button.addEventListener("click", function() {
            if (!inCart) {
                addtoCart_button.textContent = "Go to cart";
                addtoCart_button.classList.add("added");
                inCart = true;
            } else {
                window.location.href = "shoppingcart.html";
            }
        });
    }
 }