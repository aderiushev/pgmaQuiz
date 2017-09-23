import React, { Component } from "react";
import TimerMixin from 'react-timer-mixin';
import {
  Text,
  Left,
  Button,
  Icon,
  Body,
  Title
} from "native-base";
import moment from 'moment';
import mdf from 'moment-duration-format';

import styles from "./styles";

class Timer extends Component {

  componentWillUnmount() {
    clearTimeout(this.interval);
  }

  constructor(props) {
    super(props);
    this.state = {
      durationLeft: moment.duration(props.totalSecondsCount, 's')
    };
    this.interval = null;
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState((state) => {
        if (state.durationLeft.asSeconds() === 0) {
          clearInterval(this.interval);
          this.props.onExpired();
          
          return state;
        } else {
          const durationLeft = state.durationLeft.subtract(moment.duration(1, 's'))
          this.props.onChange(durationLeft.asSeconds())

          return {
            durationLeft 
          }
        }
      })
    }, 1000)
  }

  render() {
    const { totalSecondsCount } = this.props;
    const { durationLeft } = this.state;

    return (
      <Text>Осталось: {durationLeft.format('mm:ss', { trim: false })}</Text>
    );
  }
}

export default Timer;

