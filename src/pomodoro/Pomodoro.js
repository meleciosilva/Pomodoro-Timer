import React, { useState } from "react";
import useInterval from "../utils/useInterval";
import FocusDuration from "./FocusDuration";
import BreakDuration from "./BreakDuration";
import SessionScreen from "./SessionScreen";
import PlayPauseStopButtons from "./PlayPauseStopButtons";

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

  // Starts Pomodoro timer on focus mode
  const [isFocused, setIsFocused] = useState(true);

  // Set intial state of progress bar to 0%
  const [progress, setProgress] = useState(0);

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

  // sets timer on or off when play/pause button is pressed and starts session (displays countdown)
  function playPause() {
    setSession(true);
    setIsTimerRunning((prevState) => !prevState);
  }

  // stops the session and timer, resets playTime to last selected focusTime, and resets to focus mode for next start
  function stopSession() {
    setSession(false);
    setIsTimerRunning(false);
    setIsFocused(true); // resets session to focus mode if stopped during a break
    setPlayTime(focusTime * 60); // resets playTime in seconds
    setProgress(0); // resets progress bar
  }

  // --------------------- functions that are invoked every second ------------------------ //

  // Decrements pomodoro time by 1 second when the timer is running
  function decrementTime() {
    if (playTime >= 1) setPlayTime(prevState => prevState - 1);
  } 

  // switches between focus and break mode when time runs out and plays bell
  function switchModes() {
    if (playTime < 1) {
      new Audio(`https://bigsoundbank.com/UPLOAD/mp3/1482.mp3`).play();
      setPlayTime(isFocused ? breakTime * 60 : focusTime * 60);
      setIsFocused((current) => !current);
    }
  }

  // increases progress bar completion proportionally based on selected focus or break time
  function increaseProgress() {
    if (playTime < 1) return setProgress(0);
    if (isFocused) return setProgress(prevState => prevState + 1/(focusTime*60) * 100);
    if (!isFocused) return setProgress(prevState => prevState + 1/(breakTime*60) * 100);
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

  return (
    <div className="pomodoro">
      <div className="row">
        <FocusDuration focusTime={focusTime} handleAdd={addFocus} handleReduce={reduceFocus} inSession={session} />
        <BreakDuration breakTime={breakTime} handleAdd={addBreak} handleReduce={reduceBreak} inSession={session} />
      </div>
      <PlayPauseStopButtons isTimerRunning={isTimerRunning} inSession={session} handlePlayPause={playPause} handleStop={stopSession} />
      <SessionScreen inSession={session} isTimerRunning={isTimerRunning} progress={progress} focusTime={focusTime} breakTime={breakTime} isFocused={isFocused} playTime={playTime}/>
    </div>
  );
}

export default Pomodoro;
