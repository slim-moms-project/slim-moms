import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/auth/authOperations.js';
import {
  selectAuthError,
  selectAuthIsLoading,
} from '../../redux/auth/authSelectors.js';
import css from './RegistrationForm.module.css';

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const error = useSelector(selectAuthError);
  const isLoading = useSelector(selectAuthIsLoading);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
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
    dispatch(registerUser(formData));
  };

  return (
    <div className={css.formContainer}>
      <h1 className={css.title}>REGISTER</h1>

      <form className={css.form} onSubmit={handleSubmit}>
        <div className={css.fields}>
          <label className={css.label}>
            <span className={css.labelText}>Name *</span>
            <input
              className={css.input}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>

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
            {isLoading ? 'Loading...' : 'Register'}
          </button>

          <button
  className={css.secondaryBtn}
  type="button"
  onClick={() => navigate('/login')}
>
  Log in
</button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
