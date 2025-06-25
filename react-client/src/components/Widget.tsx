import type { PerformanceData } from "../App";
import Cpu from "./Cpu";
import Info from "./Info";
import Memory from "./Memory";
import socket from '../utils/socketConnection'
import { useEffect, useState } from "react";

type connectedOrNotProps = {
    isAlive: boolean,
    machineMacAddress: string
}

const Widget = ({ data }: PerformanceData) => {
    const [isAlive, setIsAlive] = useState(true);

    const { freeMem, totalMem, usedMem, memUsage, osType, uptime, cpuType, numCores, cpuSpeed, cpuLoad, macA } = data;
    const cpuData = { cpuLoad };
    const memData = { freeMem, totalMem, usedMem, memUsage };
    const infoData = { osType, uptime, macA, cpuType, cpuSpeed, numCores };

    const notAliveDiv = !isAlive ? (
        <div className="absolute z-10 bg-zinc-800/90 w-full h-full">
            <div className="flex justify-center items-center h-full">
                <p className="text-red-500 text-7xl font-bold tracking-tighter">OFFLINE</p>
            </div>
        </div>
    ) : <></>;

    useEffect(() => {
        socket.on('connectedOrNot', ({ isAlive, machineMacAddress }: connectedOrNotProps) => {
            console.log('machine mac address: ' + machineMacAddress)
            if (machineMacAddress === macA) {
                setIsAlive(isAlive);
            }
        })
    }, [macA])

    return (
        <>
            <div className="widget">
                {notAliveDiv}
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