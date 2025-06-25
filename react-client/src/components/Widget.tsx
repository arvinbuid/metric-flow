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
            <div className="widget">
                <h1 className="text-3xl font-semibold my-4 ml-6">Widget</h1>
                <div className="grid grid-cols-3 max-w-4xl mx-auto">
                    <Cpu cpuData={cpuData} />
                    <Memory memData={memData} />
                    <Info infoData={infoData} />
                </div>
            </div>
        </>
    );
}

export default Widget;