import React from "react";
import {minutesToDuration} from '../utils/duration';

function FocusDuration(props) {
  const {focusTime, handleAdd, handleReduce, inSession} = props;
  
  return (
    <div className="col">
    <div className="input-group input-group-lg mb-2">
      <span className="input-group-text" data-testid="duration-focus">
        {/* Displays the selected focus time */}
        Focus Duration: {minutesToDuration(focusTime)}
      </span>
      {/* Focus buttons are disabled while in session */}
      <div className="input-group-append">
        <button
          type="button"
          className="btn btn-secondary"
          data-testid="decrease-focus"
          onClick={handleReduce}
          disabled={inSession}
        >
          <span className="oi oi-minus" />
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          data-testid="increase-focus"
          onClick={handleAdd}
          disabled={inSession}
        >
          <span className="oi oi-plus" />
        </button>
      </div>
    </div>
  </div>
  )
}

export default FocusDuration;