import React, { FC, useEffect, useState, useRef } from 'react';

import styles from '../Form.module.scss';

export type PhoneFieldData = {
  phone: string;
  value: string;
};

type PhoneProps = {
  phone: string;
  onSuccess: (value: PhoneFieldData) => void;
  onError: (value: PhoneFieldData) => void;
  onProcess: boolean;
  resetField: boolean;
};

export const Phone: FC<PhoneProps> = React.memo(({ phone, onSuccess, onError, onProcess, resetField }) => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [phoneError, setPhoneError] = useState<boolean>(false);
  const inputPhone = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (phoneNumber.length === 18) {
      onSuccess({ phone, value: phoneNumber.replace(/\D/g, '') });
      setPhoneError(false);
    }

    if (phoneNumber.length < 18) {
      onError({ phone, value: '' });
    }
  }, [phoneNumber]);

  useEffect(() => {
    if (resetField) {
      if (inputPhone.current) {
        inputPhone.current.value = '';
      }
      setPhoneNumber('');
    }
  }, [resetField]);

  function handleChange() {
    let matrix = '+7 (___) ___-__-__',
      i = 0,
      def = matrix.replace(/\D/g, ''),
      val = inputPhone?.current?.value.replace(/\D/g, '') || '';

    if (def.length >= val.length) val = def;
    inputPhone.current
      ? (inputPhone.current.value = matrix.replace(/./g, function (a) {
          return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
        }))
      : '';

    const phoneData = (inputPhone.current && inputPhone.current.value) || '';

    setPhoneNumber(phoneData);
  }

  const checkNumber = () => {
    if (phoneNumber.length !== 18) {
      setPhoneError(true);
    }
  };

  return (
    <>
      <label htmlFor={phone}>{`${phone}:`}</label>
      <input
        type='tel'
        id={phone}
        ref={inputPhone}
        onChange={handleChange}
        onFocus={handleChange}
        onBlur={checkNumber}
        placeholder={'999 999 99 99'}
      />
      {/* error message */}
      {phoneError ? <p className={styles.errorText}>Укажите правильный номер телефона</p> : ''}
    </>
  );
});
