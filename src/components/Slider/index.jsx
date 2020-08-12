import React from 'react';
import PropTypes from 'prop-types';

import Carousel from './Carousel';

import styles from './Slider.module.scss';

function Slider(props) {
  const { slides, sliderStyles } = props;

  return (
    <div className={styles.contentContainer}>
      <Carousel slides={slides} sliderStyles={sliderStyles} />
    </div>
  );
}

Slider.propTypes = {
  // slides: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     id: PropTypes.string,
  //     title: PropTypes.string.isRequired,
  //     description: PropTypes.string,
  //     src: PropTypes.string,
  //   })
  // ),
  // sliderStyles: PropTypes.object,
};
Slider.defaultProps = {
  // sliderStyles: {
  //   width: '800px',
  //   height: '600px',
  //   backgroundColor: '#313131',
  //   isSlideContain: true,
  // },
};

export default Slider;
