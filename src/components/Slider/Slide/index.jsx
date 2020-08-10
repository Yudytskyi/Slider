import React from 'react';
import PropTypes from 'prop-types';

import styles from './Slide.module.scss';
import dummy from './img/dummy.jpg';

function Slide(props) {
  const {
    slide: { src, title, description },
    bgColor,
  } = props;

  const bgStyles = {
    background: `${bgColor} center no-repeat url(${src})`,
    backgroundSize: 'contain',
    bgColor: bgColor,
  };

  return (
    <figure className={styles.imageWrapper}>
      <div className={styles.image} style={bgStyles}></div>
      <figcaption className={styles.figcaption}>
        <h3 className={styles.figcaption__title}>{title}</h3>
        <p className={styles.figcaption__description}>{description}</p>
      </figcaption>
    </figure>
  );
}

Slide.propTypes = {
  src: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  bgColor: PropTypes.string.isRequired,
};

Slide.defaultProps = {
  src: dummy,
  title: 'Slide',
  bgColor: 'black',
};

export default Slide;
