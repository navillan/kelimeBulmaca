# Kelime Bulmaca

Beş harfli Türkçe kelimeleri 7 tahminde bulmaya çalıştığınız, Wordle esintili mini bir web oyunu. Türkçe karakter desteği (Ç, Ğ, İ, I, Ö, Ş, Ü), renk kodlu geri bildirim, sanal klavye ve yerel depolanan seri/puan sistemi içerir.

## Özellikler

- 5 harfli kelime bulmaca, 7 satır/tahmin hakkı
- Türkçe alfabe desteği: Ç, Ğ, İ, I, Ö, Ş, Ü
- Renk kodları:
	- Yeşil: Doğru harf, doğru konum
	- Sarı: Doğru harf, yanlış konum
	- Kırmızı: Kelimede yok
- Sanal klavye ve tek tıkla giriş (Enter ⏎, Sil ⌫)
- Skor/seri takibi: localStorage ile `Güncel Seri`, `Güncel Seri Skoru`, `En Yüksek Seri`, `En Yüksek Seri Skoru`
- Puanlama: Kullanmadığınız her satır için +1 puan; kazandıkça seri artar, kaybedince seri sıfırlanır
- Rastgele kelime ve kelime sözlüğü: Firebase Firestore koleksiyonundan çekilir
- Geri bildirim/öneri formu: Mesajlar Firestore’a kaydedilir

## Oyun Kuralları

- Her satırda 5 harfli geçerli bir Türkçe kelime girin.
- Enter (⏎) ile tahmini gönderin, Sil (⌫) ile son harfi silin.
- Hedef kelimeyi en fazla 7 denemede bulun.
- Doğru tahminde, kullanmadığınız her satır başına +1 puan alırsınız; seri ve seri skoru artar.
- Bilemezseniz seri ve seri skoru sıfırlanır.

## Teknolojiler

- React (react-scripts)
- Firebase (Firestore, Analytics)
- jQuery (öneri formu aç/kapat ve basit doğrulama)
- Düz CSS

## Kurulum ve Çalıştırma

Ön koşullar: Node.js ve npm kurulu olmalıdır.

1) Bağımlılıkları yükleyin

```powershell
cd kelimeBulmaca
npm install
```

2) Geliştirme sunucusunu başlatın

```powershell
npm start
```

Varsayılan olarak http://localhost:3000 adresinde açılır.

### NPM Script’leri

- `start`: Geliştirme sunucusunu başlatır.

> Not: Şu an `build` script’i tanımlı değildir. İhtiyacınıza göre `react-scripts build` ekleyebilirsiniz.

## Firebase Ayarları

Proje, Firebase’i `src/index.js` içinde doğrudan yapılandırır. Kendi projenizle kullanmak isterseniz şu adımları izleyin:

1) Firebase konsolunda bir proje oluşturun ve Web uygulaması ekleyin.
2) Firestore’u etkinleştirin.
3) `src/index.js` içindeki `firebaseConfig` nesnesini kendi projenizin kimlik bilgileriyle değiştirin.
4) Firestore’da koleksiyonları hazırlayın:
	 - `harfler`: Her belge, değerleri 5 harfli TÜRKÇE KELİMELER olan bir nesne içermelidir. Uygulama rastgele bir belge ve içindeki rastgele bir kelimeyi hedef olarak seçer. Örnek belge verisi:

		 ```json
		 {
			 "A1": "ARABA",
			 "A2": "ARMUT",
			 "B1": "BALIK"
		 }
		 ```

	 - `suggestions`: Öneri formundan gelen mesajlar burada tutulur; uygulama her gönderim için zaman damgasına göre bir belge oluşturur.

> Güvenlik: Üretim ortamında Firestore güvenlik kurallarını uygun şekilde yapılandırın. İsteğe bağlı olarak Firebase yapılandırmasını `.env` dosyasına taşıyabilirsiniz (CRA ile `REACT_APP_` ön ekini kullanın).

## Klasör Yapısı (özet)

