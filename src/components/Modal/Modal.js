import { useEffect } from 'react';
import PropTypes from 'prop-types';

import styles from './Modal.module.css';

import ReactDOM from 'react-dom';

export const Modal = ({ largeImg, tags, closeModal }) => {
  const onClickBackdrop = e => {
    if (e.currentTarget === e.target) {
      console.log(closeModal);
      closeModal();
      return;
    }
  };

  useEffect(() => {
    const onCloseModal = e => {
      if (e.code === 'Escape') {
        closeModal();
        return;
      }
    };

    document.addEventListener('keydown', onCloseModal);

    return () => {
      document.body.classList.remove('noScroll');
      document.removeEventListener('keydown', onCloseModal);
    };
  }, [closeModal]);

  return ReactDOM.createPortal(
    <div className={styles.overlay} id="overlay" onClick={onClickBackdrop}>
      <div className={styles.modal}>
        <img src={largeImg} alt={tags} />
      </div>
    </div>,
    document.querySelector('#modal-root')
  );
};

Modal.propTypes = {
  largeImg: PropTypes.string.isRequired,
  tags: PropTypes.string,
  closeModal: PropTypes.func,
};
