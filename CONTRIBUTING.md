# Slim Moms'a Katkıda Bulunma Rehberi

Slim Moms projesine katkı sağlamak istiyorsan bu dokümanı dikkatlice okumanı öneririm. Bu doküman geliştirme süreci, branch kullanımı, pull request akışı ve temel kuralları açıklar.

---

## Projeyi Kurma

### 1. Repository'yi Klonla

GitHub'daki repo sayfasına git, yeşil **Code** butonuna tıkla ve HTTPS linkini kopyala. Ardından terminalde çalıştır:

```bash
git clone https://github.com/kullanici-adi/slim-moms.git
cd slim-moms
```

### 2. Kendi Branch'ine Geç

Branch'ine doğrudan geç:

```bash
git checkout kendi-branch-adin
```

Örneğin;

```bash
git checkout feature/register-page
```

### 3. Main Branch ile Güncel Kal

Kendi branchinde olduğundan emin oldudktan sonra main branchindeki güncel dosyaları aldığından emin olmalısın:

```bash
git pull origin main
```

### 4. Bağımlılıkları Yükle

Proje `frontend/` ve `backend/` olarak iki ayrı klasörden oluşur. Her birinin bağımlılıklarını ayrı ayrı yüklemelisin:

```bash
cd frontend
npm install

cd ../backend
npm install
```

> `node_modules` klasörü git'e dahil edilmemiştir, her klonlamada bu adımı uygulamalısın.

### 5. Ortam Değişkenlerini Ayarla

> Bu adım yalnızca **backend** üzerinde çalışan arkadaşlar için geçerlidir.

`backend/.env` dosyası güvenlik nedeniyle repoya dahil edilmemiştir. Kendi bilgilerinle oluşturman gerekir:

```bash
cd backend
cp .env.example .env
```

Ardından `.env` dosyasını açıp şu alanları doldur:

```
PORT=5000
MONGODB_USER=Atlas kullanıcı adı
MONGODB_PASSWORD=Atlas şifresi (takım liderinden alın)
MONGODB_URL=cluster0.audyhuc.mongodb.net
MONGODB_DB=slim-moms-db

JWT_SECRET=Takım tarafından paylaşılan ortak secret kullanılmalı
JWT_EXPIRES_IN=7d
```

> MongoDB Atlas'ta ücretsiz bir cluster oluşturabilirsin. Bağlantı string'ini Atlas panelinden **Connect > Drivers** adımını izleyerek alabilirsin.

> `.env` dosyasını **asla commit'leme** — zaten `.gitignore` ile hariç tutulmuştur.

## Günlük Çalışma Akışı

Kod yazmadan önce her gün main'deki son değişiklikleri çek, hepsini tek seferde değil adım adım yapmalısın, öncelikle kendi branch'inde olduğundan emin olduktan sonra main branch'teki güncel değişiklikleri çek::

```bash
git checkout kendi-branch-adin
git pull origin main
npm install
```

`npm install` yeni bir bağımlılık eklendiğinde yapılmalıdır.

Örneğin;

```bash
git checkout feature/login-page
```

> Bu adım, takım arkadaşlarının yaptığı değişiklikleri sana getirir ve ileride oluşabilecek conflict'leri önler.

### 6. Uygulamayı Çalıştırma

İki ayrı terminalde çalıştırman gerekir:

```bash
# Terminal 1 — Backend
cd backend
npm run dev

# Terminal 2 — Frontend
cd frontend
npm run dev
```

### 7. Değişiklikleri Push Et

Kodunu yazdıktan sonra kendi branch'ine push et:

```bash
git add .
git commit -m "feat: yaptığın şeyin açıklaması"
git push origin kendi-branch-adin
```

Örneğin;

```bash
git push origin feature/register-page
```

### 8. Pull Request Süreci

Kodunu yazdıktan sonra:

1. Değişikliklerini branch'ine push et:

```bash
git push origin feature/gelir-ekleme-ekrani
```

2. GitHub'da **Compare & pull request** butonuna tıkla

