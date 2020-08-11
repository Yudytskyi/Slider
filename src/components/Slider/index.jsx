import React from 'react';
import PropTypes from 'prop-types';

import Carousel from './Carousel';

import styles from './Slider.module.scss';

function Slider(props) {
  const {
    sliderStyles,
    sliderStyles: { backgroundColor, isContain },
    slides,
  } = props;
  const bgColor = backgroundColor;
  const bgSize = isContain ? 'contain' : 'cover';
  return (
    <div className={styles.contentContainer} style={sliderStyles}>
      <Carousel slides={slides} bgColor={bgColor} bgSize={bgSize} />
    </div>
  );
}

Slider.propTypes = {
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      src: PropTypes.string,
    })
  ),
  sliderStyles: PropTypes.object,
};
Slider.defaultProps = {
  sliderStyles: {
    width: '100vw',
    height: '100vh',
    backgroundColor: '#313131',
    isContain: true,
  },
};

export default Slider;
