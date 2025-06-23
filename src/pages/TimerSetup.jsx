import React, { useState } from "react";
import { LocalizationProvider, MobileTimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useNavigate } from "react-router";
import Logo from "../assets/logo.png"

const pickerTheme = createTheme({
  components: {
    MuiClockPointer: {
      styleOverrides: {
        root: {
          backgroundColor: "#FF9898 !important",
          color: "#FF9898 !important",
        },
        pointer: {
          backgroundColor: "#FF9898 !important",
          color: "#FF9898 !important",
        },
        thumb: {
          backgroundColor: "#FF9898 !important",
          borderColor: "#FF9898 !important",
        },
      },
    },
    MuiClock: {
      styleOverrides: {
        root: {
          "& .MuiClock-pin": {
            backgroundColor: "#FF9898 !important",
          },
          "& [class*='pin']": {
            backgroundColor: "#FF9898 !important",
          },
        },
      },
    },
    MuiClockNumber: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "#ffdde1",
          },
        },
        selected: {
          backgroundColor: "#FF9898",
          color: "#fff",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        text: {
          color: "#FF9898",
          "&:hover": {
            backgroundColor: "#FFF2EB",
          },
        },
      },
    },
  },
});

export default function TimerSetup() {
  const [task, setTask] = useState("");
  const [durationTime, setDurationTime] = useState(new Date(1970, 0, 1, 0, 0, 0));
  const navigate = useNavigate();

  const handleStart = () => {
    const h = durationTime.getHours();
    const m = durationTime.getMinutes();
    const s = durationTime.getSeconds();
    const totalSeconds = h * 3600 + m * 60 + s;

    if (!task.trim()) {
      alert("Please enter a task name");
    } else if (totalSeconds <= 0) {
      alert("Please set a valid duration");
    } else {
      // Save timer data for use in TimerRun
      localStorage.setItem("timerData", JSON.stringify({
        task,
        durationSeconds: totalSeconds,
      }));
      localStorage.setItem("secondsLeft", totalSeconds.toString());
      localStorage.setItem("isRunning", "false");

      navigate("/timerrun");
    }
  };

  return (
    <div className="p-6 bg-[#FFF2EB] shadow-0 md:shadow-lg rounded-2xl h-[35rem] w-[20rem] flex flex-col justify-around items-center">
      <img src={Logo} alt="Logo" />

      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter task name"
        className="w-full mb-4 p-2 border-2 border-transparent focus:border-[#FF9898] rounded-lg bg-white outline-none"
      />

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={pickerTheme}>
          <MobileTimePicker
            ampm={false}
            views={["hours", "minutes", "seconds"]}
            value={durationTime}
            onChange={(newValue) =>
              setDurationTime(newValue || new Date(1970, 0, 1, 0, 0, 0))
            }
            className="bg-white rounded-lg"
            slotProps={{
              textField: {
                fullWidth: true,
                sx: {
                  "& *": {
                    border: "none !important",
                    borderBottom: "none !important",
                    "&:before": { display: "none !important" },
                    "&:after": { display: "none !important" },
                  },
                  "& .MuiOutlinedInput-root, & .MuiInput-root, & .MuiFilledInput-root": {
                    "& fieldset": { display: "none !important" },
                    "&:hover fieldset": { display: "none !important" },
                    "&.Mui-focused fieldset": { display: "none !important" },
                    "&:before": { display: "none !important" },
                    "&:after": { display: "none !important" },
                    "&:hover:not(.Mui-disabled):before": { display: "none !important" },
                    border: "none !important",
                    borderBottom: "none !important",
                  },
                  "& .MuiInputBase-root": {
                    border: "none !important",
                    borderBottom: "none !important",
                    "&:before": { display: "none !important" },
                    "&:after": { display: "none !important" },
                  },
                  "& .MuiInputLabel-root": { color: "#FF9898" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#ff4d6d" },
                  input: { color: "#333" },
                  "& .MuiSvgIcon-root": {
                    color: "#FF9898",
                  },
                },
              },
            }}
          />
        </ThemeProvider>
      </LocalizationProvider>

      <button
        onClick={handleStart}
        className="mt-4 w-full px-4 py-2 bg-[#FF9898] text-white font-bold rounded-lg hover:bg-[#ff4d6d] focus:bg-[#ff4d6d]"
      >
        Start Timer
      </button>
    </div>
  );
}
