import { useEffect, useState } from 'react';
import { clearAuthError } from '../../redux/auth/authSlice.js';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/auth/authOperations.js';
import {
  selectAuthError,
  selectAuthIsLoading,
} from '../../redux/auth/authSelectors.js';
import { loginValidationSchema } from '../../utils/validationSchema.js';
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

  useEffect(() => {
  dispatch(clearAuthError());

  return () => {
    dispatch(clearAuthError());
  };
  }, [dispatch]);


const handleBlur = async event => {
  const { name, value } = event.target;

  try {
    await loginValidationSchema.validateAt(name, {
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

  const handleChange = event => {
  const { name, value } = event.target;

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
    await loginValidationSchema.validate(formData, {
      abortEarly: false,
    });

    setErrors({});

    await dispatch(loginUser(formData)).unwrap();

    navigate('/diary');
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
