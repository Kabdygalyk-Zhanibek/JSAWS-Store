// Complete translation dictionaries for localization (EN / RU)
const translations = {
    en: {
        brand: "JSAWS-Store",
        nav_main: "Main",
        nav_products: "Products",
        nav_contacts: "Contacts",
        // Index page
        carousel_title_1: "New technology for scientists",
        carousel_text_1: "Best high-precision and reliable gadgets",
        carousel_btn_1: "View catalog",
        carousel_title_2: "Discounts of up to 2% on supercomputers",
        carousel_text_2: "Make sure to get in line for our products",
        carousel_btn_2: "Catalog",
        why_title: "Why you can choose us",
        feature_title_1: "Quick creation and sending",
        feature_text_1: "Your order will be ready in 5 to 16 weeks and it will be delivered in less than 132 hours, wherever you are.",
        feature_title_2: "Guarantee of quality",
        feature_text_2: "We will replace the product if it breaks within 10 years while being used according to the instructions.",
        feature_title_3: "Support only on Sunday (9:00-18:00)",
        feature_text_3: "Someone will help you :D",
        // Products page
        catalog_title: "Catalog of products",
        hide_desc: "Hide description",
        show_desc: "Show description",
        animate_btn: "Animate the heading",
        order_btn: "Order",
        // Contact modal & general
        modal_title: "Connect with us",
        form_name: "Name",
        form_email: "Email",
        form_msg: "Message",
        form_submit: "Submit",
        footer: "© 2026 JSAWS. All rights reserved",
        // Order page
        order_title: "Placing an order",
        order_details: "Your order details",
        selected_product: "Selected product:",
        price_label: "Price:",
        queue_label: "Your queue number:",
        ready_label: "Estimated ready time:",
        full_name: "Your full name",
        phone_label: "Phone number",
        address_label: "Delivery address",
        confirm_btn: "Confirm order",
        not_selected: "Not selected"
    },
    ru: {
        brand: "JSAWS-Store",
        nav_main: "Главная",
        nav_products: "Товары",
        nav_contacts: "Контакты",
        // Index page
        carousel_title_1: "Новые технологии для ученых",
        carousel_text_1: "Лучшие высокоточные и надежные гаджеты",
        carousel_btn_1: "Посмотреть каталог",
        carousel_title_2: "Скидки до 2% на суперкомпьютеры",
        carousel_text_2: "Успейте встать в очередь за нашей продукцией",
        carousel_btn_2: "Каталог",
        why_title: "Почему выбирают нас",
        feature_title_1: "Быстрое создание и отправка",
        feature_text_1: "Ваш заказ будет готов через 5-16 недель и доставлен менее чем за 132 часа в любую точку мира.",
        feature_title_2: "Гарантия качества",
        feature_text_2: "Мы заменим товар, если он сломается в течение 10 лет при условии соблюдения инструкций.",
        feature_title_3: "Поддержка только в воскресенье (9:00-18:00)",
        feature_text_3: "Кто-нибудь вам обязательно поможет :D",
        // Products page
        catalog_title: "Каталог товаров",
        hide_desc: "Скрыть описание",
        show_desc: "Показать описание",
        animate_btn: "Анимировать заголовок",
        order_btn: "Заказать",
        // Contact modal & general
        modal_title: "Свяжитесь с нами",
        form_name: "Имя",
        form_email: "Эл. почта",
        form_msg: "Сообщение",
        form_submit: "Отправить",
        footer: "© 2026 JSAWS. Все права защищены",
        // Order page
        order_title: "Оформление заказа",
        order_details: "Детали вашего заказа",
        selected_product: "Выбранный товар:",
        price_label: "Цена:",
        queue_label: "Ваш номер в очереди:",
        ready_label: "Примерное время готовности:",
        full_name: "Ваше ФИО",
        phone_label: "Номер телефона",
        address_label: "Адрес доставки",
        confirm_btn: "Подтвердить заказ",
        not_selected: "Не выбрано"
    }
};

// Global variable for storing products from JSON
let allProducts = [];

// Function for rendering product cards depending on the selected language
function renderProducts(lang) {
    if ($('#product-container').length === 0) return;

    let htmlContent = '';
    allProducts.forEach(product => {
        // Choosing a language for the title and description
        let name = lang === 'ru' ? product.RU_name : product.name;
        let desc = lang === 'ru' ? product.RU_description : product.description;
        let orderBtnText = lang === 'ru' ? 'Заказать' : 'Order';
        
        htmlContent += `
            <div class="col-md-4 mb-4">
                <div class="card h-100 shadow-sm product-card">
                    <img src="${product.image}" class="card-img-top p-3" alt="Product" style="height: 220px; object-fit: contain;">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${name}</h5>
                        <p class="card-text small text-muted">${desc}</p>
                        <p class="fw-bold text-primary mt-auto">${product.price}</p>
                        <button class="btn btn-primary buy-btn" data-name="${name}" data-price="${product.price}">${orderBtnText}</button>
                    </div>
                </div>
            </div>
        `;
    });
    $('#product-container').html(htmlContent);
}