```
kelimeBulmaca/
	src/
		components/
			App.js           # Uygulama kabuğu
			mainHeader.js    # Başlık ve kurallar
			kelimeTablosu.js # Oyun tahtası, giriş ve kontrol mantığı
			klavye.js        # Sanal klavye
			skor.js          # Skorların görüntülenmesi
			resultAlert.js   # Kazanma/kaybetme bildirimi
			tahminKelime.js  # Doğru harflerin özet görünümü
			sendToUs.js      # Öneri formu
		hooks/
			useGetKelime.js        # Firestore’dan kelime ve sözlük çekme
			useCheckValidWord.js   # Tahminin sözlükte olup olmadığını kontrol etme
			useUpdateScores.js     # Seri ve puan güncellemeleri (localStorage)
			useSendToUs.js         # Önerileri Firestore’a gönderme
		index.js           # React ve Firebase başlatma
		index.css          # Stil dosyaları
	package.json         # `start` komutu ve bağımlılıklar
```

## Katkıda Bulunma

1) Fork → Branch → Değişiklik → PR akışını takip edin.
2) Net commit mesajları yazın ve küçük, odaklı PR’lar açın.

## Lisans

ISC (paket bilgilerine bakınız).

---

# Kelime Bulmaca (English)

A mini, Wordle-inspired web game where you try to guess 5-letter Turkish words in up to 7 attempts. It includes Turkish character support (Ç, Ğ, İ, I, Ö, Ş, Ü), color-coded feedback, an on-screen keyboard, and a locally stored streak/score system.

## Features

- 5-letter word puzzle with 7 attempts
- Turkish alphabet support: Ç, Ğ, İ, I, Ö, Ş, Ü
- Color feedback:
	- Green: correct letter in the correct position
	- Yellow: correct letter in the wrong position
	- Red: letter not in the word
- On-screen keyboard with Enter (⏎) and Backspace (⌫)
- Streak/score tracking via localStorage: `Current Streak`, `Current Streak Score`, `Highest Streak`, `Highest Streak Score`
- Scoring: +1 point for each unused row when you win; streak increases on win and resets on loss
- Random target word and dictionary backed by Firebase Firestore
- Feedback/Suggestion form: messages are saved to Firestore

## Rules

- Enter a valid 5-letter Turkish word on each row.
- Submit with Enter (⏎), delete last letter with Backspace (⌫).
- Find the target within 7 attempts.
- On a win, you earn +1 point per unused row; your streak and streak score increase.
- On a loss, your streak and streak score reset to zero.

## Tech Stack

- React (react-scripts)
- Firebase (Firestore, Analytics)
- jQuery (for toggling the suggestion form and simple validation)
- Plain CSS

## Setup and Run

Prerequisites: Node.js and npm installed.

1) Install dependencies

```powershell
cd kelimeBulmaca
npm install
```

2) Start the dev server

```powershell
npm start
```

Opens at http://localhost:3000 by default.

### NPM Scripts

- `start`: Launches the development server.

> Note: A `build` script isn’t defined yet. Add `react-scripts build` if you need production builds.

## Firebase Setup

The project initializes Firebase directly in `src/index.js`. To use your own project:

1) Create a project in the Firebase console and add a Web app.
2) Enable Firestore.
3) Replace the `firebaseConfig` in `src/index.js` with your credentials.
4) Prepare Firestore collections:
	 - `harfler`: Each document contains an object whose values are 5-letter TURKISH WORDS. The app picks a random document and a random value in it as the target word. Example document payload:

		 ```json
		 {
			 "A1": "ARABA",
			 "A2": "ARMUT",
			 "B1": "BALIK"
		 }
		 ```

	 - `suggestions`: Stores messages submitted from the suggestion form; the app creates a document per submission using a timestamp ID.

> Security: In production, configure Firestore security rules appropriately. Optionally move Firebase config into `.env` (with CRA’s `REACT_APP_` prefix).

## Folder Structure (snapshot)

```
kelimeBulmaca/
	src/
		components/
			App.js           # App shell
			mainHeader.js    # Title and rules
			kelimeTablosu.js # Board, input, and game logic
			klavye.js        # On-screen keyboard
			skor.js          # Score display
			resultAlert.js   # Win/Lose modal
			tahminKelime.js  # Summary of correct letters
			sendToUs.js      # Suggestion form
		hooks/
			useGetKelime.js        # Fetch words and dictionary from Firestore
			useCheckValidWord.js   # Validate guess against dictionary
			useUpdateScores.js     # Update streak and points (localStorage)
			useSendToUs.js         # Send suggestions to Firestore
		index.js           # React + Firebase bootstrap
		index.css          # Styles
	package.json         # `start` script and dependencies
```

## Contributing

1) Follow the Fork → Branch → Change → PR workflow.
2) Write clear commits and prefer small, focused PRs.

## License

ISC (see package metadata).

