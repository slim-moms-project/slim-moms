# Backend Auth Mentor Notes

Branch: `feature/backend-auth` By Çiğdem Ergal.

Bu dosya, backend auth gorevinde bizim ortak referans notumuzdur. Amacimiz sadece kod yazmak degil; projenin bizden ne istedigini, neyi neden yazdigimizi ve hangi adimda oldugumuzu acik sekilde takip etmektir.

## Gorev Bizden Ne Istiyor?

Backend tarafinda kullanici kayit, giris, cikis, oturum ve kimlik dogrulama akisinin tamamlanmasi bekleniyor.

Tamamlanmasi gereken ana parcalar:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/current`
- Auth middleware kontrolu
- Register/login validation kurallari
- User ve Session modelleri
- Auth endpointleri icin Swagger dokumantasyonu
- Request body, response body ve error response alanlarinin netlesmesi
- Gerekirse Bearer auth security yapisinin Swagger'a eklenmesi

## Projenin Mevcut Auth Durumu

Su dosyalar auth gorevinin merkezinde:

- `backend/src/db/models/user.js`
- `backend/src/db/models/session.js`
- `backend/src/validation/auth.js`
- `backend/src/services/auth.js`
- `backend/src/controllers/auth.js`
- `backend/src/routers/auth.js`
- `backend/src/middlewares/authenticate.js`
- `backend/docs/auth.swagger.js`

Su anki durum:

- Controller fonksiyonlari var ama icleri bos.
- Service fonksiyonlari var ama icleri bos.
- Router dosyasi var ama endpointler baglanmamis.
- Validation dosyasi Joi kullaniyor ama kurallar bos.
- User modeli bos.
- Session modeli bos.
- Swagger dosyasi bos.
- `authenticate.js` iskeleti daha hazir durumda ve access token'i `SessionsCollection` icinde ariyor.

## Mimari Mantik

Bu projede auth akisi katmanli ilerlemeli:

```text
Router -> Controller -> Service -> Model
```

Katmanlarin gorevi:

- Router: Hangi URL hangi controller'a gidecek?
- Controller: Request'i alir, service'i cagirir, response doner.
- Service: Asil is mantigini yapar.
- Model: MongoDB'de verinin seklini tanimlar.
- Validation: Request body dogru mu, eksik veya hatali alan var mi kontrol eder.
- Middleware: Korumali route'larda kullanicinin token'ini dogrular.

## Neden Bu Sirayla Gidecegiz?

En alttaki veri yapisi hazir olmadan ust katmanlari saglikli test edemeyiz. Bu nedenle once model, sonra validation, sonra service, sonra controller, sonra router yazacagiz.

Bizim siramiz:

1. User modelini tamamla.
2. Session modelini tamamla.
3. Register validation kurallarini yaz.
4. Login validation kurallarini yaz.
5. `registerUser` service fonksiyonunu yaz.
6. `registerUserController` fonksiyonunu yaz.
7. `POST /auth/register` route'unu bagla.
8. Register akisini test et.
9. `loginUser` service fonksiyonunu yaz.
10. `loginUserController` fonksiyonunu yaz.
11. `POST /auth/login` route'unu bagla.
12. Login akisini test et.
13. `GET /auth/current` controller ve route'unu yaz.
14. `POST /auth/logout` controller, service ve route'unu yaz.
15. Auth middleware davranisini kontrol et.
16. Swagger dokumantasyonunu yaz.
17. Genel lint/test/manual API kontrolu yap.

## Token ve Session Mantigi

Bu projede sadece JWT uretmek yeterli degil. `authenticate.js` token'i dogrudan JWT olarak verify etmek yerine `SessionsCollection` icinde ariyor.

Bu su anlama gelir:

- Login olunca access token ve refresh token uretilmeli.
- Bu tokenlar `sessions` koleksiyonuna kaydedilmeli.
- Korumali route'a istek geldiginde access token session icinde bulunmali.
- Logout yapilinca ilgili session silinmeli.
- Current user endpointi, `authenticate` middleware'inden gelen `req.user` bilgisini kullanmali.

## Frontend'in Beklentisi

Frontend auth slice su alanlari bekliyor:

```js
{
  user: {
    name,
    email
  },
  token
}
```

Bu nedenle register ve login response'larinda en azindan `user` ve `token` donmeliyiz. Password asla response icinde donmemeli.

## Adim Kayitlari

Her adimdan sonra buraya kisa not ekleyecegiz.

Format:

```text
Tarih:
Adim:
Ne yazdik:
Neden yazdik:
Nasil test ettik:
Sonuc:
```

### Adim 0 - Iskelet Incelemesi

Tarih: 2026-04-23

Adim: Proje iskeleti incelendi.

Ne gorduk:

- Proje JavaScript ve ES module kullaniyor.
- Backend auth dosyalari iskelet halinde.
- `authenticate.js`, session tabanli token kontrolu bekliyor.
- `backend-auth` branch'i aktif.

Neden onemli:

- Gorev dogru klasorde ve dogru branch uzerinde yapilmali.
- Kod yazmadan once projenin mevcut mimarisine uymaliyiz.

Nasil test ettik:

- Dosya yapisi okundu.
- Auth, middleware, model, router ve frontend auth dosyalari incelendi.

Sonuc:

- Once User modeliyle baslayacagiz.

### Adim 1 - User Modeli

Tarih: 2026-04-23

Adim: `backend/src/db/models/user.js` dosyasinda kullanici modeli ogrenci tarafindan yazildi ve kontrol edildi.

Ne yazdik:

- `name` alani tanimlandi.
- `email` alani tanimlandi.
- `password` alani tanimlandi.
- `timestamps: true` ile `createdAt` ve `updatedAt` alanlari otomatik hale getirildi.
- `versionKey: false` ile MongoDB'nin `__v` alani kaldirildi.
- Mevcut `toJSON` metodu korundu, boylece password response'a donmeyecek.

Neden yazdik:

- Register akisi kullanici olustururken MongoDB'nin hangi alanlari bekledigini bilmesi gerekir.
- Email benzersiz olmali, cunku ayni email ile ikinci hesap acilmamali.
- Password veritabaninda tutulacak ama response icinde asla gosterilmemeli.

Nasil test ettik:

- `backend/src/db/models/user.js` dosyasi okundu.
- `npm.cmd run lint` calistirildi.

Sonuc:

- Lint temiz gecti.
- User modeli register service adimina hazir.

### Adim 2 - Session Modeli

Tarih: 2026-04-23

Adim: `backend/src/db/models/session.js` dosyasinda session modeli ogrenci tarafindan yazildi ve kontrol edildi.

Ne yazdik:

- `userId` alani tanimlandi.
- `accessToken` alani tanimlandi.
- `refreshToken` alani tanimlandi.
- `accessTokenValidUntil` alani tanimlandi.
- `refreshTokenValidUntil` alani tanimlandi.
- `timestamps: true` ile session kayit zamanlari otomatik hale getirildi.
- `versionKey: false` ile MongoDB'nin `__v` alani kaldirildi.

Neden yazdik:

- Bu projede token sadece uretilmiyor; session koleksiyonunda aktif olarak saklaniyor.
- `authenticate.js` gelen Bearer token'i `SessionsCollection` icinde `accessToken` alanina gore ariyor.
- Token suresi kontrolu icin `accessTokenValidUntil` alanina ihtiyac var.

Nasil test ettik:

- `backend/src/db/models/session.js` dosyasi okundu.
- Alan adlari `backend/src/middlewares/authenticate.js` icindeki kullanimlarla karsilastirildi.

Sonuc:

- Session modeli `authenticate.js` middleware'inin bekledigi alan adlariyla uyumlu.
- Login service adiminda tokenlar bu modele kaydedilebilecek.

### Adim 3 - Auth Validation

Tarih: 2026-04-23

Adim: `backend/src/validation/auth.js` dosyasinda register ve login Joi semalari ogrenci tarafindan yazildi ve kontrol edildi.

Ne yazdik:

- `registerUserSchema` icin `name`, `email`, `password` kurallari tanimlandi.
- `loginUserSchema` icin `email`, `password` kurallari tanimlandi.
- `name` icin minimum ve maksimum uzunluk kontrolu eklendi.
- `email` icin email format kontrolu eklendi.
- `password` icin minimum ve maksimum uzunluk kontrolu eklendi.

Neden yazdik:

- Hatalı veya eksik request body daha service katmanina gitmeden durdurulmali.
- Register icin kullanici adi, email ve sifre gerekir.
- Login icin sadece email ve sifre gerekir.
- Validation, controller ve service kodunun daha temiz kalmasini saglar.

Nasil test ettik:

- `backend/src/validation/auth.js` dosyasi okundu.
- Alanlarin `backend/src/db/models/user.js` ile uyumlu oldugu kontrol edildi.

Sonuc:

- Register ve login request body kurallari hazir.
- Siradaki adim `registerUser` service fonksiyonunu yazmak.

### Adim 4 - Register Service

Tarih: 2026-04-23

Adim: `backend/src/services/auth.js` dosyasinda `registerUser` service fonksiyonu ogrenci tarafindan yazildi ve kontrol edildi.

Ne yazdik:

- `bcrypt` import edildi.
- `createHttpError` import edildi.
- `UsersCollection` import edildi.
- Gelen email ile daha once kayitli kullanici var mi kontrol edildi.
- Email zaten kullaniliyorsa `409 Email in use` hatasi firlatildi.
- Password `bcrypt.hash(payload.password, 10)` ile hash'lendi.
- Kullanici `UsersCollection.create` ile veritabanina kaydedildi.

Neden yazdik:

- Service katmani asil is mantiginin durdugu yerdir.
- Ayni email ile ikinci kullanici olusturulmamali.
- Password asla plain text olarak veritabanina kaydedilmemeli.
- Controller sadece request/response akisini yonetmeli; kullanici olusturma mantigi service icinde kalmali.

Nasil test ettik:

- `backend/src/services/auth.js` dosyasi okundu.
- `npm.cmd run lint` calistirildi.

Sonuc:

- Lint temiz gecti.
- Register service, register controller tarafindan kullanilmaya hazir.

### Adim 5 - Register Controller

Tarih: 2026-04-23

Adim: `backend/src/controllers/auth.js` dosyasinda `registerUserController` fonksiyonu ogrenci tarafindan yazildi ve kontrol edildi.

Ne yazdik:

- `registerUserSchema` import edildi.
- `registerUser` service fonksiyonu import edildi.
- `req.body`, Joi `validateAsync` ile kontrol edildi.
- `abortEarly: false` ile tum validation hatalarinin yakalanmasi saglandi.
- Validation'dan gecen payload `registerUser` service fonksiyonuna gonderildi.
- Basarili kayit sonrasi `201` status kodu ile response donuldu.

Neden yazdik:

- Controller katmani request'i alir, validation yapar, service'i cagirir ve response doner.
- Kullanici olusturma is mantigi controller'a yazilmadi; service katmaninda tutuldu.
- `201 Created`, yeni bir kaynak olusturuldugu icin dogru HTTP status kodudur.

Nasil test ettik:

- `backend/src/controllers/auth.js` dosyasi okundu.
- `npm.cmd run lint` calistirildi.

Sonuc:

- Lint temiz gecti.
- Register controller route'a baglanmaya hazir.

### Adim 6 - Register Route

Tarih: 2026-04-23

Adim: `backend/src/routers/auth.js` dosyasinda register endpointi ogrenci tarafindan route'a baglandi ve kontrol edildi.

Ne yazdik:

- `ctrlWrapper` import edildi.
- `registerUserController` import edildi.
- `router.post('/register', ctrlWrapper(registerUserController))` route'u eklendi.
- ES module yapisi icin local importta `.js` uzantisi kullanildi.

Neden yazdik:

- Router, disaridan gelen HTTP istegini ilgili controller'a yonlendirir.
- `POST /auth/register` istegi artik `registerUserController` fonksiyonuna gidecek.
- `ctrlWrapper`, async controller hatalarini merkezi error handler'a aktarmak icin kullanildi.

Nasil test ettik:

- `backend/src/routers/auth.js` dosyasi okundu.
- `npm.cmd run lint` calistirildi.
- Manuel API testi denenmek istendi, ancak MongoDB baglantisi Node tarafinda hata verdigi icin tamamlanamadi.

Karsilasilan hata:

- Compass ayni connection string ile MongoDB Atlas'a baglanabildi.
- `nslookup`, Atlas SRV kayitlarini gorebildi.
- `npm run dev` sirasinda Node/Mongoose tarafinda `querySrv ECONNREFUSED _mongodb._tcp.cluster0.audyhuc.mongodb.net` hatasi alindi.
- Node surumu `v24.13.0` oldugu icin sorunun Node 24 / DNS SRV cozumu / ortam kaynakli olabilecegi not edildi.
- Bu nedenle register endpointi manuel olarak test edilmeden once MongoDB baglanti problemi ayrica cozulmeli.

Sonuc:

- Lint temiz gecti.
- Register endpointi kod olarak manuel API testi icin hazir.
- Manuel API testi MongoDB baglanti problemi nedeniyle bekletiliyor.

### Adim 7 - Login Service

Tarih: 2026-04-23

Adim: `backend/src/services/auth.js` dosyasinda `loginUser` service fonksiyonu ogrenci tarafindan yazildi ve kontrol edildi.

Ne yazdik:

- Gelen email ile kullanici `UsersCollection.findOne` ile arandi.
- Kullanici bulunamazsa `401 Invalid email or password` hatasi firlatildi.
- Gelen password, veritabanindaki hash'li password ile `bcrypt.compare` kullanilarak karsilastirildi.
- Password yanlissa yine `401 Invalid email or password` hatasi firlatildi.
- `jsonwebtoken` ile access token uretildi.
- `jsonwebtoken` ile refresh token uretildi.
- Uretilen tokenlar `SessionsCollection.create` ile session olarak MongoDB'ye kaydedildi.
- Service gecici olarak `user`, `accessToken` ve `refreshToken` dondurecek hale getirildi.

Neden yazdik:

- Login akisi kullanicinin once email ile bulunmasini, sonra password'un dogrulanmasini gerektirir.
- Email veya password hatasinda ayni mesaj donmek guvenlik acisindan daha dogrudur.
- Bu projede token'in sadece uretilmesi yetmez; `authenticate.js` access token'i session koleksiyonunda aradigi icin session kaydi da olusturulmalidir.
- Access token frontend'in korumali isteklere kimlik bilgisiyle gitmesini saglar.
- Refresh token daha uzun omurlu oturum yenileme akisi icin hazirliktir.

Nasil test ettik:

- `backend/src/services/auth.js` dosyasi okundu.
- Alan adlari `backend/src/db/models/session.js` ile karsilastirildi.
- `npm.cmd run lint` calistirildi.

Sonuc:

- Lint temiz gecti.
- `loginUser` service fonksiyonu controller tarafindan kullanilmaya hazir.

### Adim 8 - Login Controller ve Route

Tarih: 2026-04-23

Adim: `backend/src/controllers/auth.js` dosyasinda `loginUserController` yazildi ve `backend/src/routers/auth.js` dosyasinda login route'u baglandi.

Ne yazdik:

- `loginUserSchema` controller dosyasina import edildi.
- `loginUser` service fonksiyonu controller dosyasina import edildi.
- `loginUserController` icinde `req.body`, Joi `validateAsync` ile kontrol edildi.
- Login validation icin `abortEarly: false` kullanildi.
- Validation'dan gecen payload `loginUser` service fonksiyonuna gonderildi.
- Service'ten donen `user`, `accessToken` ve `refreshToken` ayrildi.
- Response icinde frontend beklentisi icin `token: accessToken` alanı donuldu.
- `refreshToken` response icinde ayrica donuldu.
- `backend/src/routers/auth.js` icinde `loginUserController` import edildi.
- `router.post('/login', ctrlWrapper(loginUserController))` route'u eklendi.

Neden yazdik:

- Controller, login istegini alir, validation yapar, service'i cagirir ve response doner.
- Login service'in dondurdugu access token'i frontend'in bekledigi `token` alanina map etmek gerekir.
- Router, `POST /api/auth/login` istegini login controller'a yonlendirmelidir.
- `ctrlWrapper`, async controller hatalarini merkezi error handler'a aktarmak icin kullanildi.

Nasil test ettik:

- `backend/src/controllers/auth.js` dosyasi okundu.
- `backend/src/routers/auth.js` dosyasi okundu.
- `npm.cmd run lint` calistirildi.

Sonuc:

- Lint temiz gecti.
- Login endpointi kod olarak tamamlandi.
- Manuel API testi MongoDB baglanti problemi nedeniyle bekletiliyor.

### Adim 9 - Logout Akisi

Tarih: 2026-04-24

Adim: `backend/src/middlewares/authenticate.js`, `backend/src/services/auth.js`, `backend/src/controllers/auth.js` ve `backend/src/routers/auth.js` dosyalarinda logout akisi ogrenci tarafindan yazildi ve kontrol edildi.

Ne yazdik:

- `authenticate` middleware'i icinde bulunan aktif session, `req.session = session` ile request'e eklendi.
- Expired token durumunda middleware'in akisi durdurmasi icin `return` eklendi.
- `logoutUser` service fonksiyonu `SessionsCollection.findByIdAndDelete(sessionId)` kullanacak sekilde yazildi.
- `logoutUserController` icinde `req.session._id` ile aktif session id'si alindi.
- Bu session id, `logoutUser(sessionId)` service fonksiyonuna gonderildi.
- Logout sonrasi `200 Successfully logged out` response'u donuldu.
- `authenticate` middleware'i logout route'una eklendi.
- `router.post('/logout', authenticate, ctrlWrapper(logoutUserController))` route'u baglandi.

Neden yazdik:

- Logout, sadece token'i istemci tarafinda silmek degil; backend tarafinda aktif session kaydini da silmek demektir.
- Bu projede `authenticate.js` access token'i `sessions` koleksiyonunda aradigi icin logout'ta session kaydinin silinmesi gerekir.
- Controller request'ten session id alir, service veritabani islemini yapar; bu katman ayrimi korunmustur.
- Logout endpointi protected olmalidir; sadece gecerli session'i olan kullanici kendi session'ini kapatabilmelidir.

Nasil test ettik:

- `backend/src/middlewares/authenticate.js` dosyasi okundu.
- `backend/src/services/auth.js` dosyasi okundu.
- `backend/src/controllers/auth.js` dosyasi okundu.
- `backend/src/routers/auth.js` dosyasi okundu.
- `npm.cmd run lint` calistirildi.

Sonuc:

- Lint temiz gecti.
- Logout akisi kod olarak tamamlandi.
- Manuel API testi MongoDB baglanti problemi nedeniyle bekletiliyor.

### Adim 10 - Current User Controller ve Route

Tarih: 2026-04-24

Adim: `backend/src/controllers/auth.js` dosyasinda `getCurrentUserController` yazildi ve `backend/src/routers/auth.js` dosyasinda current user route'u baglandi.

Ne yazdik:

- `getCurrentUserController` icinde `req.user` bilgisi response olarak donuldu.
- Current user icin ayrica service yazilmadi; middleware'den gelen kullanici bilgisi dogrudan kullanildi.
- `getCurrentUserController` router dosyasina import edildi.
- `router.get('/current', authenticate, ctrlWrapper(getCurrentUserController))` route'u eklendi.

Neden yazdik:

- `authenticate` middleware'i gecerli kullaniciyi zaten `req.user` icine koyuyor.
- Bu nedenle current user endpointinde ayni kullaniciyi veritabanindan tekrar aramaya gerek yok.
- Endpoint protected olmalidir; sadece dogrulanmis kullanici kendi bilgisine ulasabilmelidir.

Nasil test ettik:

- `backend/src/controllers/auth.js` dosyasi okundu.
- `backend/src/routers/auth.js` dosyasi okundu.
- `npm.cmd run lint` calistirildi.

Sonuc:

- Lint temiz gecti.
- Current user endpointi kod olarak tamamlandi.
- Manuel API testi MongoDB baglanti problemi nedeniyle bekletiliyor.

### Adim 11 - Auth Swagger ve Response Sozlesmesi

Tarih: 2026-04-24

Adim: `backend/docs/auth.swagger.js` dosyasinda auth endpointleri icin Swagger dokumantasyonu ogrenci tarafindan yazildi ve kontrol edildi.

Ne yazdik:

- `Auth` tag'i tanimlandi.
- `User`, `RegisterRequest` ve `LoginRequest` schema'lari tanimlandi.
- `RegisterResponse`, `LoginResponse`, `CurrentUserResponse`, `LogoutResponse` ve `AuthErrorResponse` schema'lari tanimlandi.
- `POST /api/auth/register` endpointi icin request ve response dokumantasyonu eklendi.
- `POST /api/auth/login` endpointi icin request ve response dokumantasyonu eklendi.
- `GET /api/auth/current` endpointi icin response ve `BearerAuth` security dokumantasyonu eklendi.
- `POST /api/auth/logout` endpointi icin response ve `BearerAuth` security dokumantasyonu eklendi.
- Path'lerde proje yapisina uygun olarak `/api/auth/...` kullanildi.
- Dosya sonuna `export {};` eklendi.

Neden yazdik:

- Swagger dokumantasyonu frontend ve backend arasindaki request/response sozlesmesini gorunur hale getirir.
- Schema'lari once ayri tanimlamak, endpointlerde `$ref` ile tekrar kullanmayi saglar ve dosyayi daha duzenli tutar.
- Protected route'larda `BearerAuth` kullanimi dokumantasyonda acikca belirtilmelidir.
- Swagger'i yazarken mevcut controller response yapisina sadik kalindi; logout icin `200` basari response'u kullanildi.

Nasil test ettik:

- `backend/docs/auth.swagger.js` dosyasi okundu.
- Swagger bloklarindaki girintiler ve `$ref` kullanimlari kontrol edildi.
- `npm.cmd run lint` calistirildi.

Sonuc:

- Lint temiz gecti.
- Auth endpointleri icin Swagger dokumantasyonu kod olarak tamamlandi.
- `/api-docs` uzerinden manuel goruntu kontrolu MongoDB baglanti problemi giderildikten sonra yapilacak.

### Adim 12 - MongoDB Baglanti Teshisi ve Manuel Auth Testleri

Tarih: 2026-04-24

Adim: MongoDB baglanti problemi farkli senaryolarla arastirildi, Node 20 altinda backend ayaga kaldirildi ve auth endpointleri manuel olarak test edildi.

Ne denedik:

- MongoDB Atlas `IP Access List` ekraninda `0.0.0.0/0` girdisinin aktif oldugu dogrulandi.
- Is yeri interneti yerine telefon hotspot'u ile deneme yapildi.
- Windows DNS ayari Cloudflare DNS (`1.1.1.1`, `1.0.0.1`) olacak sekilde degistirilerek tekrar denendi.
- Atlas'tan `mongodb+srv://...` yerine normal `mongodb://...` connection string alinarak test edildi.
- Atlas'ta olusturulan `cigdemtahtasiz_db_user` kullanicisi ve sifresiyle ayri denemeler yapildi.
- `Database Users` ekraninda kullanicinin gercekten var oldugu ve `atlasAdmin@admin` rolu tasidigi dogrulandi.
- Sifre resetlenip tekrar denendi.
- Kerem'in paylastigi ortak backend `.env` bilgileriyle tekrar test yapildi.
- Node 20.18.0'in tasinabilir surumu ile backend ayaga kaldirilarak calisma davranisi karsilastirildi.

