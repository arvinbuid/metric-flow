import type { PerformanceData } from "../App";
import Cpu from "./Cpu";
import Info from "./Info";
import Memory from "./Memory";

const Widget = ({ data }: PerformanceData) => {

    const { freeMem, totalMem, usedMem, memUsage, osType, uptime, cpuType, numCores, cpuSpeed, cpuLoad, macA } = data;
    const cpuData = { cpuLoad };
    const memData = { freeMem, totalMem, usedMem, memUsage };
    const infoData = { osType, uptime, macA, cpuType, cpuSpeed, numCores };
    return (
        <>
            <h1>Widget</h1>
            <Cpu cpuData={cpuData} />
            <Memory memData={memData} />
            <Info infoData={infoData} />
        </>
    );
}

export default Widget;