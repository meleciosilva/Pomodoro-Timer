import React from 'react';

// displays 'PAUSED' message when the timer is not running
function Paused(props) {
  const {isPlayed} = props;

  return (
    <div style={{ fontSize: 36}}>
      {!isPlayed ? "PAUSED" : null}
    </div>
  )
}

export default Paused;