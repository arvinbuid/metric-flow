import { useEffect, useState } from "react"
import socket from "./socketConnection"
import Widget from "./components/Widget";

export interface SinglePerformanceData {
  freeMem: number;
  totalMem: number;
  usedMem: number;
  memUsage: number;
  osType: string;
  uptime: number;
  cpuType: string;
  numCores: number;
  cpuSpeed: number;
  cpuLoad: number;
  macA: string;
};

export type PerformanceData = {
  [macA: string]: SinglePerformanceData;
};

function App() {
  // Now 'socket' is available here
  const [performanceData, setPerformanceData] = useState<PerformanceData>({}); // performance data is {}, not []

  useEffect(() => {
    socket.on('perfData', (data: SinglePerformanceData) => {
      setPerformanceData((prevPerformanceData) => {
        return {
          ...prevPerformanceData,
          [data.macA]: data, // Store the new data using its macA as the key
        };
      });
    })

    // Cleanup
    return () => { socket.off('perfData') }
  }, [])

  const widgets = Object.values(performanceData).map((data) => (
    <div key={data.macA}>
      <Widget data={data} />
    </div>
  ))

  return (
    <>
      {widgets}
    </>
  )
}

export default App
