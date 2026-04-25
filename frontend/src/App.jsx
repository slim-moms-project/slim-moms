import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Header from './components/Header/Header';
import Loader from './components/Loader/Loader';
// Route korumalarını test aşamasında olduğumuz için şimdilik yoruma aldık
// import PrivateRoute from './components/routes/PrivateRoute';
// import PublicRoute from './components/routes/PublicRoute';

// Sadece arayüzünü bitirdiğimiz Diary sayfasını aktif bırakıyoruz
const DiaryPage = lazy(() => import('./pages/DiaryPage/DiaryPage'));

function App() {
  return (
    <div className="app-container">
      <Header />

      <main>
        <Suspense fallback={<Loader />}>
          <Routes>

            {/* 1. Ana sayfaya girenleri direkt test ettiğimiz Diary sayfasına yönlendir */}
            <Route path="/" element={<Navigate to="/diary" replace />} />

            {/* 2. Diary Sayfası (Geçici olarak PrivateRoute olmadan doğrudan basıyoruz ki görebilelim) */}
            <Route path="/diary" element={<DiaryPage />} />

            {/* --- HENÜZ YAZILMAYAN VE TEST EDİLMEYEN SAYFALAR YORUMA ALINDI --- */}
            {/*
            <Route
              path="/register"
              element={<PublicRoute restricted redirectTo="/diary" component={<RegistrationPage />} />}
            />
            <Route
              path="/login"
              element={<PublicRoute restricted redirectTo="/diary" component={<LoginPage />} />}
            />
            <Route
              path="/calculator"
              element={<PrivateRoute redirectTo="/login" component={<CalculatorPage />} />}
            />
            */}

            {/* 3. Yanlış URL girilirse yine Diary sayfasına yönlendir */}
            <Route path="*" element={<Navigate to="/diary" replace />} />

          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default App;