3. PR başlığını ve açıklamasını doldur. Açıklamaya şunu ekle:

```
Closes #3
```

Bu sayede PR merge edilince issue otomatik kapanır.

4. **Reviewers** kısmına takım liderini ekle

5. **Create pull request** ile gönder

### 9. PR Açıklaması Şablonu

```
## Ne Yaptım?
Gelir ekleme ekranı oluşturuldu.

## Nasıl Test Edilir?
1. Uygulamayı çalıştır
2. "Gelir Ekle" butonuna tıkla
3. Formu doldur ve kaydet

## İlgili Issue
Closes #3
```

---

## Code Review Süreci

1. PR açtıktan sonra takım liderinin incelemesini bekle.
2. Değişiklik istenirse yorumlara göre düzenle ve yeni commit at.
3. Onay verildikten sonra takım lideri merge eder.
4. Proje tamamlandığında ve tüm değişiklikler merge edildikten sonra branch silinebilir.

---

---

## Genel Kurallar

- `main` branch'ine **direkt push yapamazsın**. Tüm değişiklikler PR üzerinden yapılır.
- Her görev için ayrı bir **issue** ve **branch** açılır.
- Commit mesajları **açıklayıcı** olmalıdır.
- PR'lar **takım lideri tarafından** incelenir ve merge edilir.

---

## İş Akışı

Bu iş akışı sadece Takım Lideriniz tarafından sürecin nasıl yönetildiğini tanıtmaya yöneliktir.

```
Issue aç → Branch oluştur → Kodu yaz → Push et → PR aç → İnceleme → Merge
```

---

## Issue Nedir?

Issue, GitHub üzerinde bir görevi, hatayı veya iyileştirme önerisini takip etmek için açılan bir kayıttır. Kısaca "yapılacak iş kartı" gibi düşünebilirsin.

Örneğin:

- "Login sayfası tasarımı yapılacak" → `feature` issue
- "Butona tıklayınca hata veriyor" → `bug` issue

Her issue'nun otomatik bir **numarası** olur (ör. `#3`). Bu numarayı PR açıklamasında kullanırsın, böylece hangi kodun hangi göreve ait olduğu net olur.

---

## Issue Açma

1. GitHub'da **Issues** sekmesine git
2. **New issue** butonuna tıkla
3. Başlık ve açıklamayı doldur
4. Uygun **label** ekle:
   - `feature` → Yeni özellik
   - `bug` → Hata düzeltme
   - `refactor` → Kod iyileştirme
   - `docs` → Dokümantasyon
5. **Assignee** kısmından kendini ata
6. Issue'yu kaydet ve **numarasını not al** (branch adında kullanacaksın)

---

## Commit Mesajları

Commit mesajları ne yapıldığını açıkça belirtmelidir.

### Format

```
tip: kısa açıklama
```

### Örnekler

```
feat: kayıt formu tamamlandı
fix: frontend tarafındaki boşluk hatası giderildi
refactor: authentication servisi yeniden düzenlendi
docs: kurulum adımları güncellendi
style: buton renkleri düzenlendi
```

### Commit Tipleri

| Tip        | Ne Zaman                          |
| ---------- | --------------------------------- |
| `feat`     | Yeni özellik                      |
| `fix`      | Bug düzeltme                      |
| `refactor` | Kod iyileştirme                   |
| `docs`     | Dokümantasyon                     |
| `style`    | Sadece görsel değişiklik          |
| `chore`    | Bağımlılık, config güncellemeleri |

---

## Branch Oluşturma

> **Not:** Herkesin branch'i zaten oluşturulmuş durumdadır. Yeni bir branch açman gerekmiyor. Bu bölüm yalnızca bilgi amaçlıdır.

### VS Code'da Branch Oluşturma

**Terminal ile:**

```bash
git checkout main
git pull origin main
git checkout -b feature/register-page
```

**VS Code arayüzü ile:**

1. Sol alt köşede `main` yazan yere tıkla
2. **Create new branch** seç
3. Branch adını yaz

---

> Herhangi bir konuda takılırsan takım liderine sormayı unutma 🫡
