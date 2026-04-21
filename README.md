# Slim Moms 🥗

Slim Moms, günlük kalori takibi ve beslenme yönetimi için geliştirilen bir final proje uygulamasıdır. Proje, React tabanlı bir frontend ve Node.js + Express tabanlı bir backend yapısından oluşur.

## Proje Amaci

Kullanicilarin:

- gunluk kalori ihtiyacini hesaplayabilmesi
- tükettigi urunleri takip edebilmesi
- diary kayitlarini yonetebilmesi
- kayit olma ve giris yapma islemlerini gerceklestirebilmesi

hedeflenmektedir.

## Kullanilan Teknolojiler

### Frontend

- React
- Vite
- Redux Toolkit
- React Redux
- React Router DOM
- Axios
- Formik
- React Hook Form
- Yup
- React Toastify
- CSS Modules

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- bcrypt
- Joi
- dotenv
- nodemon

## Proje Yapisi

```text
slim-moms/
├── backend/
│   ├── src/
│   │   ├── constants/
│   │   ├── controllers/
│   │   ├── db/
│   │   │   └── models/
│   │   ├── middlewares/
│   │   ├── routers/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── validation/
│   │   ├── index.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── README.md
```

## Backend Modulleri

- `auth`: kullanici kayit, giris ve oturum yonetimi
- `diary`: gunluk tuketim kayitlari
- `product`: urun listeleme ve urun bazli islemler
- `middlewares`: hata yonetimi ve kimlik dogrulama
- `validation`: istek dogrulama kurallari

## Frontend Modulleri

- `auth`: giris, kayit ve kullanici oturumu
- `calculator`: gunluk kalori hesaplama akisi
- `diary`: gunluk urun ekleme ve listeleme akisi
- `global`: ortak uygulama durumu
- `components`: tekrar kullanilabilir arayuz bilesenleri
- `pages`: sayfa bazli yapilar

## Kurulum

Projeyi bilgisayariniza klonladiktan sonra asagidaki adimlari uygulayin.

### 1. Backend bagimliliklarini kurun

```bash
cd backend
npm install
```

### 2. Frontend bagimliliklarini kurun

```bash
cd ../frontend
npm install
```

## Ortam Degiskenleri

### Backend `.env`

`backend/.env.example` dosyasini kopyalayip `backend/.env` olarak olusturun.

Ornek degiskenler:

```env
PORT=5000
MONGODB_USER=your_mongodb_user
MONGODB_PASSWORD=your_mongodb_password
MONGODB_URL=cluster0.audyhuc.mongodb.net
MONGODB_DB=slim-moms-db
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
```

### Frontend `.env`

`frontend/.env.example` dosyasini kopyalayip `frontend/.env` olarak olusturun.

```env
VITE_API_URL=http://localhost:5000/api
```

## Projeyi Calistirma

### Backend development

```bash
cd backend
npm run dev
```

### Frontend development

```bash
cd frontend
npm run dev
```

## NPM Komutlari

### Backend

```bash
npm run dev
npm start
npm run lint
```

### Frontend

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## API Genel Yapi

Backend tarafinda su temel route gruplari bulunur:

- `/api/auth`
- `/api/diary`
- `/api/product`

Not: Route ve controller yapisinin bir kismi halen gelistirme asamasindadir.

## Mevcut Durum

Bu repo aktif gelistirme altindadir. Dosya yapisi, Redux klasorleri, sayfa ve API modulleri olusturulmustur; ancak bazi controller, route ve UI akislari halen tamamlanma asamasindadir.

Bu nedenle proje:

- mimari olarak organize edilmistir
- ekip ici gorev dagilimina uygundur
- frontend ve backend olarak ayrik sekilde ilerlemektedir
- bazi modullerde ek implementasyon gerektirmektedir

## Ekip Ici Calisma Kurali

- `main` branch takim lideri kontrolundedir
- her ekip uyesi kendi feature branch'inde calisir
- dogrudan `main` branch'ine push yapilmaz
- tamamlanan isler code review sonrasi merge edilir

## Lisans

Bu proje egitim ve final proje calismasi kapsaminda gelistirilmistir.
