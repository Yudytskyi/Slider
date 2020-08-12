import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from '@mdi/react';
import { mdiPlay, mdiStop, mdiSkipNext, mdiSkipPrevious, mdiFullscreen, mdiFullscreenExit } from '@mdi/js';

import styles from './Carousel.module.scss';

import Slide from '../Slide';

class Carousel extends Component {
  constructor(props) {
    super(props);
    this.slides = props.slides;
    this.sliderStyles = props.sliderStyles;
    this.state = {
      isPlaying: false,
      speedPlaying: 6,
      maxSpeed: 10,
      isFullScreen: false,
      currentSlideNumber: 0,
      time: new Date(),
    };
    this.isFullScreen = false;
    this.timeoutId = null;
  }
  tick = () => {
    this.setState(state => {
      const { time } = state;
      const newDate = new Date(time.getTime());
      newDate.setSeconds(newDate.getSeconds() + 1);
      this.clickHandleNext();
      return {
        time: newDate,
      };
    });
  };
  clear = () => {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  };
  componentDidMount() {
    this.clickHandlePlay();
  }
  componentDidUpdate(prevProps, prevState) {
    const { isPlaying, speedPlaying, maxSpeed } = this.state;
    this.clear();
    if (isPlaying) {
      this.timeoutId = setTimeout(this.tick, (maxSpeed - speedPlaying) * 1000);
    }
  }

  dblClickHandlerFullscreen = () => {
    this.setState({ isFullScreen: !this.state.isFullScreen });
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
          <Icon
            className={styles.button}
            onClick={this.clickHandlePrev}
            path={mdiSkipPrevious}
            size={2}
            rotate
            color="white"
          />
          <div className={styles.playBlock}>
            {this.state.isPlaying ? (
              <Icon className={styles.button} onClick={this.clickHandlePlay} path={mdiPlay} size={2} color="white" />
            ) : (
              <Icon className={styles.button} onClick={this.clickHandleStop} path={mdiStop} size={2} color="white" />
            )}
            <input
              className={styles.button}
              type="range"
              id="speed"
              name="speed"
              min="1"
              max={this.state.maxSpeed - 1}
              value={this.state.speedPlaying}
              onChange={this.moveHandleRange}
            />
          </div>
          {this.state.isFullScreen ? (
            <Icon
              className={styles.button}
              onClick={this.dblClickHandlerFullscreen}
              path={mdiFullscreenExit}
              size={2}
              color="white"
            />
          ) : (
            <Icon
              className={styles.button}
              onClick={this.dblClickHandlerFullscreen}
              path={mdiFullscreen}
              size={2}
              color="white"
            />
          )}
          <Icon className={styles.button} onClick={this.clickHandleNext} path={mdiSkipNext} size={2} color="white" />
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
