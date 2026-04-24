import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/auth/authOperations.js';
import {
  selectAuthError,
  selectAuthIsLoading,
} from '../../redux/auth/authSelectors.js';
import css from './LoginForm.module.css';

const LoginForm = () => {
  const dispatch = useDispatch();
  const error = useSelector(selectAuthError);
  const isLoading = useSelector(selectAuthIsLoading);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = event => {
    const { name, value } = event.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

const handleSubmit = event => {
  event.preventDefault();
  dispatch(loginUser(formData));
};

  return (
    <div className={css.formContainer}>
      <h1 className={css.title}>LOG IN</h1>

      <form className={css.form} onSubmit={handleSubmit}>
        <div className={css.fields}>
          <label className={css.label}>
            <span className={css.labelText}>Email *</span>
            <input
              className={css.input}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>

          <label className={css.label}>
            <span className={css.labelText}>Password *</span>
            <input
              className={css.input}
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        {error && <p className={css.error}>{error}</p>}

        <div className={css.buttons}>
          <button className={css.primaryBtn} type="submit" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Log in'}
          </button>

          <button
  className={css.secondaryBtn}
  type="button"
  onClick={() => navigate('/register')}
>
  Register
</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
