document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Formun yenilenmesini önler

    // Form verilerini al
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Kullanıcıya gönderildi mesajı göster
    alert(`Teşekkürler ${name}! Mesajınız başarıyla gönderildi.`);

    // Formu sıfırla
    document.getElementById("contact-form").reset();
});
