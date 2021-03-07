import React, { useState } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
import {minutesToDuration, secondsToDuration} from '../utils/duration';
// import {secondsToDuration} from '../utils/duration';

function Pomodoro() {
  // Session starts on initial page
  const [session, setSession] = useState(false);
  
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  
  // Focus time starts at 25 minutes
  const [focusTime, setFocusTime] = useState(1);

  // adds 5 minutes of focus time per click up to 60 minutes
  function addFocus() {
    setFocusTime(prevTime => {
      return prevTime <= 55 ? prevTime + 5 : prevTime
    })
  }
  
  // reduces 5 minutes of focus time down to 5 minutes
  function reduceFocus() {
    setFocusTime(prevTime => {
      return prevTime >= 10 ? prevTime - 5 : prevTime;
    })
  }
  // Pomodoro play time starts at selected focus time
  const [playTime, setPlayTime] = useState(focusTime * 60);

  // Starts Pomodoro timer on focus mode
  const [isFocused, setIsFocused] = useState(true);

  // Decrements pomodoro time by 1 second when the timer is running
  function decrementTime() {
    if (playTime >= 1) setPlayTime(prevState => prevState - 1);
    if (playTime === 0 && isFocused) {
      setPlayTime(breakTime * 60);
      setIsFocused(current => !current);
    } 
    if (playTime === 0 && !isFocused) {
      setPlayTime(focusTime * 60);
      setIsFocused(current => !current);
    }
  } 
  
  // Invokes decrementTime function every 1000ms (1 sec) when the timer is running
  useInterval(
    () => {
      decrementTime();
    },
    isTimerRunning ? 1000 : null
  );

  // sets timer on or off when play/pause button is pressed
  function playPause() {
    setSession(true);
    setIsTimerRunning((prevState) => !prevState);
  }

  // stops the focus or break time if stop button is pressed
  function stopSession() {
    setSession(false);
    setIsTimerRunning(false);
    setPlayTime(focusTime * 60);
  }

  // Displays the selected break time
  const [breakTime, setBreakTime] = useState(3);
  
  function addBreak() {
    setBreakTime(prevTime => {
      return prevTime <= 14 ? prevTime + 1 : prevTime
    })
  }
  
  function reduceBreak() {
    setBreakTime(prevTime => {
      return prevTime >= 2 ? prevTime - 1 : prevTime;
    })
  }


  return (
    <div className="pomodoro">
      <div className="row">
        <div className="col">
          <div className="input-group input-group-lg mb-2">
            <span className="input-group-text" data-testid="duration-focus">
              {/* Displays the selected focus time */}
              Focus Duration: {minutesToDuration(focusTime)}
            </span>
            <div className="input-group-append">
              {/* TODO: Implement decreasing focus duration and disable during a focus or break session */}
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="decrease-focus"
                onClick={reduceFocus}
                disabled={session}
              >
                <span className="oi oi-minus" />
              </button>
              {/* TODO: Implement increasing focus duration  and disable during a focus or break session */}
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="increase-focus"
                onClick={addFocus}
                disabled={session}
              >
                <span className="oi oi-plus" />
              </button>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="float-right">
            <div className="input-group input-group-lg mb-2">
              <span className="input-group-text" data-testid="duration-break">
                {/* TODO: Update this text to display the current break session duration */}
                Break Duration: {minutesToDuration(breakTime)}
              </span>
              <div className="input-group-append">
                {/* TODO: Implement decreasing break duration and disable during a focus or break session*/}
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-testid="decrease-break"
                  onClick={reduceBreak}
                  disabled={session}
                >
                  <span className="oi oi-minus" />
                </button>
                {/* TODO: Implement increasing break duration and disable during a focus or break session*/}
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-testid="increase-break"
                  onClick={addBreak}
                  disabled={session}
                >
                  <span className="oi oi-plus" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div
            className="btn-group btn-group-lg mb-2"
            role="group"
            aria-label="Timer controls"
          >
            <button
              type="button"
              className="btn btn-primary"
              data-testid="play-pause"
              title="Start or pause timer"
              onClick={playPause}
            >
              <span
                className={classNames({
                  oi: true,
                  "oi-media-play": !isTimerRunning,
                  "oi-media-pause": isTimerRunning,
                })}
              />
            </button>
            {/* TODO: Implement stopping the current focus or break session and disable when there is no active session */}
            <button
              type="button"
              className="btn btn-secondary"
              title="Stop the session"
              onClick={stopSession}
              disabled={!session}
            >
              <span className="oi oi-media-stop" />
            </button>
          </div>
        </div>
      </div>
      <div style={{ display: session ? 'block' : 'none'}}>
        {/* TODO: This area should show only when a focus or break session is running or pauses */}
        <div className="row mb-2">
          <div className="col">
            {/* TODO: Update message below to include current session (Focusing or On Break) and total duration */}
            <h2 data-testid="session-title">{isFocused ? "Focusing" : "On Break"} for {minutesToDuration(isFocused ? focusTime : breakTime)}</h2>
            {/* TODO: Update message below to include time remaining in the current session */}
            <p className="lead" data-testid="session-sub-title">
              {secondsToDuration(playTime)} remaining
            </p>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col">
            <div className="progress" style={{ height: "20px" }}>
              <div
                className="progress-bar"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax={isFocused ? focusTime : breakTime}
                aria-valuenow={playTime} // TODO: Increase aria-valuenow as elapsed time increases
                style={{ width: playTime }} // TODO: Increase width % as elapsed time increases
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pomodoro;
