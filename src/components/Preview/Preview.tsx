import React, { FC } from 'react';

import styles from './Preview.module.scss';

type PreviewProps = {
  showForm: () => void;
};

export const Preview: FC<PreviewProps> = ({ showForm }) => {
  return (
    <section className={styles.preview}>
      <div className={styles.previewLeft}>
        <header>Lorem, ipsum dolor.</header>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias, molestiae aperiam. Quasi ipsum aut ut
          nihil modi, iure quibusdam nisi!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias, molestiae aperiam. Quasi ipsum aut ut
          nihil modi, iure quibusdam nisi!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias, molestiae aperiam. Quasi ipsum aut ut
          nihil modi, iure quibusdam nisi!
        </p>
      </div>
      <div className={styles.previewRight}>
        <button className={styles.previewBtn} onClick={showForm}>
          Заполнить форму
        </button>
      </div>
    </section>
  );
};
