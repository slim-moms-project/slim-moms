import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import css from './RegistrationPage.module.css';

const RegisterPage = () => {
  return (
    <section className={css.page}>
      <div className={css.scene}>
        <div className={css.decor}></div>

        <div className={css.container}>
          <div className={css.loginArea}>
            <RegistrationForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