// Function for changing the overall interface language
function setLanguage(lang) {
    localStorage.setItem('selectedLang', lang);
    $('#langSwitch').val(lang);
    
    // Translate static elements with the data-i18n attribute
    $('[data-i18n]').each(function() {
        let key = $(this).attr('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            $(this).text(translations[lang][key]);
        }
    });

    // We redraw the products based on the selected language
    renderProducts(lang);
}

$(document).ready(function() {
    let currentLang = localStorage.getItem('selectedLang') || 'en';
    setLanguage(currentLang);

    // Handler for changing the language in the selector
    $('#langSwitch').change(function() {
        let newLang = $(this).val();
        setLanguage(newLang);
    });

    // Load products from JSON once when the page is opened
    if ($('#product-container').length > 0) {
        $.getJSON('products.json', function(data) {
            allProducts = data; // Save in memory
            renderProducts(currentLang); // Render based on the current language
        }).fail(function() {
            $('#product-container').html('<p class="text-center text-danger">Failed to load products from JSON.</p>');
        });
    }

    // Contact form handling in the modal window
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        let name = $('#nameInput').val().trim();
        let email = $('#emailInput').val().trim();
        let message = $('#messageInput').val().trim();
        let lang = localStorage.getItem('selectedLang') || 'en';
        
        if(name === "" || email === "" || message === "") {
            let errText = lang === 'ru' ? 'Пожалуйста, заполните все поля!' : 'Please fill in all fields!';
            $('#formAlert').html(`<div class="alert alert-danger">${errText}</div>`);
        } else {
            let successMsg = lang === 'ru' ? 'Спасибо! Ваше сообщение отправлено.' : 'Thank you! Your message has been sent.';
            $('#formAlert').html(`<div class="alert alert-success">${successMsg}</div>`);
            $('#contactForm')[0].reset();
            
            setTimeout(function() {
                $('#contactModal').modal('hide');
                $('#formAlert').html('');
            }, 1500);
        }
    });

    // Manage product descriptions (hide / show)
    $(document).on('click', '#hideBtn', function() {
        $('.card-text').fadeOut(400);
    });

    $(document).on('click', '#showBtn', function() {
        $('.card-text').fadeIn(400);
    });

    // Header animation
    $(document).on('click', '#animateBtn', function() {
        $('h2.text-center').animate({
            fontSize: '2.5rem',
            opacity: 0.7
        }, 300).animate({
            fontSize: '2rem',
            opacity: 1
        }, 300);
    });

    // Saving the selected product and navigating to the order page
    $(document).on('click', '.buy-btn', function() {
        let productName = $(this).data('name');
        let productPrice = $(this).data('price');
        
        localStorage.setItem('selectedProduct', productName);
        localStorage.setItem('selectedPrice', productPrice);
        
        window.location.href = 'order.html';
    });

    // Logic for the order page (order.html)
    if (window.location.pathname.includes('order.html')) {
        let productName = localStorage.getItem('selectedProduct');
        let productPrice = localStorage.getItem('selectedPrice');
        let lang = localStorage.getItem('selectedLang') || 'en';
        
        if (productName) {
            $('#orderProductName').text(productName);
            $('#orderProductPrice').text(productPrice);
        } else {
            $('#orderProductName').text(lang === 'ru' ? 'Не выбрано' : 'Not selected');
            $('#orderProductPrice').text('0 $');
        }
        
        let queue = Math.floor(Math.random() * 50) + 1;
        $('#queueNumber').text('№ ' + queue);

        let prepDays = 14;
        let readyDate = new Date();
        readyDate.setDate(readyDate.getDate() + prepDays + queue);
        
        let options = { year: 'numeric', month: 'long', day: 'numeric' };
        let dateFormatted = readyDate.toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'en-US', options);
        let daysText = lang === 'ru' ? `(через ${prepDays + queue} дней)` : `(through ${prepDays + queue} days)`;
        $('#readyTime').text(dateFormatted + ' ' + daysText);

        $('#checkoutForm').on('submit', function(e) {
            e.preventDefault();
            let name = $('#customerName').val().trim();
            let phone = $('#customerPhone').val().trim();
            let address = $('#customerAddress').val().trim();

            if(name === "" || phone === "" || address === "") {
                let errText = lang === 'ru' ? 'Заполните все поля для оформления заказа!' : 'Fill in all fields to place an order!';
                $('#orderAlert').html(`<div class="alert alert-danger">${errText}</div>`);
            } else {
                let succText = lang === 'ru' ? 'Заказ успешно оформлен! Ждите звонка оператора.' : 'Order successfully placed! Wait for a call from the operator.';
                $('#orderAlert').html(`<div class="alert alert-success">${succText}</div>`);
                $('#checkoutForm')[0].reset();
                localStorage.removeItem('selectedProduct');
                localStorage.removeItem('selectedPrice');
            }
        });
    }
});