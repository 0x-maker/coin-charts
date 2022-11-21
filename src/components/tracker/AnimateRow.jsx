import React, { Component } from 'react';
import { Transition } from 'react-transition-group';

const DURATION = 350;

class AnimateRow extends Component {
  state = {
    value: undefined,
    animation: null
  }

  componentWillReceiveProps(nextProps) {
    const { value } = this.state;
    let animate = this.state.animation;
    let show = false;

    if (value < nextProps.value) {
      show = true;
      animate = 'up';
      this.resetAnimation();
    } else if (value > nextProps.value) {
      animate = 'down';
      show = true;
      this.resetAnimation();
    }

    this.setState({
      value: nextProps.value,
      animation: animate,
      show: show,
    });
  }

  resetAnimation = () => {
    this.timer = setTimeout(() => {
      this.setState({
        show: false
      });
    }, DURATION);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
    this.setState({
      show: false
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { value, show } = this.state;
    return show !== nextState.show || value !== nextProps.value;
  }

  render() {
    const { animation, show } = this.state;
    return (
      <Transition in={show} timeout={DURATION}>
        {(state) => (
          <div className={`anim-bg anim-${animation}-${state}`}></div>
        )}
      </Transition>
    )
  }
}

export default AnimateRow;
