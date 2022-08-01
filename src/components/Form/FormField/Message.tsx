import React, { FC, useEffect, useState } from 'react';

import styles from '../Form.module.scss';

export type MessageFieldData = {
  message: string;
  value: string;
};

type MessageProps = {
  message: string;
  onSuccess: (value: MessageFieldData) => void;
  onError: (value: MessageFieldData) => void;
  onProcess: boolean;
  resetField: boolean;
};

export const Message: FC<MessageProps> = React.memo(({ message, onSuccess, onError, onProcess, resetField }) => {
  const [textValue, setTextValue] = useState<string>('');
  const [isFieldDirty, setIsFieldDirty] = useState<boolean>(false);
  const [textError, setTextError] = useState<string>('Поле не может быть пустым');

  useEffect(() => {
    if (resetField) {
      setTextValue('');
    }
  }, [resetField]);

  const handleChange = (e: React.FormEvent<HTMLTextAreaElement>): void => {
    const target = e.target as HTMLInputElement;
    setTextValue(target.value);

    if (target.value.length < 10) {
      onError({ message, value: '' });
      setTextError('Минимальная длина сообщения 10 символов');
    } else if (textValue.length > 300) {
      onError({ message, value: '' });
      setTextError('Максимальная длина сообщения 300 символов');
    } else {
      setTextError('');
      onSuccess({ message, value: target.value.trim() });
    }
  };

  const blurHandler = () => {
    setIsFieldDirty(true);
  };

  return (
    <>
      <label htmlFor={message}>{`${message}:`}</label>
      <textarea
        id={message}
        rows={3}
        value={textValue}
        onChange={handleChange}
        onBlur={blurHandler}
        disabled={onProcess}
      />
      {/* error message */}
      {isFieldDirty && textError ? <p className={styles.errorText}>{textError}</p> : ''}
    </>
  );
});
