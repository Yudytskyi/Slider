import React from 'react';
import PropTypes from 'prop-types';

import Slide from '../Slide';

function Carousel(props) {
  const { slides, bgColor } = props;
  const slide = slides[0];

  return <Slide slide={slide} bgColor={bgColor} />;
}

Carousel.propTypes = {};

export default Carousel;
