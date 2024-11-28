// Siparişleri IndexedDB'den alma ve tabloya ekleme fonksiyonu
function loadOrders() {
    const dbRequest = indexedDB.open("ZenithRestaurantDB", 1);

    dbRequest.onsuccess = function(event) {
        const db = event.target.result;
        const transaction = db.transaction("orders", "readonly");
        const store = transaction.objectStore("orders");
        
        const getRequest = store.getAll();

        getRequest.onsuccess = function() {
            const orders = getRequest.result;
            const tableBody = document.querySelector("#orders-table tbody");
            
            // Siparişleri tabloya ekleyelim
            orders.forEach(order => {
                const row = document.createElement("tr");
                
                // Sipariş detaylarını tabloya ekle
                row.innerHTML = `
                    <td>${order.id}</td>
                    <td>${order.customerName}</td>
                    <td>
                        ${order.items.map(item => `${item.name} (${item.quantity} adet)`).join(", ")}
                    </td>
                    <td>₺${order.total}</td>
                    <td>${new Date(order.date).toLocaleString()}</td>
                `;
                tableBody.appendChild(row);
            });
        };

        getRequest.onerror = function(event) {
            console.error("Siparişler alınamadı:", event.target.error);
        };
    };

    dbRequest.onerror = function(event) {
        console.error("Veritabanı hatası:", event.target.error);
    };
}

// Sayfa yüklendiğinde siparişleri getir
document.addEventListener("DOMContentLoaded", loadOrders);