Karsilasilan hatalar:

- Node 24 altinda:
  - `querySrv ECONNREFUSED _mongodb._tcp.cluster0.audyhuc.mongodb.net`
- Normal `mongodb://` connection string ile bazi denemelerde:
  - `getaddrinfo ENOTFOUND`
- Yanlis veya uyusmayan kullanici/sifre senaryolarinda:
  - `MongoServerError: bad auth : Authentication failed`

Bu hatalar bize ne anlatti:

- Sorun sadece auth kodu veya kullanici modeli kaynakli degildi.
- Atlas `IP Access List` dogru oldugu halde Node 24 tarafinda SRV/DNS cozumleme problemi devam etti.
- Kerem'in paylastigi ortak backend `.env` bilgileriyle de ayni `querySrv ECONNREFUSED` hatasi alindigi icin sorun kullaniciya ozel degil, ortam kaynakli gorundu.
- Node 20 altinda backend ayaga kalkabildigi icin sorun buyuk olasilikla Node 24 ve DNS/SRV cozumleme davranisiyla ilgilidir.

Node 20 bulgusu:

- Tasinabilir Node 20.18.0 ile backend calistirildi.
- `Mongo connection successfully established!` ve `Server is running on port 5000` loglari goruldu.
- Ayrica 5000 portunun dinledigi dogrulandi.

