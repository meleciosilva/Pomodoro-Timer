import React from 'react';

// displays 'PAUSED' message when the timer is not running
function Paused(props) {
  const {isTimerRunning} = props;

  return (
    <div style={{display: isTimerRunning ? 'none' : 'block', fontSize: 36}}>
      PAUSED
    </div>
  )
}

export default Paused;