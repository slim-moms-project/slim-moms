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
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: '',
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

  if (name === 'password' && value.length < 6) {
    return 'Password must be at least 6 characters!';
  }

  return '';
  };

  const handleBlur = e => {
  const { name, value } = e.target;

  setErrors(prev => ({
    ...prev,
    [name]: validateField(name, value),
  }));
};

  const handleChange = e => {
  const { name, value } = e.target;

  setFormData(prev => ({
    ...prev,
    [name]: value,
  }));

  setErrors(prev => ({
    ...prev,
    [name]: '',
  }));
};

const handleSubmit = e => {
  e.preventDefault();

  const newErrors = {
    name: validateField('name', formData.name),
    email: validateField('email', formData.email),
    password: validateField('password', formData.password),
  };

  setErrors(newErrors);

  const hasError = Object.values(newErrors).some(Boolean);

  if (hasError) return;

  dispatch(registerUser(formData));
};

  return (
    <div className={css.formContainer}>
      <h1 className={css.title}>REGISTER</h1>

      <form className={css.form} onSubmit={handleSubmit} noValidate>
        <div className={css.fields}>
          <label className={css.label}>
            <span className={css.labelText}>Name *</span>
            <input
              className={css.input}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.name && <p className={css.fieldError}>{errors.name}</p>}
          </label>

          <label className={css.label}>
            <span className={css.labelText}>Email *</span>
            <input
              className={css.input}
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
              className={css.input}
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
