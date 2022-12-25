import { useState } from 'react';
import styles from './ImageGalleryItem.module.css';
import { Modal } from 'components/Modal/Modal';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ item }) => {
  const [largeSize, setLargeSize] = useState(null);

  const onClickImg = largeSize => {
    document.body.classList.add('noScroll');
    setLargeSize({ largeSize });
  };

  const onCloseModal = e => {
    setLargeSize(null);
  };

  return (
    <>
      <img
        src={item.webSize}
        alt={item.tags}
        className={styles.image}
        onClick={() => onClickImg(item.largeSize)}
        id="webImage"
      />
      {largeSize !== null && (
        <Modal
          largeImg={item.largeSize}
          tags={item.tags}
          closeModal={onCloseModal}
        />
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  item: PropTypes.object.isRequired,
};
