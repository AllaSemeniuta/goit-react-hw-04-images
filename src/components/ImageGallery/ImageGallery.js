import PropTypes from 'prop-types';
import styles from './ImageGallery.module.css';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ items }) => {
  return (
    <ul className={styles.gallery}>
      {items.map(item => (
        <li key={item.id} className={styles.item}>
          <ImageGalleryItem item={item} />
        </li>
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
};
