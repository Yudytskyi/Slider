import React from 'react';
import PropTypes from 'prop-types';

import Slide from '../Slide';

function Carousel(props) {
  const { slides, bgColor, bgSize } = props;
  const slide = slides[0];

  return <Slide slide={slide} bgColor={bgColor} bgSize={bgSize} />;
}

Carousel.propTypes = {};

export default Carousel;
