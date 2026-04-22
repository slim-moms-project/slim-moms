import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import css from './RegistrationPage.module.css';

const RegistrationPage = () => {
  return (
    <section className={css.wrapper}>
      <div className={css.card}>
        {/* Header burada başka component olarak gelecek */}

        <RegistrationForm />
      </div>
    </section>
  );
};

export default RegistrationPage;
