// Translation dictionaries for Localization (EN / RU)
const translations = {
    en: {
        brand: "JSAWS-Store Products",
        nav_main: "Main",
        nav_products: "Products",
        nav_contacts: "Contacts",
        catalog_title: "Catalog of products",
        hide_desc: "Hide description",
        show_desc: "Show description",
        animate_btn: "Animate the heading",
        order_btn: "Order",
        modal_title: "Connect with us",
        form_name: "Name",
        form_email: "Email",
        form_msg: "Message",
        form_submit: "Submit",
        footer: "© 2026 JSAWS. All rights reserved",
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
        brand: "JSAWS-Store Products",
        nav_main: "Главная",
        nav_products: "Товары",
        nav_contacts: "Контакты",
        catalog_title: "Каталог товаров",
        hide_desc: "Скрыть описание",
        show_desc: "Показать описание",
        animate_btn: "Анимировать заголовок",
        order_btn: "Заказать",
        modal_title: "Свяжитесь с нами",
        form_name: "Имя",
        form_email: "Эл. почта",
        form_msg: "Сообщение",
        form_submit: "Отправить",
        footer: "© 2026 JSAWS. Все права защищены",
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

// Language-use function
function setLanguage(lang) {
    localStorage.setItem('selectedLang', lang);
    $('#langSwitch').val(lang);
    
    $('[data-i18n]').each(function() {
        let key = $(this).attr('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            $(this).text(translations[lang][key]);
        }
    });
}

$(document).ready(function() {
    // Initialize language on boot (default 'en')
    let currentLang = localStorage.getItem('selectedLang') || 'en';
    setLanguage(currentLang);

    // Language change handler in the selector
    $('#langSwitch').change(function() {
        setLanguage($(this).val());
    });

    // 1. JSON Integration: Dynamic loading of products on the products.html page
    if ($('#product-container').length > 0) {
        $.getJSON('products.json', function(data) {
            let htmlContent = '';
            data.forEach(product => {
                let orderBtnText = currentLang === 'ru' ? 'Заказать' : 'Order';
                htmlContent += `
                    <div class="col-md-4 mb-4">
                        <div class="card h-100 shadow-sm product-card">
                            <img src="${product.image}" class="card-img-top" alt="Product">
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title">${product.name}</h5>
                                <p class="card-text">${product.description}</p>
                                <p class="fw-bold text-primary mt-auto">${product.price}</p>
                                <button class="btn btn-primary buy-btn" data-name="${product.name}" data-price="${product.price}">${orderBtnText}</button>
                            </div>
                        </div>
                    </div>
                `;
            });
            $('#product-container').html(htmlContent);
        }).fail(function() {
            $('#product-container').html('<p class="text-center text-danger">Failed to load products from JSON.</p>');
        });
    }

    // Handling the contact form in the modal window
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        let name = $('#nameInput').val().trim();
        let email = $('#emailInput').val().trim();
        let message = $('#messageInput').val().trim();
        
        if(name === "" || email === "" || message === "") {
            $('#formAlert').html('<div class="alert alert-danger">Please fill in all fields!</div>');
        } else {
            let successMsg = currentLang === 'ru' ? 'Спасибо! Ваше сообщение отправлено.' : 'Thank you! Your message has been sent.';
            $('#formAlert').html(`<div class="alert alert-success">${successMsg}</div>`);
            $('#contactForm')[0].reset();
            
            setTimeout(function() {
                $('#contactModal').modal('hide');
                $('#formAlert').html('');
            }, 1500);
        }
    });

    // Management of product descriptions (hide / show)
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
        let productName = localStorage.getItem('selectedProduct') || 'JSAWS Raman spectrometers V3.5 Lab';
        let productPrice = localStorage.getItem('selectedPrice') || '85 000$';
        
        $('#orderProductName').text(productName);
        $('#orderProductPrice').text(productPrice);
        
        let queue = 1;
        if (productName.includes('Lab')) {
            queue = Math.floor(Math.random() * 100) + 1;
        } else if (productName.includes('Electron')) {
            queue = Math.floor(Math.random() * 10) + 1;
        } else {
            queue = Math.floor(Math.random() * 7) + 1;
        }
        $('#queueNumber').text('№ ' + queue);
        
        let queueNum = parseInt($('#queueNumber').text().replace('№ ', '')) || 1;

        let prepDays = 1;
        if (productName.includes('Lab')) {
            prepDays = 35; 
        } else if (productName.includes('Electron')) {
            prepDays = 104;
        } else {
            prepDays = 112;
        }

        let readyDate = new Date();
        readyDate.setDate(readyDate.getDate() + prepDays + queueNum);
        
        let options = { year: 'numeric', month: 'long', day: 'numeric' };
        $('#readyTime').text(readyDate.toLocaleDateString(currentLang === 'ru' ? 'ru-RU' : 'en-US', options));

        $('#checkoutForm').on('submit', function(e) {
            e.preventDefault();
            let name = $('#customerName').val().trim();
            let phone = $('#customerPhone').val().trim();
            let address = $('#customerAddress').val().trim();

            if(name === "" || phone === "" || address === "") {
                let errText = currentLang === 'ru' ? 'Заполните все поля!' : 'Fill in all fields to place an order!';
                $('#orderAlert').html(`<div class="alert alert-danger">${errText}</div>`);
            } else {
                let succText = currentLang === 'ru' ? 'Заказ успешно оформлен! Ждите звонка оператора.' : 'Order successfully placed! Wait for a call from the operator.';
                $('#orderAlert').html(`<div class="alert alert-success">${succText}</div>`);
                $('#checkoutForm')[0].reset();
                localStorage.removeItem('selectedProduct');
                localStorage.removeItem('selectedPrice');
            }
        });
    }
});