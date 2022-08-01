import React, { FC, useState, useRef, useEffect } from 'react';

import styles from './Form.module.scss';
import {
  FullName,
  Email,
  Phone,
  DateOfBirth,
  Message,
  DateFieldData,
  MessageFieldData,
  PhoneFieldData,
  FullNameFieldType,
  EmailFieldType,
} from './FormField';

type FieldDataType = DateFieldData | MessageFieldData | PhoneFieldData | EmailFieldType | FullNameFieldType;

const initialState = {
  fullName: '',
  email: '',
  phone: '',
  dateOfBirth: '',
  message: '',
};

export const Form: FC = (): JSX.Element => {
  const [formData, setFormData] = useState<Record<string, string>>(initialState);
  const [formValid, setFormValid] = useState<boolean>(false);
  const [onProcess, setOnProcess] = useState<boolean>(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);
  const [responseText, setResponseText] = useState<Record<string, string>>({});

  useEffect(() => {
    if (checkFormData()) {
      setFormValid(true);
    }

    if (!checkFormData()) {
      setFormValid(false);
    }
  }, [formData]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (responseText.message) {
      timer = setTimeout(() => {
        setResponseText({});
        setIsFormSubmitted(false);
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [responseText.message]);

  function checkFormData() {
    return Object.keys(formData).every((formField) => formData[formField] !== '');
  }

  const handleSuccess = (fieldData: FieldDataType) => {
    let field = Object.keys(fieldData)[0];
    setFormData({ ...formData, [field]: fieldData.value });
  };

  const handleEmptyField = (fieldData: FieldDataType) => {
    let field = Object.keys(fieldData)[0];
    setFormData({ ...formData, [field]: fieldData.value });
  };

  const handleSumit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setOnProcess(true);

    let response = await fetch('http://localhost:8000/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(formData),
    });

    let responseData = await response.json();

    if (responseData.status === 'success') {
      setResponseText({ type: 'success', message: responseData.message });
      setFormData({ ...initialState });
      setIsFormSubmitted(true);
    }
    if (responseData.status === 'error') {
      setResponseText({ type: 'error', message: responseData.message });
    }
    setOnProcess(false);
  };

  return (
    <>
      <form className={styles.form} noValidate onSubmit={handleSumit}>
        <fieldset>
          <legend>Регистрация</legend>
          <FullName
            fullName={'Имя Фамилия'}
            onSuccess={handleSuccess}
            onError={handleEmptyField}
            onProcess={onProcess}
            resetField={isFormSubmitted}
          />

          <Email
            email={'E-mail'}
            onSuccess={handleSuccess}
            onError={handleEmptyField}
            onProcess={onProcess}
            resetField={isFormSubmitted}
          />

          <Phone
            phone={'Номер телефона'}
            onSuccess={handleSuccess}
            onError={handleEmptyField}
            onProcess={onProcess}
            resetField={isFormSubmitted}
          />

          <DateOfBirth
            dateOfBirth={'Дата рождения'}
            onSuccess={handleSuccess}
            onError={handleEmptyField}
            onProcess={onProcess}
            resetField={isFormSubmitted}
          />

          <Message
            message={'Сообщение'}
            onSuccess={handleSuccess}
            onError={handleEmptyField}
            onProcess={onProcess}
            resetField={isFormSubmitted}
          />

          <button className={!formValid ? styles.disabledBtn : ''} disabled={!formValid || onProcess} type='submit'>
            {onProcess ? 'Отправка...' : 'Отправить'}
          </button>
        </fieldset>
        {responseText ? (
          <p className={responseText.type === 'success' ? styles.responseTextSuccess : styles.responseTextError}>
            {responseText.message}
          </p>
        ) : (
          ''
        )}
      </form>
    </>
  );
};
