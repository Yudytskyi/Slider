import React from 'react';
import PropTypes from 'prop-types';

import Carousel from './Carousel';

import styles from './Slider.module.scss';

function Slider(props) {
  return (
    <div className={styles.contentContainer}>
      <Carousel {...props} />
    </div>
  );
}

export default Slider;
