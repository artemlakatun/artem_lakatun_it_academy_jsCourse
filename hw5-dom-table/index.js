document.addEventListener("DOMContentLoaded", function () {
    fetch('https://dummyjson.com/products').then(res => res.json()).then((data) => {
        const products = data.products;
        const cards = document.querySelectorAll('.card');
        products.forEach((product, index) => {
            const card = cards[index];
            if (card) {
                // Находим элементы в карточке
                const image = card.querySelector(".card-img-top");
                const title = card.querySelector(".card-title");
                const description = card.querySelector(".card-text");
                const price = card.querySelector(".price");
                const rating = card.querySelector('.rating');
                const lastCardButton = card.querySelector('.btn');

                // Заполняем элементы данными из API
                image.src = product.images[0];
                title.textContent = product.title;
                description.textContent = product.description;
                price.textContent = `Price: $${product.price}`;
                rating.textContent = product.rating;
                lastCardButton.textContent = 'Add to cart';

                // Добавление обработчика на кнопку "Add to cart" в карточке
                lastCardButton.addEventListener("click", function () {
                    event.preventDefault();
                    const priceMatch = price.textContent.match(/\$([\d.]+)/);
                    if (priceMatch) {
                        const itemPrice = parseFloat(priceMatch[1]);
                        const imageSrc = product.images[0];
                        addToCart(itemPrice, title.textContent, imageSrc);
                    }
                });
            }
        });
    });

    // Находим кнопку поиска и все карточки
    const searchButton = document.querySelector(".btn-outline-success");
    const cards = document.querySelectorAll(".card");

    // Добавляем обработчик для кнопки поиска
    searchButton.addEventListener("click", function (event) {
        event.preventDefault();
        const searchInput = document.querySelector(".form-control-me");
        const searchText = searchInput.value.toLowerCase();

        // Перебираем все карточки
        cards.forEach((card) => {
            const cardTitle = card.querySelector(".card-title");
            // Проверяем, содержит ли заголовок карточки искомый текст
            if (cardTitle.textContent.toLowerCase().includes(searchText)) {
                card.style.display = "block"; // Показываем карточку
            } else {
                card.style.display = "none"; // Скрываем карточку
            }
        });

        updateCardStyles(); // Обновляем стили карточек
    });

    // Находим кнопку заказа в хэдере, меню заказа и связанные элементы
    const headerOrderButton = document.querySelector(".btn-primaryOnce");
    const orderMenu = document.querySelector(".order-menu");
    const overlay = document.querySelector(".overlay");
    const closeButton = document.querySelector(".close-button");

    // Добавляем обработчик для кнопки заказа в хэдере
    headerOrderButton.addEventListener("click", function () {
        orderMenu.classList.add("open"); // Открываем меню заказа
        overlay.style.display = "block"; // Показываем оверлей
        overlay.classList.toggle("active");
        updateOrderMenu(); // Обновляем меню корзины
    });

    // Добавляем обработчик для кнопки закрытия меню заказа
    closeButton.addEventListener("click", function () {
        orderMenu.classList.remove("open"); // Закрываем меню заказа
        overlay.style.display = "none"; // Скрываем оверлей
    });

    updateCardStyles(); // Обновляем стили карточек
});

let totalCartAmount = 0;
const cartItems = [];

function addToCart(price, title, imageSrc) {
    totalCartAmount += price;
    cartItems.push({ title, price, imageSrc, quantity: 1 }); // Начальное количество: 1
    updateCartTotal();
    updateOrderMenu(cartItems);
}

function updateCartTotal() {
    const headerOrderButton = document.querySelector(".btn-primaryOnce");
    const totalPriceElement = document.querySelector(".total-amount");

    if (headerOrderButton && totalPriceElement) {
        headerOrderButton.textContent = `Your cart - $${totalCartAmount.toFixed(2)}`;
        totalPriceElement.textContent = `$${totalCartAmount.toFixed(2)}`;
    }
}

function updateOrderMenu() {
    const orderMenuContent = document.querySelector(".order-menu .order-content");
    const orderButton = document.querySelector(".order-button");

    if (orderMenuContent && orderButton) {
        clearOrderMenuContent(orderMenuContent);

        if (cartItems.length === 0) {
            displayEmptyCartMessage(orderMenuContent);
            orderButton.disabled = true;
            orderButton.classList.add("disabled"); // Добавляем класс для затемнения
        } else {
            displayCartItems(orderMenuContent, cartItems);
            orderButton.disabled = false;
            orderButton.classList.remove("disabled"); // Убираем класс затемнения
        }
    }
}

function clearOrderMenuContent(orderMenuContent) {
    while (orderMenuContent.firstChild) {
        orderMenuContent.removeChild(orderMenuContent.firstChild);
    }
}

function displayEmptyCartMessage(orderMenuContent) {
    const emptyCartMessage = document.createElement("div");
    emptyCartMessage.classList.add("empty-cart");
    emptyCartMessage.textContent = "Cart is empty";
    orderMenuContent.appendChild(emptyCartMessage);
}

function displayCartItems(orderMenuContent, cartItems) {
    cartItems.forEach((item, index) => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("order-item", "order-item-details");
        itemElement.innerHTML = `
            <div class="order-item-image-div"><img src="${item.imageSrc}" alt="${item.title}" class="order-item-image"></div>     
            <div class="order-item-title">${item.title}</div>
            <div class="order-item-price">
                <button class="quantity-button minus">-</button>
                <span class="quantity">${item.quantity}x</span>
                $${(item.price * item.quantity).toFixed(2)}
                <button class="quantity-button plus">+</button>
            </div>
            <div class="remove-button-div"><button class="remove-button">Remove from order</button></div>
        `;

        const quantityElement = itemElement.querySelector('.quantity');
        const plusButton = itemElement.querySelector('.plus');
        const minusButton = itemElement.querySelector('.minus');
        const removeButton = itemElement.querySelector('.remove-button');

        plusButton.addEventListener('click', () => {
            item.quantity += 1; // Увеличиваем количество
            totalCartAmount += item.price; // Увеличиваем сумму
            quantityElement.textContent = item.quantity;
            updateCartTotal();
            updateOrderMenu();
        });

        minusButton.addEventListener('click', () => {
            if (item.quantity > 1) {
                item.quantity -= 1; // Уменьшаем количество
                totalCartAmount -= item.price; // Уменьшаем сумму
                quantityElement.textContent = item.quantity;
                updateCartTotal();
                updateOrderMenu();
            }
        });

        removeButton.addEventListener('click', () => {
            totalCartAmount -= item.price * item.quantity; // Уменьшаем сумму на стоимость товара
            cartItems.splice(index, 1); // Удаляем товар из корзины
            updateCartTotal();
            updateOrderMenu();
        });

        orderMenuContent.appendChild(itemElement);
    });
}



// Функция для обновления стилей карточек
function updateCardStyles() {
    const cards = document.querySelectorAll('.card');
    if (cards.length > 0) {
        const maxCardHeight = Math.max(...Array.from(cards).map(card => card.offsetHeight));
        cards.forEach(card => {
            card.style.height = `${maxCardHeight}px`; // Устанавливаем одинаковую высоту для всех карточек
        });
    }
}