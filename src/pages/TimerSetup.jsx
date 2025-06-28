import React, { useState } from "react";
import { LocalizationProvider, MobileTimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import Logo from "../assets/chrono-logo.png";

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
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="p-6 bg-[#FFF2EB] shadow-0 md:shadow-lg rounded-2xl h-[35rem] w-[20rem] flex flex-col justify-around items-center"
    >
      <motion.img
        src={Logo}
        alt="Logo"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      />

      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter task name"
        className="w-full mb-4 p-2 border-2 border-transparent focus:border-[#FF9898] rounded-lg bg-white outline-none transition duration-300 ease-in-out"
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
                    "&:before, &:after": { display: "none !important" },
                  },
                  "& .MuiOutlinedInput-root, & .MuiInput-root, & .MuiFilledInput-root": {
                    "& fieldset": { display: "none !important" },
                    "&:hover fieldset": { display: "none !important" },
                    "&.Mui-focused fieldset": { display: "none !important" },
                    border: "none !important",
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

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleStart}
        className="mt-4 w-full px-4 py-2 bg-[#FF9898] text-white font-bold rounded-lg hover:bg-[#ff4d6d] focus:bg-[#ff4d6d] transition duration-200"
      >
        Start Timer
      </motion.button>
    </motion.div>
  );
}
