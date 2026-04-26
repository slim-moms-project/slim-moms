import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { calculateDailyCalories } from '../../redux/calculator/calculatorOperations';
import { selectCalculatorIsLoading } from '../../redux/calculator/calculatorSelectors';
import { calculatorValidationSchema } from '../../utils/validationSchema';
import css from './CalculatorCalorieForm.module.css';

const initialValues = {
  height: '',
  age: '',
  currentWeight: '',
  desiredWeight: '',
  bloodType: '1',
};

const CalculatorCalorieForm = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectCalculatorIsLoading);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await dispatch(
        calculateDailyCalories({
          height: Number(values.height),
          age: Number(values.age),
          currentWeight: Number(values.currentWeight),
          desiredWeight: Number(values.desiredWeight),
          bloodType: Number(values.bloodType),
        })
      ).unwrap();
      resetForm();
    } catch (error) {
      console.error('Calculation failed:', error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={calculatorValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ isValid, dirty }) => (
        <Form className={css.form}>
          <div className={css.fields}>

            {/* SOL */}
            <div className={css.col}>
              <div className={css.field}>
                <label className={css.label}>Height *</label>
                <Field className={css.input} name="height" type="number" />
                <ErrorMessage name="height" component="p" className={css.error} />
              </div>

              <div className={css.field}>
                <label className={css.label}>Age *</label>
                <Field className={css.input} name="age" type="number" />
                <ErrorMessage name="age" component="p" className={css.error} />
              </div>

              <div className={css.field}>
                <label className={css.label}>Current weight *</label>
                <Field className={css.input} name="currentWeight" type="number" />
                <ErrorMessage name="currentWeight" component="p" className={css.error} />
              </div>
            </div>

            {/* SAĞ */}
            <div className={css.col}>
              <div className={css.field}>
                <label className={css.label}>Desired weight *</label>
                <Field className={css.input} name="desiredWeight" type="number" />
                <ErrorMessage name="desiredWeight" component="p" className={css.error} />
              </div>

              <div className={css.bloodTypeGroup}>
                <p className={css.bloodTypeLabel}>Blood type *</p>
                <div className={css.radioGroup}>
                  {[1, 2, 3, 4].map(type => (
                    <label key={type} className={css.radioLabel}>
                      <Field
                        className={css.radioInput}
                        type="radio"
                        name="bloodType"
                        value={String(type)}
                      />
                      <span className={css.customRadio}></span>
                      {type}
                    </label>
                  ))}
                </div>
                <ErrorMessage name="bloodType" component="p" className={css.error} />
              </div>
            </div>

          </div>

          <button
            className={css.button}
            type="submit"
            disabled={!isValid || !dirty || isLoading}
          >
            {isLoading ? 'Calculating...' : 'Start losing weight'}
          </button>

        </Form>
      )}
    </Formik>
  );
};

export default CalculatorCalorieForm;
