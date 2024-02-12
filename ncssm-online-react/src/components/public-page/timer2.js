import React, { Component } from 'react';

var x = new Date("2024-02-11T23:59:59");
var y = new Date();
let startSeconds = Math.abs(x.getTime() - y.getTime())/1000;

class TimeComponent2 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      seconds: parseInt(startSeconds, 10) || 0
    };
  }

  tick() {
    this.setState(state => ({
      seconds: state.seconds - 1
    }));
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  formatTime(secs) {
    let days = Math.floor(secs/ 86400)
    return [days]
        // .map(v => ('' + v).padStart(2, '0'))
        // .filter((v,i) => v !== '00' || i > 0)
        // .join(':');
  }

  render() {
    return (
    <>{this.formatTime(this.state.seconds)}</>
    );
  }
}

export default TimeComponent2;