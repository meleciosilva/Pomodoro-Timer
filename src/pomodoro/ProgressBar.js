import React from "react";

// Displays the progress bar when in session and increases proportionally based on selected focus or break time
function ProgressBar(props) {
  const {progress, isFocused, focusTime, breakTime} = props;

  return (
    <div className="row mb-2">
      <div className="col">
        <div className="progress" style={{ height: "20px" }}>
          <div
            className="progress-bar"
            role="progressbar"
            aria-valuemin="0"
            aria-valuemax={isFocused ? focusTime : breakTime}      
            aria-valuenow={progress}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}

export default ProgressBar;