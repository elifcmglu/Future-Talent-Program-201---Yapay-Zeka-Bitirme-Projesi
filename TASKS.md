# ✅ Görev Listesi (PRD Tabanlı)

Bu görevler `prd.md` içeriğine göre MVP geliştirme için hazırlanmıştır.

## 1) Proje Kurulumu ve Altyapı

- [x] React + Vite proje kurulumunu tamamla
- [x] Tailwind CSS kurulumunu yap ve temel tema ayarlarını oluştur
- [x] Uygulama klasör yapısını oluştur (`components`, `pages`, `services`, `types`, `utils`)
- [x] Ortam değişkenleri yapısını oluştur (`.env.example`)
- [x] Temel routing yapısını kur (`/` ziyaretçi, `/admin` yönetici)

## 2) Veri Modeli ve Backend Kararı

- [x] Backend seçimini netleştir (Firebase veya Node.js + MongoDB)
- [x] Menü veri modelini tanımla
  - [x] `date`
  - [x] `items[]` (isim, kalori, alerjenler)
- [x] Alerjen sözlüğünü tanımla (gluten, süt, yumurta vb.)
- [x] Örnek seed veri seti hazırla (en az 7 günlük menü)
- [x] Veri erişim katmanı oluştur (menü çekme, ekleme, güncelleme)

## 3) Ziyaretçi Arayüzü (Ana Sayfa)

- [x] Açılışta otomatik olarak bugünün menüsünü getir
- [x] "Günün Özeti" bölümünü tasarla ve bağla
- [x] `YemekKartı` bileşenini geliştir
  - [x] Yemek adı gösterimi
  - [x] Kalori bilgisi gösterimi
  - [x] Alerjen ikonları gösterimi
- [x] Tarih gezgini geliştir
  - [x] Geri/ileri gün butonları
  - [x] Alternatif tarih seçici
- [x] Seçilen tarihe göre menü verisini dinamik güncelle
- [x] Veri yoksa kullanıcı dostu boş durum mesajı göster

## 4) Yönetici Paneli

- [x] Admin giriş ekranını geliştir (kullanıcı adı + şifre)
- [x] Basit kimlik doğrulama akışını uygula
- [x] Giriş sonrası admin panel sayfasını göster
- [x] Menü veri giriş formunu geliştir
  - [x] Tarih seçimi
  - [x] Yemek satırı ekleme/silme
  - [x] Kalori alanı
  - [x] Alerjen multi-select alanı
- [x] Form doğrulamalarını ekle
- [x] Kayıt/güncelleme işlemlerini backend’e bağla

## 5) QR Kod Özelliği

- [ ] Bu sürümde QR kod özelliği kapsam dışı (kullanıcı talebi)

## 6) UX, Performans ve Mobil Uyumluluk

- [x] Mobile-first responsive tasarımı tüm ekranlarda doğrula
- [x] Ziyaretçi tarafında giriş/kayıt ekranı olmadığını garanti et
- [x] Menü verisi çekiminde cache-friendly strateji uygula
- [x] Yükleme, hata ve boş durumları tüm kritik ekranlarda yönet
- [x] Temel erişilebilirlik kontrollerini tamamla (kontrast, odak, etiketler)

## 7) Test ve Kalite

- [x] Temel bileşen testleri yaz (`YemekKartı`, `TarihGezgini`)
- [x] Kritik akış testleri yaz (bugün menüsü, tarih değişimi, admin login, veri kaydetme)
- [x] Manuel test checklist’i oluştur
- [x] Hata loglama/izleme için minimum izlenebilirlik ekle

## 8) Yayınlama

- [x] Vercel veya Netlify hedefini seç
- [x] Ortam değişkenlerini deployment ortamına taşı
- [ ] İlk MVP deployment’ını al
- [ ] Yayın sonrası hızlı smoke test yap

## 9) MVP Tamamlanma Kriterleri (Definition of Done)

- [x] Ziyaretçi bugünün menüsünü giriş yapmadan görebiliyor
- [x] Yemek adı, kalori ve alerjenler doğru listeleniyor
- [x] Farklı tarihler arasında sorunsuz gezilebiliyor
- [x] Admin menü ekleme/güncelleme yapabiliyor
- [ ] QR kod özelliği bu sürümde yok
- [x] Mobil kullanımda temel UX problemleri giderilmiş

