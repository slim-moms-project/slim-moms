import LoginForm from '../../components/LoginForm/LoginForm';
import css from './LoginPage.module.css';

const LoginPage = () => {
  return (
    <section className={css.page}>
  <div className={css.scene}>
    <div className={css.decor}></div>

    <div className={css.container}>
      <div className={css.loginArea}>
        <LoginForm />
      </div>
    </div>
  </div>
</section>
  );
};

export default LoginPage;
