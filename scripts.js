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
        id: "What's-On-The-Menu?",
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
                let cart = JSON.parse(localStorage.getItem("cart") || "[]");

                const existingItem = cart.find(function (item) {
                    return item.id === found.id;
                });

                if (existingItem) {
                    existingItem.qty += 1;
                } else {
                    cart.push({
                        id: found.id,
                        name: found.name,
                        price: found.price,
                        image: found.images[0],
                        size: found.size,
                        qty: 1
                    });
                }
                localStorage.setItem("cart", JSON.stringify(cart));
                addtoCart_button.textContent = "Go to cart";
                addtoCart_button.classList.add("added");
                inCart = true;
            } else {
                window.location.href = "shoppingcart.html";
            }
        });
    }
}

/* SHOPPING CART */

const shoppingcart_items = document.getElementById("shoppingcart_items");
const shoppingcart_total = document.getElementById("shoppingcart_total");
const adding_coupon = document.getElementById("adding_coupon");
const coupon_input = document.getElementById("coupon_input");
const coupon_number = document.getElementById("coupon_number");
const coupon_apply = document.getElementById("coupon_apply");
const checkout_button = document.getElementById("checkout_button");

if (shoppingcart_items) {

    let cart = JSON.parse(localStorage.getItem("cart") || "[]");

    function getPriceNumber(priceText) {
        return parseFloat(priceText.replace(/[^0-9.]/g, ""));
    }

    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    function updateTotal() {
        let total = 0;

        cart.forEach(function(item) {
            total += getPriceNumber(item.price) * item.qty;
        });

        shoppingcart_total.textContent = "$" + total.toLocaleString("en-US", { 
            minimumFractionDigits: 2, 
            maximumFractionDigits: 2 
        });
    }

    function renderCart() {
        shoppingcart_items.innerHTML = "";

        if (cart.length === 0) {
            shoppingcart_items.innerHTML = "<p style='color:#5A3E00; font-size:0.9rem;'>No item in shopping cart.</p>";
            updateTotal();
            return;
        }

        cart.forEach(function(item) {
            const div = document.createElement("div");
            div.classList.add("shoppingcartItems");

            const img = document.createElement("img");
            img.className = "artworkImage";
            img.src = item.image;
            img.alt = item.name;

            const info = document.createElement("div");
            info.className = "shoppingcartItemsInfo";
            info.innerHTML =
                "<h2>" + item.name + "</h2>" +
                "<p>" + item.size + "</p>" +
                "<p class='shoppingcartItemsPrice'>" + item.price + "</p>";

            const controls = document.createElement("div");
            controls.className = "shoppingcartItemsFunction";

            if (item.qty === 1) {
                const deleteButton = document.createElement("button");
            deleteButton.type = "button";
            deleteButton.className = item.qty === 1 ? "deleteButton show" : "deleteButton";
            deleteButton.setAttribute("data-id", item.id);
            const deleteButtonImg = document.createElement("img");
            deleteButtonImg.src = "images/icons/delete.png";
            deleteButtonImg.alt = "delete button icon";
            deleteButton.appendChild(deleteButtonImg);
            controls.appendChild(deleteButton);
            } else {
                const minusButton = document.createElement("button");
                minusButton.type = "button";
                minusButton.className = "minusButton";
                minusButton.setAttribute("data-id", item.id);
                const minusButtonImg = document.createElement("img");
                minusButtonImg.src = "images/icons/minus.png";
                minusButtonImg.alt = "minus button icon";
                minusButton.appendChild(minusButtonImg);
                controls.appendChild(minusButton);
            }

            const qtySpan = document.createElement("span");
            qtySpan.textContent = item.qty;
            controls.appendChild(qtySpan);

            const addButton = document.createElement("button");
            addButton.type = "button";
            addButton.className = "addButton";
            addButton.setAttribute("data-id", item.id);
            const addButtonImg = document.createElement("img");
            addButtonImg.src = "images/icons/add.png";
            addButtonImg.alt = "add button icon";
            addButton.appendChild(addButtonImg);
            controls.appendChild(addButton);

            div.appendChild(img);
            div.appendChild(info);
            div.appendChild(controls);
            shoppingcart_items.appendChild(div);
        });

        updateTotal();

        shoppingcart_items.querySelectorAll(".addButton").forEach(function(button) {
            button.addEventListener("click", function() {
                const id = button.getAttribute("data-id");
                const item = cart.find(function(product) {
                    return product.id === id;
                });

                if (item) {
                    item.qty += 1;
                    saveCart();
                    renderCart();
                }
            });
        });

        shoppingcart_items.querySelectorAll(".minusButton").forEach(function(button) {
            button.addEventListener("click", function() {
                const id = button.getAttribute("data-id");
                const item = cart.find(function(product) {
                    return product.id === id;
                });

                if (item && item.qty > 1) {
                    item.qty -= 1;
                    saveCart();
                    renderCart();
                }
            });
        });

        shoppingcart_items.querySelectorAll(".deleteButton").forEach(function(button) {
            button.addEventListener("click", function() {
                const id = button.getAttribute("data-id");

                cart = cart.filter(function(product) {
                    return product.id !== id;
                });

                saveCart();
                renderCart();
            });
        });
    }

    renderCart();

    adding_coupon.addEventListener("click", function() {
        coupon_input.classList.toggle("open");

        if (coupon_input.classList.contains("open")) {
            adding_coupon.textContent = "- Enter a coupon code";
            coupon_number.focus();
        } else {
            adding_coupon.textContent = "+ Enter a coupon code";
        }
    });

    coupon_apply.addEventListener("click", function() {
        if (coupon_number.value.trim() !== "") {
            coupon_apply.textContent = "Applied";
        }
    });
    

    checkout_button.addEventListener("click", function() {
        window.location.href = "checkout.html";
    });
}

