import css from './LoginForm.module.css';

const LoginForm = () => {
  return (
    <div className={css.formContainer}>
      <h1 className={css.title}>LOG IN</h1>

      <form className={css.form}>
        <div className={css.fields}>
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
            Log in
          </button>

          <button className={css.secondaryBtn} type="button">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
