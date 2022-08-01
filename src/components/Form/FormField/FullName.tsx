import React, { FC, useEffect, useState } from 'react';

import styles from '../Form.module.scss';

export type FullNameFieldType = {
  fullName: string;
  value: string;
};

type FullNameProps = {
  fullName: string;
  onSuccess: (value: FullNameFieldType) => void;
  onError: (value: FullNameFieldType) => void;
  onProcess: boolean;
  resetField: boolean;
};

export const FullName: FC<FullNameProps> = React.memo(({ fullName, onSuccess, onError, onProcess, resetField }) => {
  const [fullNameValue, setFullNameValue] = useState<string>('');
  const [fullNameError, setFullNameError] = useState<string>('');

  useEffect(() => {
    if (resetField) {
      setFullNameValue('');
    }
  }, [resetField]);

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const target = e.target as HTMLInputElement;
    setFullNameValue(target.value.toUpperCase());
    validateFullName(target.value.toUpperCase());
  };

  const validateFullName = (value: string) => {
    if (value.match(/[A-Z]{3,30}\s[A-Z]{3,30}/)) {
      onSuccess({ fullName, value });
      setFullNameError('');
    }
    if (value.match(/^\W|\d/)) {
      onError({ fullName, value: '' });
      setFullNameError('Укажите имя и фамилию на латинице');
    }
    if (value.length > 61) {
      onError({ fullName, value: '' });
      setFullNameError('Максимальная длина поля 61 символ');
    }
  };

  const blurHandle = () => {
    if (fullNameValue === '') {
      onError({ fullName, value: '' });
      setFullNameError('Поле не может быть пустым');
    }
    if (fullNameValue !== '' && !fullNameValue.includes(' ')) {
      onError({ fullName, value: '' });
      setFullNameError('Имя и фамилия должны быть разделены пробелом');
    }
    if (fullNameValue.includes(' ')) {
      const [firstName, secondName] = fullNameValue.trim().split(' ');

      if (firstName.length > 30 || secondName.length > 30) {
        onError({ fullName, value: '' });
        setFullNameError('Максимальная длина каждого слова не более 30 символов');
      }

      if (firstName.length < 3 || secondName.length < 3) {
        onError({ fullName, value: '' });
        setFullNameError('Минимальная длина каждого слова не менее 3 символов');
      }
    }
  };

  const handleFocus = () => {
    if (fullNameValue === '') {
      setFullNameError('');
    }
  };

  return (
    <>
      <label htmlFor={fullName}>{`${fullName}:`}</label>
      <input
        type='text'
        id={fullName}
        value={fullNameValue}
        onChange={handleChange}
        onBlur={blurHandle}
        onFocus={handleFocus}
        disabled={onProcess}
      />
      {/* error message */}
      {fullNameError ? <p className={styles.errorText}>{fullNameError}</p> : ''}
    </>
  );
});