/* CHECKOUT */

const order_summary_items = document.getElementById("order_summary_items");
const order_subtotal = document.getElementById("order_subtotal");
const order_shipping = document.getElementById("order_shipping");
const order_taxes = document.getElementById("order_taxes");
const order_total = document.getElementById("order_total");
const complete_order_button = document.getElementById("complete_order_button");

const ordersuccess_items = document.getElementById("ordersuccess_summary_items");
const ordersuccess_subtotal = document.getElementById("ordersuccess_subtotal");
const ordersuccess_shipping = document.getElementById("ordersuccess_shipping");
const ordersuccess_taxes = document.getElementById("ordersuccess_taxes");
const ordersuccess_total = document.getElementById("ordersuccess_total");

const checkout = document.getElementById("check_out");
const payment_success = document.getElementById("payment_success");

if (order_summary_items) {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    function getPriceNumber(priceText) {
        return parseFloat(priceText.replace(/[^0-9.]/g, ""));
    }

    function Totalprice(price) {
        return "$" + price.toLocaleString("en-US", {
            minimumFractionDigits: 2, 
            maximumFractionDigits: 2 
        });
    }

    function renderOrderSummary(detailbox, subtotal, shipping, taxes, total) {
        let subtotalPrice = 0;
        detailbox.innerHTML = "";

        cart.forEach(function(item) {
            subtotalPrice += getPriceNumber(item.price) * item.qty;

            const div = document.createElement("div");
            div.className = "orderSummaryItem";

            const img = document.createElement("img");
            img.src = item.image;
            img.alt = item.name;

            const info = document.createElement("div");
            info.className = "orderSummaryItemInfo";

            const title = document.createElement("h3");
            title.textContent = item.name;

            const size = document.createElement("p");
            size.textContent = item.size;

            const price = document.createElement("p");
            price.className = "orderSummaryPrice";
            price.textContent = item.price;

            const qty = document.createElement("span");
            qty.className = "orderSummaryQty";
            qty.textContent = "Quantity: " + item.qty;

            info.appendChild(title);
            info.appendChild(size);
            info.appendChild(price);

            div.appendChild(img);
            div.appendChild(info);
            div.appendChild(qty);
            detailbox.appendChild(div);
        });

        subtotal.textContent = Totalprice(subtotalPrice);
        shipping.textContent = "-";
        taxes.textContent = "$0.00";
        total.textContent = Totalprice(subtotalPrice);
    }

    renderOrderSummary(
        order_summary_items,
        ordersuccess_subtotal,
        ordersuccess_shipping,
        ordersuccess_taxes,            
        ordersuccess_total
    );

    const paymentRadios = document.querySelectorAll("input[name='payment']");
    const creditCardInput = document.getElementById("creditcard_input");

    if (creditCardInput) {
        paymentRadios.forEach(function(radio) {
            radio.addEventListener("change", function () {
                    if (document.getElementById("creditcard").checked) {
                        creditCardInput.style.display = "flex";
                    } else {
                        creditCardInput.style.display = "none";
                    }
            });
        });
    }

    if (complete_order_button) {
        complete_order_button.addEventListener("click", function() {
            const name = document.getElementById("checkout_name").value.trim();
            const email = document.getElementById("checkout_email").value.trim();
            const address = document.getElementById("checkout_address").value.trim();

            if (!name || !email || !address) {
                alert("Please fill in your details.");
                return;
            }

            renderOrderSummary(
                order_summary_items,
                ordersuccess_subtotal,
                ordersuccess_shipping,
                ordersuccess_taxes,
                ordersuccess_total
            );

            checkout.hidden = true;
            payment_success.hidden = false;

            localStorage.removeItem("cart");
            window.scrollTo(0,0);
        });
    }
}
