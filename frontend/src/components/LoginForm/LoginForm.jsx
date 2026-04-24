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
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const validateField = (name, value) => {
  if (!value.trim()) {
    return 'This field cannot be empty!';
  }

  if (name === 'email' && !/^\S+@\S+\.\S+$/.test(value)) {
    return 'Please enter a valid email!';
  }

  return '';
  };

  const handleBlur = event => {
  const { name, value } = event.target;

  setErrors(prev => ({
    ...prev,
    [name]: validateField(name, value),
  }));
};

  const handleChange = event => {
  const { name, value } = event.target;

  setFormData(prev => ({
    ...prev,
    [name]: value,
  }));

  setErrors(prev => ({
    ...prev,
    [name]: '',
  }));
};

const handleSubmit = event => {
  event.preventDefault();

  const newErrors = {
    email: validateField('email', formData.email),
    password: validateField('password', formData.password),
  };

  setErrors(newErrors);

  const hasError = Object.values(newErrors).some(Boolean);

  if (hasError) return;

  dispatch(loginUser(formData));
};

  return (
    <div className={css.formContainer}>
      <h1 className={css.title}>LOG IN</h1>

      <form className={css.form} onSubmit={handleSubmit} noValidate>
        <div className={css.fields}>
          <label className={css.label}>
            <span className={css.labelText}>Email *</span>
            <input
              className={`${css.input} ${errors.email ? css.errorInput : ''}`}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && <p className={css.fieldError}>{errors.email}</p>}
          </label>

          <label className={css.label}>
            <span className={css.labelText}>Password *</span>
            <input
              className={`${css.input} ${errors.password ? css.errorInput : ''}`}
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.password && <p className={css.fieldError}>{errors.password}</p>}
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
