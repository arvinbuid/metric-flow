import { useEffect, useState } from "react"
import socket from "./utils/socketConnection"
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
    const updatePerformanceData = (data: SinglePerformanceData) => {
      const { macA } = data;
      setPerformanceData((prevPerformanceData) => {
        return {
          ...prevPerformanceData,
          [macA]: data, // Store the new data using its macA as the key
        };
      });
    }

    socket.on('perfData', updatePerformanceData);

    // Cleanup
    return () => { socket.removeListener('perfData', updatePerformanceData) }
  }, [])

  const widgets = Object.values(performanceData).map((data) => (
    <div key={data.macA}>
      <Widget data={data} />
    </div>
  ))

  return (
    <main className="max-w-6xl mx-auto px-6 py-8">
      {widgets}
    </main>
  )
}

export default App
