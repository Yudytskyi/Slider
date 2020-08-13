export const moveOnDidMount = props => {
  props.clickHandlePlay();
  const elem = document.getElementById('slider');

  elem.onmousedown = e => {
    if (!props.isMove) {
      props.currentX = e.clientX;
      props.currentY = e.clientY;
    }
    props.isMove = true;
  };
  elem.onmouseup = e => {
    props.isMove = false;
  };
};

export const clickHandlerFullscreen = props => {
  props.setState({ isFullScreen: !props.state.isFullScreen });
  document.getElementById('slider').style = { top: '0px', left: '0px' };
};

// export const click = {
//   clickHandlePrev: props =>
//     props.setState({
//       currentSlideNumber: (props.state.currentSlideNumber - 1 + props.slides.length) % props.slides.length,
//     }),

//   clickHandlePlay: props => props.setState({ isPlaying: !props.state.isPlaying }),
//   clickHandleStop: props => props.setState({ isPlaying: false }),
//   moveHandleRange: props => {
//     if (props.state.speedPlaying !== props.e.target.value) {
//       props.setState({ speedPlaying: props.e.target.value });
//     }
//   },
//   clickHandleNext: props =>
//     props.setState({ currentSlideNumber: (props.state.currentSlideNumber + 1) % props.slides.length }),
// };
