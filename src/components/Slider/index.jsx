import React from 'react';
import PropTypes from 'prop-types';

import Carousel from './Carousel';

import styles from './Slider.module.scss';

function Slider(props) {
  return (
    <div id="slider" className={styles.contentContainer} style={{ top: '0px', left: '0px' }}>
      <Carousel {...props} />
    </div>
  );
}

export default Slider;
