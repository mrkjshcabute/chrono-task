import './App.css'
import TimerSetup from './pages/TimerSetup'
import TimerRun from './pages/TimerRun';
import { Routes, Route } from "react-router";

function App() {
  return (
    <div className="h-screen bg-[#FFF2EB] md:bg-[#FFDCDC] flex items-center justify-center">
      <Routes>
        <Route path="/" element={<TimerSetup />} />
        <Route path="/timerrun" element={<TimerRun />} />
      </Routes>
    </div>
  )
}

export default App
