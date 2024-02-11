import React, { Component } from 'react';

var x = new Date("2024-02-11T23:59:59");
var y = new Date();
let startSeconds = Math.abs(x.getTime() - y.getTime())/1000;

class TimeComponentL extends React.Component {
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
    let hours   = Math.floor(secs / 3600) % 24;
    let minutes = Math.floor(secs / 60) % 60;
    let seconds = secs % 60;
    return [days, hours, minutes, seconds]
        .map(v => ('' + v).padStart(2, '0'))
        // .filter((v,i) => v !== '00' || i > 0)
        .join(':');
  }

  render() {
    return (
      <div>
        -{this.formatTime(this.state.seconds)}
      </div>
    );
  }
}

export default TimeComponentL;