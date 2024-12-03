// Sepet için başlangıç değerleri
let cart = [];
let total = 0;

// Sepete yemek ekleme fonksiyonu
function addToCart(itemName, itemPrice) {
    // Sepete yeni bir ürün ekle
    cart.push({ name: itemName, price: itemPrice });
    total += itemPrice;

    // Sepeti güncelle
    updateCart();
}

// Sepet içeriğini güncelleyen fonksiyon
function updateCart() {
    const cartItems = document.getElementById('cart-items'); // Sepet liste öğesi
    const totalPrice = document.getElementById('total-price'); // Toplam fiyat

    // Önce mevcut içeriği temizle
    cartItems.innerHTML = '';

    if (cart.length === 0) {
        cartItems.innerHTML = '<li>Sepetiniz boş.</li>';
    } else {
        // Sepetteki ürünleri listele
        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - ₺${item.price}`;
            cartItems.appendChild(li);
        });
    }

    // Toplam fiyatı güncelle
    totalPrice.textContent = `Toplam: ₺${total}`;
}

// Sipariş tamamlama fonksiyonu
function checkout() {
    if (cart.length === 0) {
        alert('Sepetiniz boş!');
    } else {
        alert('Siparişiniz alındı. Teşekkür ederiz!');
        // Sepeti temizle
        cart = [];
        total = 0;
        updateCart();
    }
}
