import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Carousel.module.scss';

import Slide from '../Slide';

class Carousel extends Component {
  constructor(props) {
    super(props);
    this.slides = props.slides;
    this.sliderStyles = props.sliderStyles;
    this.state = {
      isPlaying: false,
      speedPlaying: 5,
      isFullScreen: false,
      currentSlideNumber: 0,
      time: new Date(),
    };
    this.isFullScreen = false;
  }
  dblClickHandlerFullscreen = () => {
    this.setState({ isFullScreen: !this.state.isFullScreen });
    console.log(this.state.isFullScreen);
  };
  clickHandlePrev = () =>
    this.setState({
      currentSlideNumber: (this.state.currentSlideNumber - 1 + this.slides.length) % this.slides.length,
    });

  clickHandlePlay = () => this.setState({ isPlaying: !this.state.isPlaying });
  clickHandleStop = () => this.setState({ isPlaying: false });
  moveHandleRange = e => {
    if (this.state.speedPlaying !== e.target.value) {
      this.setState({ speedPlaying: e.target.value });
    }
  };
  clickHandleNext = () =>
    this.setState({ currentSlideNumber: (this.state.currentSlideNumber + 1) % this.slides.length });

  render() {
    const {
      sliderStyles,
      sliderStyles: { isSlideContain },
    } = this.props;
    const bgSize = isSlideContain ? 'contain' : 'cover';
    const currentStyles = this.state.isFullScreen
      ? { ...this.sliderStyles, width: '100vw', height: '100vh' }
      : this.sliderStyles;

    return (
      <div className={styles.carousel} style={currentStyles} onDoubleClick={this.dblClickHandlerFullscreen}>
        <Slide slide={this.slides[this.state.currentSlideNumber]} bgSize={bgSize} />
        <div className={styles.buttonsBlock}>
          <button className={styles.button} onClick={this.clickHandlePrev}>
            prev
          </button>
          <button className={styles.button} onClick={this.clickHandlePlay}>
            {this.state.isPlaying ? 'stop' : 'play'}
          </button>
          <input
            className={styles.button}
            type="range"
            id="speed"
            name="speed"
            min="0"
            max="10"
            value={this.state.speedPlaying}
            step="1"
            onChange={this.moveHandleRange}
          />
          <button className={styles.button} onClick={this.dblClickHandlerFullscreen}>
            {this.state.isFullScreen ? 'screen' : 'fullscreen'}
          </button>
          <button className={styles.button} onClick={this.clickHandleNext}>
            nex
          </button>
        </div>
      </div>
    );
  }
}

Carousel.propTypes = {
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

Carousel.defaultProps = {
  sliderStyles: {
    width: '800px',
    height: '600px',
    backgroundColor: '#313131',
    isSlideContain: true,
  },
};

export default Carousel;
