import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearAuthError } from '../../redux/auth/authSlice.js';
import { registerUser } from '../../redux/auth/authOperations.js';
import {
  selectAuthError,
  selectAuthIsLoading,
} from '../../redux/auth/authSelectors.js';
import { registerValidationSchema } from '../../utils/validationSchema.js';
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

 useEffect(() => {
  dispatch(clearAuthError());

  return () => {
    dispatch(clearAuthError());
  };
}, [dispatch]);

const handleBlur = async event => {
  const { name, value } = event.target;

  try {
    await registerValidationSchema.validateAt(name, {
      ...formData,
      [name]: value,
    });

    setErrors(prev => ({
      ...prev,
      [name]: '',
    }));
  } catch (error) {
    setErrors(prev => ({
      ...prev,
      [name]: error.message,
    }));
  }
};

const handleChange = e => {
  const { name, value } = e.target;

  if (error) {
    dispatch(clearAuthError());
  }

  setFormData(prev => ({
    ...prev,
    [name]: value,
  }));

  setErrors(prev => ({
    ...prev,
    [name]: '',
  }));
};

const handleSubmit = async event => {
  event.preventDefault();

  try {
    await registerValidationSchema.validate(formData, {
      abortEarly: false,
    });

    setErrors({});

    await dispatch(registerUser(formData)).unwrap();

    navigate('/login');
  } catch (err) {
    if (err.inner) {
      const newErrors = {};

      err.inner.forEach(error => {
        newErrors[error.path] = error.message;
      });

      setErrors(newErrors);
      return;
    }
  }
};

  return (
    <div className={css.formContainer}>
      <h1 className={css.title}>REGISTER</h1>

      <form className={css.form} onSubmit={handleSubmit} noValidate>
        <div className={css.fields}>
          <label className={css.label}>
            <span className={css.labelText}>Name *</span>
            <input
              className={`${css.input} ${errors.name ? css.errorInput : ''}`}
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
