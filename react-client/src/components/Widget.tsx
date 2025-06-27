import type { PerformanceData } from "../App";
import Cpu from "./Cpu";
import Info from "./Info";
import Memory from "./Memory";
import socket from '../utils/socketConnection'
import { useEffect, useState, useRef, useCallback } from "react"; // Added useRef, useCallback

import './Widget.css';

type connectedOrNotProps = {
    isAlive: boolean,
    machineMacAddress: string
}

const Widget = ({ data }: PerformanceData) => {
    const { freeMem, totalMem, usedMem, memUsage, osType, uptime, cpuType, numCores, cpuSpeed, cpuLoad, macA } = data;

    const [isAlive, setIsAlive] = useState(true);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    const cpuData = { cpuLoad };
    const memData = { freeMem, totalMem, usedMem, memUsage };
    const infoData = { osType, uptime, macA, cpuType, cpuSpeed, numCores };

    const notAliveDiv = !isAlive ? (
        <div className="absolute top-0 left-0 z-20 bg-zinc-800/90 w-full h-full rounded-[var(--card-radius)]">
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

    const handlePointerEnter = useCallback(() => {
        if (wrapperRef.current) {
            wrapperRef.current.classList.add('active');
        }
    }, []);

    const handlePointerLeave = useCallback(() => {
        if (wrapperRef.current) {
            wrapperRef.current.classList.remove('active');
        }
    }, []);

    return (
        <div
            ref={wrapperRef}
            className="widget-card-wrapper"
            onMouseEnter={handlePointerEnter}
            onMouseLeave={handlePointerLeave}
        >
            <p className="text-center text-4xl font-semibold tracking-wide mt-6 mb-10">Metric Flow</p>
            <section ref={cardRef} className="widget-card">
                <div className="widget-inside" />
                <div className="relative z-10 p-6">
                    {notAliveDiv}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 max-w-4xl mx-auto space-y-6">
                        <Cpu cpuData={cpuData} />
                        <Memory memData={memData} />
                        <Info infoData={infoData} />
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Widget;