import React from "react";
import {minutesToDuration} from '../utils/duration';

function BreakDuration(props) {
  const {breakTime, handleAdd, handleReduce, inSession} = props;

  return (
    <div className="col">
      <div className="float-right">
        <div className="input-group input-group-lg mb-2">
          <span className="input-group-text" data-testid="duration-break">
            {/* Displays the selected break time */}
            Break Duration: {minutesToDuration(breakTime)}
          </span>
          {/* Break buttons are disabled while in session */}
          <div className="input-group-append">
            <button
              type="button"
              className="btn btn-secondary"
              data-testid="decrease-break"
              onClick={handleReduce}
              disabled={inSession}
            >
              <span className="oi oi-minus" />
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-testid="increase-break"
              onClick={handleAdd}
              disabled={inSession}
            >
              <span className="oi oi-plus" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BreakDuration;