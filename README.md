# Discord Token Yönetim Merkezi

Çoklu Discord kullanıcı oturumu yönetimi, ses kanalı otomasyonu, toplu sunucuya katılım (OAuth2 + bot) ve profil güncellemeleri için tek panelden çalışan bir **Discord User Simulation System** arayüzüdür. Arayüz Türkçe; koyu tema ve kontrol paneli odaklı bir yapı sunar.

## Ekran görüntüleri

<table>
  <tr>
    <td width="50%" align="center" valign="top">
      <b>Kontrol Merkezi</b><br />
      <sub>Özet metrikler, gateway grafikleri, 24 saatlik aktivite ve canlı log</sub><br /><br />
      <img src="https://github.com/user-attachments/assets/94ba98e2-ad84-4f41-a08b-a3b31438d10b" alt="Kontrol Merkezi panosu" width="100%" />
    </td>
    <td width="50%" align="center" valign="top">
      <b>Hesap Yönetimi</b><br />
      <sub>Hesap listesi, ses/yayın durumu, gateway ve başlatma aksiyonları</sub><br /><br />
      <img src="https://github.com/user-attachments/assets/d36e2f30-4d5c-489c-a08d-9d3b7f321787" alt="Hesap yönetimi" width="100%" />
    </td>
  </tr>
  <tr>
    <td width="50%" align="center" valign="top">
      <b>Yeni Hesap Ekle</b><br />
      <sub>Bağlantı bilgileri, davranış profili, çalışma saatleri ve gece modu</sub><br /><br />
      <img src="https://github.com/user-attachments/assets/13192051-ee39-4492-a982-ff69506031c4" alt="Yeni hesap ekleme" width="100%" />
    </td>
    <td width="50%" align="center" valign="top">
      <b>Toplu Token Joiner</b><br />
      <sub>Bot OAuth2 alanları, hedef sunucu, gecikme ve satır satır token listesi</sub><br /><br />
      <img src="https://github.com/user-attachments/assets/d41e8bb3-b19d-4c79-8dd6-1d6d98fd241b" alt="Toplu token joiner" width="100%" />
    </td>
  </tr>
  <tr>
    <td colspan="2" align="center" valign="top">
      <b>Token Araçları</b><br />
      <sub>Toplu profil düzenleme: avatar, hakkımda, durum, birincil sunucu; isteğe bağlı 2captcha</sub><br /><br />
      <img src="https://github.com/user-attachments/assets/1d03d161-01c1-4ca5-b44d-2f0a3324e9ca" alt="Token araçları" width="85%" />
    </td>
  </tr>
</table>

## Uyarı

Bu yazılım, Discord’un **Hizmet Şartları** ve geliştirici politikaları ile uyumlu olmayan kullanımlara yol açabilir. Hesap kapatma, erişim kısıtlaması veya hukuki sonuçlar doğurabilir. Bu depo yalnızca **eğitim ve kendi sistemlerinizde test** amaçlı düşünülmelidir; kötüye kullanımdan proje sahibi sorumlu tutulamaz. Token’ları asla herkese açık repolara veya ekran görüntülerine koymayın.

## Özellikler

### Kontrol Merkezi

- Genel özet: aktif hesaplar, ses kanalındakiler, canlı yayın sayıları
- Gateway / WebSocket odaklı metrik kartları ve görselleştirmeler
- 24 saatlik aktivite eğrisi, ağ/davranış analizi ve gateway log akışı

### Hesap Yönetimi

- Token ile hesap ekleme; sunucu (guild) ve ses kanalı ID’leri
- İstemci türü (ör. mobil görünüm), presence (çevrimiçi, rahatsız etme vb.)
- Başlangıç ses durumu: mikrofon, kulaklık, Go Live, kamera
- Çalışma saatleri ve gece modu ile otomatik oturum planlama
- Davranış profili: oyun, yayın, AFK, ses aksiyonu ve rastgelelik oranları

### Toplu Token Joiner

- Bot **Client ID**, **Client Secret**, **Bot Token** ile OAuth2 akışı
- Hedef sunucu ID ve token’lar arası gecikme (rate limit için)
- Satır satır token listesi ve canlı işlem logları
- Discord Developer Portal’da OAuth2 **Redirects** adresinin, uygulamada kullandığın `redirect_uri` ile **birebir aynı** olması gerekir (varsayılan kodda `http://localhost:3002`; `.env` ile değiştirilebilir)

### Token Araçları

- Toplu veya seçili hesaplarda: avatar, hakkımda, özel durum/aktivite, birincil sunucu
- Avatar değişiminde Discord tarafında captcha gerekebilir; isteğe bağlı **2captcha** API anahtarı (ortam değişkeni veya panelden)

## Kullanılan Diller

- **Next.js** (React 19), **TypeScript**
- Özel HTTP sunucusu: **Next + Socket.IO** (`server.ts`)
- **MongoDB** (Mongoose)
- **axios**, **ws** — Discord API ve gerçek zamanlı iletişim
- **Recharts**, **Tailwind CSS**, **Framer Motion**

## Kurulması Gerekenler

- **Node.js** (LTS önerilir)
- Çalışan bir **MongoDB** örneği (yerel veya uzak)

## Kurulum

```bash
git clone <repo-url>
cd "Discord Token Manager"
npm install
```

Proje kökünde `.env` oluştur:

```env
# Sunucu
PORT=3000
NODE_ENV=development

# Veritabanı
MONGODB_URI=mongodb://localhost:27017/darkdaysdev

# Token Joiner OAuth2 — Discord Portal’daki Redirects ile AYNI olmalı
OAUTH2_REDIRECT_URI=http://localhost:3002

# İsteğe bağlı: avatar vb. için captcha çözümü
TWOCAPTCHA_API_KEY=
```

**Port notu:** Varsayılan uygulama portu `PORT` ile **3000**’dir. Joiner tarafında `OAUTH2_REDIRECT_URI` kodda varsayılan olarak **http://localhost:3002** kullanılır; Discord uygulamanın OAuth yönlendirmesi ile `JoinerService` içindeki `redirect_uri` **aynı string** olmalıdır. İkisini uyumlu hale getirmek için örneğin `PORT=3002` ve `OAUTH2_REDIRECT_URI=http://localhost:3002` kullanabilir veya her ikisini de 3000 yapıp Portal’ı buna göre güncelleyebilirsin.

## Çalıştırma

**(PM2):**

```bash
pm2 start ecosystem.config.js
```

**Yerel geliştirme:**

```bash
npm start
# veya
npm run dev
```

Tarayıcı: `http://localhost:<PORT>` (varsayılan 3000).

## Token Joiner — Discord tarafı

1. [Discord Developer Portal](https://discord.com/developers/applications) üzerinde uygulama ve bot oluştur.
2. OAuth2 → **Redirects** bölümüne `.env`’deki `OAUTH2_REDIRECT_URI` değerini ekle.
3. Botun hedef sunucuda olması ve **guilds.join** akışının sunucu için uygun şekilde yapılandırılmış olması gerekir.
4. Panelde Client ID, Secret, Bot Token ve hedef **Guild ID** gir; token listesini satır satır yapıştır; gecikmeyi makul tut (ör. birkaç saniye).

