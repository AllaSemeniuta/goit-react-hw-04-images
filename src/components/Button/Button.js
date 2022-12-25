import styles from './Button.module.css';
import PropTypes from 'prop-types';

import { Box } from 'components/Box/Box';

export const Button = ({ onLoadMore, children }) => {
  return (
    <Box display="flex" justifyContent="center" width="100%" py="20px">
      <button type="button" onClick={onLoadMore} className={styles.button}>
        {children}
      </button>
    </Box>
  );
};

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};
