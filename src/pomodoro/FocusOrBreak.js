import React from "react";
import {minutesToDuration, secondsToDuration} from '../utils/duration';

function FocusOrBreak(props) {
  const {isFocused, focusTime, breakTime, playTime} = props;

  return (
    <div className="row mb-2">
      <div className="col">
        {/* Displays current session (Focuing or On Break) and selected focus or break time */}
        <h2 data-testid="session-title">{isFocused ? "Focusing" : "On Break"} for {minutesToDuration(isFocused ? focusTime : breakTime)} minutes</h2>
        {/* Displays time remaining in current session (focus or break) in MM/SS */}
        <p className="lead" data-testid="session-sub-title">
          {secondsToDuration(playTime)} remaining
        </p>
      </div>
    </div>
  )
}

export default FocusOrBreak;