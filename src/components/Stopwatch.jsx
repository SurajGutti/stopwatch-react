import { useState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";

const Stopwatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalIDRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      intervalIDRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10);
    }
    return () => {
      clearInterval(intervalIDRef.current);
    };
  }, [isRunning]);

  const start = () => {
    setIsRunning(true);
    startTimeRef.current = Date.now() - elapsedTime;
  };

  const stop = () => {
    setIsRunning(false);
  };

  const reset = () => {
    setElapsedTime(0);
    setIsRunning(false);
  };

  const formatTime = () => {
    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let seconds = Math.floor((elapsedTime / 1000) % 60);
    let millseconds = Math.floor((elapsedTime % 1000) / 10);

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    millseconds = String(millseconds).padStart(2, "0");

    return `${hours}:${minutes}:${seconds}:${millseconds}`;
  };

  return (
    <>
      <div className="stopwatch">
        <div className="display">{formatTime()}</div>
        <div className="controls">
          <button onClick={start} type="button" className="start" id="start">
            Start
          </button>
          <button onClick={stop} type="button" className="stop" id="stop">
            Stop
          </button>
          <button onClick={reset} type="button" className="reset" id="reset">
            Reset
          </button>
        </div>
      </div>
    </>
  );
};

export default Stopwatch;
