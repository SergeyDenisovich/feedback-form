import React, { FC, useEffect, useState } from 'react';

import styles from '../Form.module.scss';

export type DateFieldData = {
  dateOfBirth: string;
  value: string;
};

type DateOfBirthProps = {
  dateOfBirth: string;
  onSuccess: (value: DateFieldData) => void;
  onError: (value: DateFieldData) => void;
  onProcess: boolean;
  resetField: boolean;
};

export const DateOfBirth: FC<DateOfBirthProps> = React.memo(
  ({ dateOfBirth, onSuccess, onError, onProcess, resetField }) => {
    const [date, setDate] = useState<string>('');
    const [dateError, setDateError] = useState<string>('');

    useEffect(() => {
      if (resetField) {
        setDate('');
      }
    }, [resetField]);

    useEffect(() => {
      if (date === '') {
        onError({ dateOfBirth, value: '' });
      }
    }, [date]);

    const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
      const target = e.target as HTMLInputElement;
      setDate(target.value);

      if (target.value) {
        setDateError('');
        onSuccess({ dateOfBirth, value: target.value });
      }
    };

    const handleBlur = () => {
      if (date === '') {
        setDateError('Укажите дату рождения');
      }
    };

    return (
      <>
        <label htmlFor={dateOfBirth}>{`${dateOfBirth}:`}</label>
        <input
          type='date'
          id={dateOfBirth}
          value={date}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={onProcess}
        />
        {dateError ? <p className={styles.errorText}>{dateError}</p> : ''}
      </>
    );
  }
);
