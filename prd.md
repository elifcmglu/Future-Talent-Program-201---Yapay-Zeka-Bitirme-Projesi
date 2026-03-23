# 📋 Ürün Gereksinim Dokümanı (PRD)
## Proje: Yemekhane Menü Uygulaması (University Menu App)

**Hazırlayan:** Elif Cumaoğlu  
**Sürüm:** 1.0  
**Tarih:** 23 Mart 2026  
**Durum:** Planlama / MVP Geliştirme

---

## 1. Proje Vizyonu
Kullanıcıların (öğrenci ve personel) herhangi bir hesap oluşturma zahmetine katlanmadan; günlük ve haftalık yemek menüsüne, kalori bilgilerine ve alerjen uyarılarına en hızlı şekilde ulaşmasını sağlayan, mobil öncelikli bir web uygulamasıdır.

---

## 2. Kullanıcı Rolleri & Hikayeleri
### 👤 Ziyaretçi (Öğrenci/Personel)
* **Hikaye:** "Yemekhane sırasındayken bugünün menüsünü ve toplam kalori miktarını anında görmek istiyorum."
* **Hikaye:** "Alerjim olduğu için yemeklerin içindeki malzemeleri (süt, gluten vb.) net bir şekilde ayırt etmek istiyorum."

### 🔑 Yönetici (Admin)
* **Hikaye:** "Haftalık menüyü sisteme hızlıca girmek ve gerektiğinde kalori bilgilerini güncellemek istiyorum."

---

## 3. Fonksiyonel Gereksinimler

### 3.1. Ana Sayfa (Ziyaretçi Arayüzü)
- **Günün Özeti:** Uygulama açıldığında otomatik olarak "Bugün" menüsü listelenir.
- **Yemek Kartı Bileşeni:** - Yemek Adı
    - Kalori Bilgisi (Örn: 450 kcal)
    - Alerjen İkonları (Gluten 🌾, Süt 🥛, Yumurta 🥚 vb.)
- **Tarih Gezgini:** Geri/İleri butonları veya basit bir takvim seçici ile farklı günlerin menüsüne erişim.

### 3.2. Yönetici Paneli
- **Kimlik Doğrulama:** Basit bir kullanıcı adı ve şifre ile giriş.
- **Veri Giriş Formu:** - Tarih seçimi.
    - Yemek satırları ekleme/silme.
    - Kalori miktarı girişi.
    - Alerjen etiketlerini işaretleme (Multi-select).
- **QR Kod Üretici:** Uygulamanın URL'sini içeren ve fiziksel panolara asılabilecek bir QR kod indirme butonu.

---

## 4. Teknik Mimari (Öneri)
- **Frontend:** React + Vite (Hızlı render ve modern yapı).
- **Styling:** Tailwind CSS (Responsive tasarım kolaylığı).
- **Backend/DB:** - *Seçenek A:* Firebase (Hızlı prototipleme için DB + Auth bir arada).
    - *Seçenek B:* Node.js + MongoDB (Daha ölçeklenebilir bir yapı).
- **Yayınlama:** Vercel veya Netlify (Ücretsiz ve hızlı deployment).

---

## 5. Tasarım ve UX İlkeleri
- **Mobile-First:** Tasarım tamamen akıllı telefon ekranlarına göre optimize edilmelidir.
- **Sıfır Sürtünme:** "Giriş yap" veya "Kayıt ol" ekranı ziyaretçiye asla gösterilmez.
- **Hız:** Menü verileri veritabanından optimize edilmiş şekilde (cache-friendly) çekilmelidir.

---

> **Not:** Bu döküman projenin temel çerçevesini belirler. Teknik geliştirmeye başlamadan önce bu yapı referans alınmalıdır.