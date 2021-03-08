import React, { useState } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
import {minutesToDuration, secondsToDuration} from '../utils/duration';

function Pomodoro() {
  // Starts with session awaiting start
  const [session, setSession] = useState(false);
  
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  
  // Focus time starts at 25 minutes
  const [focusTime, setFocusTime] = useState(25);

  // Break time starts at 5 minutes
  const [breakTime, setBreakTime] = useState(5);

  // Pomodoro play time starts at 25 minutes (1500 seconds)
  const [playTime, setPlayTime] = useState(1500);

  // adds 5 minutes of focusTime & playTime up to 60 minutes
  function addFocus() {
    setFocusTime(prevTime => prevTime < 60 ? prevTime + 5 : prevTime);
    setPlayTime(prevTime => prevTime < 3600 ? prevTime + 300 : prevTime);
  }
  
  // reduces 5 minutes of focusTime & playTime down to 5 minutes
  function reduceFocus() {
    setFocusTime(prevTime => prevTime > 5 ? prevTime - 5 : prevTime);
    setPlayTime(prevTime => prevTime > 300 ? prevTime - 300 : prevTime);
  }

  // adds 1 minute to break time up to 15 minutes
  function addBreak() {
    setBreakTime(prevTime => prevTime < 15 ? prevTime + 1 : prevTime);
  }
  
  // reduces 1 minute of break time down to 1 minute
  function reduceBreak() {
    setBreakTime(prevTime => prevTime > 1 ? prevTime - 1 : prevTime);
  }

  // Starts Pomodoro timer on focus mode
  const [isFocused, setIsFocused] = useState(true);

  // Decrements pomodoro time by 1 second when the timer is running
  function decrementTime() {
    if (playTime >= 1) setPlayTime(prevState => prevState - 1);
  } 

  // switches between focus and break mode when time runs out and plays bell
  function switchModes() {
    if (playTime < 1) {
      setPlayTime(isFocused ? breakTime * 60 : focusTime * 60);
      setIsFocused((current) => !current);
      new Audio(`https://bigsoundbank.com/UPLOAD/mp3/1482.mp3`).play();
    }
  }

  // Set intial state of progress bar to 0%
  const [progress, setProgress] = useState(0);

  // increases progress bar completion
  function increaseProgress() {
    if (playTime < 1) return setProgress(0);
    if (isFocused) {
      setProgress(prevState => prevState + 1/(focusTime*60) * 100);
    } else {
        setProgress(prevState => prevState + 1/(breakTime*60) * 100);
    }
  }

  // Invokes decrementTime, switchModes, and increaseProgress functions every 1000ms (1 sec) when the timer is running
  useInterval(
    () => {
      decrementTime();
      switchModes();
      increaseProgress();
    },
    isTimerRunning ? 1000 : null
  );

  // sets timer on or off when play/pause button is pressed and starts session (displays countdown)
  function playPause() {
    setSession(true);
    setIsTimerRunning((prevState) => !prevState);
  }

  // stops the session and timer, resets playTime to last selected focusTime, and resets to focus mode for next start
  function stopSession() {
    setSession(false);
    setIsTimerRunning(false);
    setIsFocused(true);
    setPlayTime(focusTime * 60);
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
                aria-valuenow={progress} // TODO: Increase aria-valuenow as elapsed time increases
                style={{ width: `${progress}%` }} // TODO: Increase width % as elapsed time increases
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pomodoro;
