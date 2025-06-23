import React, { useState, useEffect, useRef } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import { FaCirclePlay, FaCircleStop, FaCircleChevronLeft, FaCirclePause } from "react-icons/fa6";
import { useNavigate } from "react-router";

export default function TimerRun() {
  const navigate = useNavigate();
  const timerRef = useRef(null);

  // Get task & duration from localStorage
  const savedData = JSON.parse(localStorage.getItem("timerData") || "{}");
  const { task, durationSeconds } = savedData;

  const [secondsLeft, setSecondsLeft] = useState(0);
  const [initialDuration] = useState(durationSeconds || 0);
  const [isRunning, setIsRunning] = useState(false);

  // On first load
  useEffect(() => {
    if (!task || durationSeconds === undefined) {
      navigate("/");
      return;
    }

    const storedSeconds = parseInt(localStorage.getItem("secondsLeft") || durationSeconds);
    const storedRunning = localStorage.getItem("isRunning") === "true";

    setSecondsLeft(storedSeconds);
    setIsRunning(false); // Don't auto-run
  }, [task, durationSeconds, navigate]);

  // Countdown logic
  useEffect(() => {
    if (isRunning && secondsLeft > 0) {
      timerRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          const next = prev - 1;
          localStorage.setItem("secondsLeft", next.toString());

          if (next <= 0) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            localStorage.removeItem("timerData");
            localStorage.removeItem("secondsLeft");
            localStorage.removeItem("isRunning");
            alert("Time's up!");
          }

          return next;
        });
      }, 1000);
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning, secondsLeft]);

  const progressValue = initialDuration
    ? (secondsLeft / initialDuration) * 100
    : 0;

  const stopTimer = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    localStorage.setItem("isRunning", "false");
  };

  const resumeTimer = () => {
    if (secondsLeft > 0) {
      setIsRunning(true);
      localStorage.setItem("isRunning", "true");
    }
  };

  const resetTimer = () => {
    setSecondsLeft(initialDuration);
    setIsRunning(false);
    localStorage.setItem("secondsLeft", initialDuration.toString());
    localStorage.setItem("isRunning", "false");
  };

  return (
    <div className="p-6 bg-[#FFF2EB] shadow-0 md:shadow-lg rounded-2xl h-full md:h-[35rem] w-full md:w-[20rem] flex flex-col justify-around items-center">
      <h1 className="text-2xl font-bold mb-4 text-center">{task}</h1>

      <div style={{ position: 'relative', width: 200, height: 200 }}>
        <CircularProgressbar
          value={progressValue}
          strokeWidth={16}
          styles={buildStyles({
            pathColor: progressValue > 20 ? "#FF9898" : "#f44336",
            trailColor: "#FFDCDC",
            strokeLinecap: "round",
          })}
        />

        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            color: '#333',
          }}
        >
          {secondsLeft >= 3600 ? (
            <>
              <div style={{ fontSize: 16 }}>
                {Math.floor(secondsLeft / 3600)} hr
              </div>
              <div style={{ fontSize: 14 }}>
                {Math.floor((secondsLeft % 3600) / 60)}:
                {(secondsLeft % 60).toString().padStart(2, '0')}
              </div>
            </>
          ) : secondsLeft >= 60 ? (
            <>
              <div className="text-3xl font-bold">
                {Math.floor(secondsLeft / 60)} min
              </div>
              <div style={{ fontSize: 14 }}>
                {secondsLeft % 60} sec
              </div>
            </>
          ) : (
            <div className="text-3xl font-bold">
              {secondsLeft} sec
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-around items-center w-full">
        <FaCircleChevronLeft className="text-[#FF9898] bg-white rounded-full w-12 h-12 hover:text-[#ff4d6d]" onClick={() => navigate("/")} />

        {!isRunning && secondsLeft > 0 && (
          <FaCirclePlay className="text-[#FF9898] bg-white rounded-full w-12 h-12 hover:text-[#ff4d6d]" onClick={resumeTimer} />
        )}
        {isRunning && (
          <FaCirclePause className="text-[#FF9898] bg-white rounded-full w-12 h-12 hover:text-[#ff4d6d]" onClick={stopTimer} />
        )}

        <FaCircleStop className="text-[#FF9898] bg-white rounded-full w-12 h-12 hover:text-[#ff4d6d]" onClick={resetTimer} />
      </div>
    </div>
  );
}
