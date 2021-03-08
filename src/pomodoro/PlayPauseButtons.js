import React from "react";
import classNames from "../utils/class-names";

// Displays the Play/Pause and Stop buttons
function PlayPauseStopButtons(props) {
  const {isTimerRunning, inSession, handlePlayPause, handleStop} = props

  return (
    <div className="row">
      <div className="col">
        <div
          className="btn-group btn-group-lg mb-2"
          role="group"
          aria-label="Timer controls"
        >
          {/* When session is started, the play/pause button starts session and starts/stop timer */}
          <button
            type="button"
            className="btn btn-primary"
            data-testid="play-pause"
            title="Start or pause timer"
            onClick={handlePlayPause}
          >
            <span
              className={classNames({
                oi: true,
                "oi-media-play": !isTimerRunning,
                "oi-media-pause": isTimerRunning,
              })}
            />
          </button>
          {/* When session is stopped, the stop button is disabled and the user can adjust focus & break time */}
          <button
            type="button"
            className="btn btn-secondary"
            title="Stop the session"
            onClick={handleStop}
            disabled={!inSession}
          >
            <span className="oi oi-media-stop" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default PlayPauseStopButtons;