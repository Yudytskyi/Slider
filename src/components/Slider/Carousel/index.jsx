import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from '@mdi/react';
import {
  mdiPlay,
  mdiStop,
  mdiSkipNext,
  mdiSkipPrevious,
  mdiFullscreen,
  mdiFullscreenExit,
  mdiCogOutline,
} from '@mdi/js';

import styles from './Carousel.module.scss';
import { moveOnDidMount, clickHandlerFullscreen } from './move';
import Slide from '../Slide';
class Carousel extends Component {
  constructor(props) {
    super(props);
    const { slides, sliderStyles } = this.props;
    this.slides = slides;
    this.sliderStyles = sliderStyles;
    this.currentX = sliderStyles.currentPosition.left;
    this.currentY = sliderStyles.currentPosition.top;

    this.state = {
      isPlaying: false,
      speedPlaying: 5,
      maxSpeed: 10,
      isFullScreen: false,
      currentSlideNumber: 0,
      time: new Date(),
    };
    this.isFullScreen = false;
    this.timeoutId = null;
    this.isMove = false;
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
    moveOnDidMount(this);
  }
  moveElement = e => {
    if (this.isMove) {
      const elementSlider = document.getElementById('slider');
      elementSlider.style.top = `${e.clientY - this.currentY}px`;
      elementSlider.style.left = `${e.clientX - this.currentX}px`;
    }
  };

  componentDidUpdate(prevProps, prevState) {
    const { isPlaying, speedPlaying, maxSpeed } = this.state;
    this.clear();
    if (isPlaying) {
      this.timeoutId = setTimeout(this.tick, (maxSpeed - speedPlaying) * 1000);
    }
  }

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
      <div
        className={styles.carousel}
        style={currentStyles}
        onDoubleClick={() => clickHandlerFullscreen(this)}
        onMouseMove={this.moveElement}
      >
        <Slide slide={this.slides[this.state.currentSlideNumber]} bgSize={bgSize} />
        <div className={styles.buttonsBlock}>
          <Icon onClick={() => {}} path={mdiCogOutline} size={1} />
          <div className={styles.movesBlock}>
            <div className={styles.movesBlock__playControl}>
              <Icon onClick={this.clickHandlePrev} path={mdiSkipPrevious} size={1} />
              {this.state.isPlaying ? (
                <Icon onClick={this.clickHandleStop} path={mdiStop} size={1} />
              ) : (
                <Icon onClick={this.clickHandlePlay} path={mdiPlay} size={1} />
              )}
              <Icon onClick={this.clickHandleNext} path={mdiSkipNext} size={1} />
            </div>
            <input
              type="range"
              min="1"
              max={this.state.maxSpeed - 1}
              value={this.state.speedPlaying}
              onChange={this.moveHandleRange}
            />
          </div>
          {this.state.isFullScreen ? (
            <Icon onClick={() => clickHandlerFullscreen(this)} path={mdiFullscreenExit} size={1} />
          ) : (
            <Icon onClick={() => clickHandlerFullscreen(this)} path={mdiFullscreen} size={1} />
          )}
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
    width: '600px',
    height: '450px',
    backgroundColor: '#313131',
    isSlideContain: true,
    currentPosition: { top: 10, left: 10 },
  },
};

export default Carousel;
