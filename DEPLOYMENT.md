# Deployment Notlari

Secilen platform: **Vercel**

## Ortam Degiskenleri

Vercel proje ayarlarina su degiskenleri eklenmeli:

- `VITE_APP_URL`
- `VITE_ADMIN_USERNAME`
- `VITE_ADMIN_PASSWORD`
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

## Build ve Publish

1. Build komutu: `npm run build`
2. Output: Vite varsayilan ciktisi `dist`
3. Framework preset: `Vite`

## Yayin Sonrasi Smoke Test

1. Ana sayfaya girip bugun menusu gorunuyor mu kontrol et
2. Tarih secimi degistirip menu degisimi kontrol et
3. Admin login ile menu kaydet
4. Kaydedilen menunun ziyaretci ekraninda gorundugunu dogrula
5. QR kod indirip telefonla tarayarak URL acildigini kontrol et
