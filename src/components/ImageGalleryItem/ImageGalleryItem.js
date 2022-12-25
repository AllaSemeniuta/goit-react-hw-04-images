import { Component } from 'react';
import styles from './ImageGalleryItem.module.css';
import { Modal } from 'components/Modal/Modal';
import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {
  state = {
    largeSize: null,
  };

  static propTypes = {
    item: PropTypes.object.isRequired,
  };

  onClickImg = largeSize => {
    document.body.classList.add('noScroll');
    this.setState({ largeSize: largeSize });
  };

  onCloseModal = e => {
    this.setState({ largeSize: null });
  };

  render() {
    const { item } = this.props;
    return (
      <>
        <img
          src={item.webSize}
          alt={item.tags}
          className={styles.image}
          onClick={() => this.onClickImg(item.largeSize)}
          id="webImage"
        />
        {this.state.largeSize !== null && (
          <Modal
            largeImg={item.largeSize}
            tags={item.tags}
            closeModal={this.onCloseModal}
          />
        )}
      </>
    );
  }
}
