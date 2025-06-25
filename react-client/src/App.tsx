import { useEffect, useState } from "react"
import socket from "./socketConnection"
import Widget from "./components/Widget";

interface PerformanceData {
  [key: string]: string;
}

function App() {
  // Now 'socket' is available here
  const [performanceData, setPerformanceData] = useState<PerformanceData>({}); // performance data is {}, not []

  useEffect(() => {
    socket.on('perfData', (data) => {
      console.log(data);
      const copyPerfData = { ...performanceData };
      copyPerfData[data.macA] = data; // mutate macA data
      setPerformanceData(copyPerfData);
    })
  }, [performanceData])

  return (
    <>
      <Widget />
    </>
  )
}

export default App
