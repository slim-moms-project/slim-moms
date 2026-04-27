import { lazy, Suspense, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { refreshUser } from './redux/auth/authOperations.js';
import { selectAuthToken } from './redux/auth/authSelectors.js';
import { selectIsLoading } from './redux/global/globalSelectors.js';

import Loader from './components/Loader/Loader.jsx';
import Header from './components/Header/Header.jsx';
import PrivateRoute from './components/routes/PrivateRoute.jsx';
import PublicRoute from './components/routes/PublicRoute.jsx';

const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage.jsx'));
const RegistrationPage = lazy(
  () => import('./pages/RegistrationPage/RegistrationPage.jsx'),
);
const DiaryPage = lazy(() => import('./pages/DiaryPage/DiaryPage.jsx'));
const CalculatorPage = lazy(
  () => import('./pages/CalculatorPage/CalculatorPage.jsx'),
);
const MainPage = lazy(
  () => import('./pages/MainPage/MainPage.jsx'),
);

const PrivateLayout = ({ children }) => (
  <>
    <Header />
    {children}
  </>
);

function App() {
  const dispatch = useDispatch();
  const token = useSelector(selectAuthToken);
  const isGlobalLoading = useSelector(selectIsLoading);

  useEffect(() => {
    if (token) {
      dispatch(refreshUser());
    }
  }, [dispatch, token]);

  return (
    <>
      {isGlobalLoading && <Loader />}
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route
            path="/login"
            element={<PublicRoute component={<LoginPage />} />}
          />
          <Route
            path="/register"
            element={<PublicRoute component={<RegistrationPage />} />}
          />
          <Route
            path="/diary"
            element={
              <PrivateRoute
                component={
                  <PrivateLayout>
                    <DiaryPage />
                  </PrivateLayout>
                }
              />
            }
          />
          <Route
            path="/calculator"
            element={
              <PrivateRoute
                component={
                  <PrivateLayout>
                    <CalculatorPage />
                  </PrivateLayout>
                }
              />
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
