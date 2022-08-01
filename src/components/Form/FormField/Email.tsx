import React, { FC, useEffect, useState } from 'react';

import styles from '../Form.module.scss';

export type EmailFieldType = {
  email: string;
  value: string;
};

type EmailProps = {
  email: string;
  onSuccess: (value: EmailFieldType) => void;
  onError: (value: EmailFieldType) => void;
  onProcess: boolean;
  resetField: boolean;
};

export const Email: FC<EmailProps> = React.memo(({ email, onSuccess, onError, onProcess, resetField }) => {
  const [emailValue, setEmailValue] = useState<string>('');
  const [isFieldDirty, setIsFieldDirty] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string>('Поле не может быть пустым');

  useEffect(() => {
    if (resetField) {
      setEmailValue('');
    }
  }, [resetField]);

  const handleEmailChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const target = e.target as HTMLInputElement;
    setEmailValue(target.value);

    if (target.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      onSuccess({ email, value: target.value });
      setEmailError('');
    } else {
      onError({ email, value: '' });
      setEmailError('Укажите правильный адрес почты');
    }
  };

  const blurHandler = () => {
    setIsFieldDirty(true);
  };

  return (
    <>
      <label htmlFor={email}>{`${email}:`}</label>
      <input
        type='email'
        id={email}
        value={emailValue}
        onChange={handleEmailChange}
        onBlur={blurHandler}
        disabled={onProcess}
      />
      {/* error message */}
      {isFieldDirty && emailError ? <p className={styles.errorText}>{emailError}</p> : ''}
    </>
  );
});
