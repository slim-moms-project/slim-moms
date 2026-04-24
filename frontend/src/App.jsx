import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage'
import LoginForm from './components/LoginForm/LoginForm';
import LoginPage from './pages/LoginPage/LoginPage';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <RegistrationPage />

      <ToastContainer
        position="top-right"
        autoClose={2500}
      />
    </>
  );
}

export default App;

