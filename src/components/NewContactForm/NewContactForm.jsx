import React from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import styled from 'styled-components';
import * as yup from 'yup';
import { Button, TextField } from '@mui/material';

const MyErrorMsg = styled(ErrorMessage)`
  position: absolute;
  left: 0;
  bottom: -30px;
  color: red;
`;

const Wrapper = styled.div`
  display: block;
  position: relative;
  min-height: 50px;
  margin-bottom: 50px;
`;

const schema = yup.object().shape({
  name: yup
    .string()
    .min(3, 'Має бути трошки довше :)')
    .required('Нажаль без імені нічого не вийде'),
  number: yup
    .string()
    .matches(
      /[0-9]{3}[ .-][0-9]{3}[ .-][0-9]{2}[ .-][0-9]{2}/,
      'Невірний формат. Має бути 066-333-22-22'
    )
    .max(13, 'Невірний формат. Має бути 066-333-22-22')
    .required("Номер телефону також обов'язковий"),
});

const INITIAL_FORM_VALUES = { name: '', number: '' };

function NewContactForm({ addContact }) {
  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    resetForm();
    addContact(values);
    setSubmitting(false);
  };
  return (
    <div>
      <Formik initialValues={INITIAL_FORM_VALUES} validationSchema={schema} onSubmit={handleSubmit}>
        <Form autoComplete="off">
          <Wrapper>
            <Field
              as={TextField}
              type="text"
              name="name"
              id="standard-basic"
              label="Ім'я"
              variant="standard"
              sx={{ mr: '20px', width: '400px' }}
            />
            <MyErrorMsg name="name" component="div" />
          </Wrapper>
          <Wrapper>
            <Field
              as={TextField}
              type="text"
              name="number"
              id="standard-basic"
              label="Номер телефону (формат 066-333-22-22)"
              variant="standard"
              sx={{ mr: '20px', width: '400px' }}
            />
            <MyErrorMsg name="number" component="div" />
          </Wrapper>
          <Button type="submit" sx={{ display: 'block' }}>
            Додати до записника
          </Button>
        </Form>
      </Formik>
    </div>
  );
}

NewContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
};

export default NewContactForm;
