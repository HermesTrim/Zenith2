// Sepet için boş bir liste tanımlıyoruz
let cart = [];

// Sepete yemek ekleme fonksiyonu
function addToCart(itemName, itemPrice) {
    // Sepete yeni bir yemek nesnesi ekliyoruz
    cart.push({ name: itemName, price: itemPrice });
    updateCart();
}

// Sepet içeriğini güncelleyen fonksiyon
function updateCart() {
    // Sepet listesini temizliyoruz
    const cartList = document.getElementById('cart-list');
    cartList.innerHTML = '';

    // Her yemek için yeni bir liste öğesi oluşturuyoruz
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ₺${item.price}`;
        cartList.appendChild(li);
    });
}

// Sipariş gönderme fonksiyonu
function submitOrder() {
    if (cart.length === 0) {
        alert('Sepetiniz boş!');
    } else {
        alert('Siparişiniz alındı. Teşekkür ederiz!');
        cart = []; // Sepeti temizliyoruz
        updateCart(); // Sepeti güncelliyoruz
    }
}
// Siparişi gönderme fonksiyonunu güncelliyoruz
function submitOrder() {
    if (cart.length === 0) {
        alert('Sepetiniz boş!');
    } else {
        // Sipariş bilgilerini JSON formatında localStorage'a kaydediyoruz
        localStorage.setItem('order', JSON.stringify(cart));
        
        // Sepeti temizliyoruz ve anasayfaya yönlendiriyoruz
        cart = []; 
        updateCart(); 
        
        // siparis.html sayfasına yönlendiriyoruz
        window.location.href = 'siparis.html';
    }
}
// IndexedDB veritabanını aç veya oluştur
const request = indexedDB.open("ZenithRestaurantDB", 1);

// Veritabanı yükseltme aşamasında tabloları (object stores) oluştur
request.onupgradeneeded = function(event) {
    const db = event.target.result;
    
    // "orders" adlı bir object store oluştur
    if (!db.objectStoreNames.contains("orders")) {
        db.createObjectStore("orders", { keyPath: "id", autoIncrement: true });
    }
};

// Hata kontrolü
request.onerror = function(event) {
    console.error("Veritabanı hatası:", event.target.error);
};

// Başarılı bağlantı
request.onsuccess = function(event) {
    console.log("IndexedDB bağlantısı başarılı!");
};
function addOrder(orderData) {
    const dbRequest = indexedDB.open("ZenithRestaurantDB", 1);

    dbRequest.onsuccess = function(event) {
        const db = event.target.result;
        const transaction = db.transaction("orders", "readwrite");
        const store = transaction.objectStore("orders");
        
        // Sipariş verisini ekle
        const addRequest = store.add(orderData);

        addRequest.onsuccess = function() {
            console.log("Sipariş başarıyla eklendi:", orderData);
        };

        addRequest.onerror = function(event) {
            console.error("Sipariş eklenemedi:", event.target.error);
        };
    };
}

// Örnek sipariş verisi
const exampleOrder = {
    customerName: "Ahmet Yılmaz",
    items: [
        { name: "Mercimek Çorbası", quantity: 1, price: 30 },
        { name: "Çoban Salata", quantity: 2, price: 40 }
    ],
    total: 110,
    date: new Date().toISOString()
};

// Siparişi veritabanına ekleme
addOrder(exampleOrder);
function fetchOrders() {
    const dbRequest = indexedDB.open("ZenithRestaurantDB", 1);

    dbRequest.onsuccess = function(event) {
        const db = event.target.result;
        const transaction = db.transaction("orders", "readonly");
        const store = transaction.objectStore("orders");
        
        const getRequest = store.getAll();

        getRequest.onsuccess = function() {
            const orders = getRequest.result;
            console.log("Siparişler:", orders);
        };

        getRequest.onerror = function(event) {
            console.error("Siparişler alınamadı:", event.target.error);
        };
    };
}

// Siparişleri getir
fetchOrders();
function deleteOrder(orderId) {
    const dbRequest = indexedDB.open("ZenithRestaurantDB", 1);

    dbRequest.onsuccess = function(event) {
        const db = event.target.result;
        const transaction = db.transaction("orders", "readwrite");
        const store = transaction.objectStore("orders");
        
        const deleteRequest = store.delete(orderId);

        deleteRequest.onsuccess = function() {
            console.log(`Sipariş (ID: ${orderId}) başarıyla silindi.`);
        };

        deleteRequest.onerror = function(event) {
            console.error("Sipariş silinemedi:", event.target.error);
        };
    };
}

// Örnek: 1 ID'li siparişi sil
deleteOrder(1);
