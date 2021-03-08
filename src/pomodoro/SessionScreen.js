import React from "react";
import ProgressBar from "./ProgressBar";
import Paused from "./Paused";
import FocusOrBreak from "./FocusOrBreak"; 

// displays focusing/on break statement, time remaining, and progress bar when in session
function SessionScreen(props) {
  const {inSession, focusTime, breakTime, isFocused, progress, isTimerRunning, playTime} = props;
  
  return (
    <div style={{display: inSession ? "block" : "none"}}>
      <FocusOrBreak focusTime={focusTime} breakTime={breakTime} isFocused={isFocused} playTime={playTime} />
      <Paused isPlayed={isTimerRunning} />
      <ProgressBar progress={progress} focusTime={focusTime} breakTime={breakTime} isFocused={isFocused} />
    </div>
  )
}

export default SessionScreen;