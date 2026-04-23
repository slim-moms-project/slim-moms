import css from './RegistrationForm.module.css';

const RegistrationForm = () => {
  return (
    <div className={css.formContainer}>
      <h1 className={css.title}>REGISTER</h1>

      <form className={css.form}>
        <div className={css.fields}>
          <label className={css.label}>
            <span className={css.labelText}>Name *</span>
            <input className={css.input} type="text" />
          </label>

          <label className={css.label}>
            <span className={css.labelText}>Email *</span>
            <input className={css.input} type="email" />
          </label>

          <label className={css.label}>
            <span className={css.labelText}>Password *</span>
            <input className={css.input} type="password" />
          </label>
        </div>

        <div className={css.buttons}>
          <button className={css.primaryBtn} type="submit">
            Register
          </button>

          <button className={css.secondaryBtn} type="button">
            Log in
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
