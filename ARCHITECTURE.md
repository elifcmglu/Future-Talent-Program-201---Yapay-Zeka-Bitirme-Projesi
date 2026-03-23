# Teknik Mimari Karari

## Backend Secimi

MVP icin backend olarak **Firebase Firestore** secildi.

- Sebep 1: Hizli kurulum ve tek frontend icinden veri yonetimi
- Sebep 2: Admin panelden menu kayit/guncelleme ihtiyaci icin dusuk operasyon yuku
- Sebep 3: Ortam degiskenleri ile kolay deployment

## Fallback Stratejisi

Firebase ortam degiskenleri tanimli degilse uygulama otomatik olarak `localStorage` ile calisir.

- Gelistirme asamasinda bloklayici hata olmaz
- Demo ve MVP akislari kesintisiz devam eder
