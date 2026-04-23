import LoginForm from '../../components/LoginForm/LoginForm';
import css from './LoginPage.module.css';

const LoginPage = () => {
  return (
    <section className={css.page}>
      <div className={css.container}>
        <div className={css.loginArea}>
          <LoginForm />
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