Manuel API testleri (Node 20 altinda):

- `POST /auth/register` -> `201 Created`
- `POST /auth/login` -> `200 OK`
- `GET /auth/current` -> `200 OK`
- `POST /auth/logout` -> `200 OK`
- Logout sonrasi ayni token ile `GET /auth/current` -> `401 Unauthorized`
- Logout sonrasi response mesajinda `Session not found` goruldu; bu, session silme mantiginin dogru calistigini gosterdi.

Nasil test ettik:

- Atlas `IP Access List` ve `Database Users` ekranlari kontrol edildi.
- Farkli ag senaryolari (is yeri interneti, telefon hotspot'u) denendi.
- DNS ayarlari degistirilerek tekrar denendi.
- Farkli Mongo connection string formatlari denendi.
- Farkli kullanici/sifre kombinasyonlari denendi.
- Node 20 altinda backend baslatildi.
- Postman ile auth endpointlerine manuel istekler gonderildi.

Sonuc:

- Auth endpointlerinin ana akisi manuel olarak dogrulandi.
- `register`, `login`, `current`, `logout` ve logout sonrasi `current` davranisi beklendigi gibi calisti.
- MongoDB baglanti problemi koddan ziyade Node 24 / DNS-SRV cozumleme davranisina bagli gorunuyor.
- Manuel testler Node 20 altinda basarili sekilde yapildi.

## Acik Kararlar

Bu kararlar kod yazarken netlestirilecek:

- Token sureleri ne olacak?
- Refresh token endpointi bu gorev kapsaminda mi, yoksa sadece service iskeleti olarak mi kalacak?
- Login response formatinda `token` alaninin yaninda `refreshToken` da donulmesi kabul edildi.
- Swagger security scheme merkezi olarak `backend/src/middlewares/swaggerDocs.js` icinde tanimlandi; endpoint bazli path dokumantasyonu `backend/docs/auth.swagger.js` icinde tutuldu.
- `POST /api/auth/register` response'unun sadece `user` mu, yoksa otomatik login gibi token da mi donecegi urun beklentisine gore ayrica netlestirilebilir.
- Swagger path'leri su an `/api/auth/...` olarak yazildi, fakat router yapisi su anda `/auth/...` altinda calisiyor. Swagger ile gercek route path'lerinin ayni yapida olup olmayacagi netlestirilmelidir.

## Mentor Notu

Bu dosyayi her adimda guncelleyecegiz. Bir kod parcasi yazdigimizda sadece "calisti" demeyecegiz; ne ise yaradigini ve neden o dosyaya yazildigini da buraya ekleyecegiz.

## Swagger Rehberi

Bu bolum, Swagger konusunu daha rahat hatirlamak icin kisa bir rehber olarak eklendi.

### Swagger Nedir?

Swagger, API endpointlerini yazili ve gorunur hale getiren dokumantasyon aracidir.

Bizim projede su sorulara cevap verir:

- Hangi endpoint var?
- Hangi HTTP method kullaniliyor?
- Request body nasil olmali?
- Basarili response nasil donuyor?
- Hata response'u nasil donuyor?
- Hangi endpoint token ister?

Yani Swagger, backend kodunun disariya acik sozlesmesini anlatir.

### Bu Projede Swagger Nerede?

Bu projede Swagger iki parcali kuruldu:

- `backend/src/middlewares/swaggerDocs.js`
- `backend/docs/*.js`

Gorev dagilimi soyle:

- `swaggerDocs.js`: genel Swagger config dosyasidir
- `backend/docs/*.js`: endpoint bazli dokumantasyon dosyalaridir

Biz auth endpointlerini su dosyada yazdik:

- `backend/docs/auth.swagger.js`

### Neden `swaggerDocs.js` Icinde Path Yazmiyoruz?

Takim liderinin belirttigi duzen su:

- Genel config tek yerde kalmali
- Her endpoint grubu kendi dokumantasyon dosyasinda olmali

Bunun faydasi:

- Auth endpointleri auth dosyasinda kalir
- Product endpointleri product dosyasinda kalir
- Dosyalar daha duzenli olur
- PR'larda gereksiz buyume azalir

### Swagger Dosyasinin Temel Mantigi

Bir Swagger dosyasini 3 katman gibi dusunebilirsin:

1. `tags`
2. `components.schemas`
3. `paths`

#### 1. Tags

`tags`, endpointleri Swagger ekraninda gruplandirir.

Ornek:

```js
/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: User registration and authentication operations
 */
```

Bu sayede auth endpointleri tek bir baslik altinda gorunur.

#### 2. Components / Schemas

`schemas`, request ve response veri yapilarini tekrar tekrar yazmamak icin tanimladigimiz ortak kaliplardir.

Ornek:

- `User`
- `RegisterRequest`
- `LoginRequest`
- `LoginResponse`

Faydasi:

- Her endpointte ayni user yapisini tekrar elle yazmayiz
- `$ref` ile hazir semaya referans veririz
- Dokumantasyon daha temiz kalir

Ornek mantik:

```text
User semasi bir kez tanimlanir
LoginResponse icinde tekrar user alanini elle yazmak yerine
$ref: '#/components/schemas/User' denir
```

#### 3. Paths

`paths`, gercek endpointlerin dokumantasyonudur.

Burada su bilgiler yazilir:

- endpoint adresi
- method
- summary
- requestBody
- responses
- gerekiyorsa security

Ornek:

```text
/api/auth/login
  post
    requestBody -> LoginRequest
    responses -> LoginResponse
```

### Neden `/api/auth/...` Yaziyoruz?

Cunku projede gercek route yapisi `/api/...` altinda calisiyor.

Bu nedenle Swagger'da:

- `/auth/login` degil
- `/api/auth/login`

yaziyoruz.

Swagger'daki path, gercek API adresiyle uyumlu olmalidir.

### BearerAuth Neden Lazim?

Bazi endpointler sadece giris yapmis kullanicilar icindir:

- `GET /api/auth/current`
- `POST /api/auth/logout`

Bu endpointlerde Swagger'a su eklenir:

```js
security:
  - BearerAuth: []
```

Bu, "Bu endpoint token ister" demektir.

`BearerAuth` tanimi merkezi olarak su dosyada durur:

- `backend/src/middlewares/swaggerDocs.js`

### Request Schema ve Response Schema Farki

Bu fark cok onemli:

- Request schema: istemcinin bize gonderecegi veri
- Response schema: bizim istemciye geri donecegimiz veri

Ornek:

`LoginRequest`

```json
{
  "email": "user@example.com",
  "password": "123456"
}
```

`LoginResponse`

```json
{
  "status": 200,
  "message": "Successfully logged in",
  "data": {
    "user": {
      "_id": "...",
      "name": "Duhan",
      "email": "user@example.com"
    },
    "token": "...",
    "refreshToken": "..."
  }
}
```

Yani request ve response ayni sey degildir; ikisini ayri dokumante ederiz.

### Neden Girinti Bu Kadar Onemli?

Swagger yorumlari icinde aslinda YAML benzeri yapi kullanilir.

Bu nedenle bosluklar anlamsiz degildir.

Su yanlistir:

```js
 * tags:
 * - name: Auth
 * description: ...
```

Su dogrudur:

```js
 * tags:
 *   - name: Auth
 *     description: ...
```

Yani Swagger'da girinti, yapinin kendisidir.

### Biz Auth Swagger'da Neleri Yazdik?

Auth icin su parcalari dokumante ettik:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/current`
- `POST /api/auth/logout`

Ve su schema'lari tanimladik:

- `User`
- `RegisterRequest`
- `LoginRequest`
- `RegisterResponse`
- `LoginResponse`
- `CurrentUserResponse`
- `LogoutResponse`
- `AuthErrorResponse`

### Swagger Yazarken Izledigimiz Siralama

Karismamasi icin su sirayi izledik:

1. `tags`
2. ortak `schemas`
3. request schema'lari
4. response schema'lari
5. endpoint `paths`
6. gerekiyorsa `security`

Bu sira sayesinde dosya daha kolay okunur.

### Swagger Yazarken Kendine Sorabilecegin Sorular

Bir endpointi dokumante ederken kendine sunlari sor:

- Bu endpointin tam adresi ne?
- Hangi method?
- Body gerekiyor mu?
- Gerekliyse hangi alanlar zorunlu?
- Basarili olursa ne donuyor?
- Hata olursa ne donuyor?
- Token gerekiyor mu?

Bu sorularin cevabi varsa Swagger'i da yazabilirsin.
