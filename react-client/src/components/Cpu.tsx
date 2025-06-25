import { useEffect, useRef } from "react";
import canvasLoadAnimation from '../utils/canvasLoadAnimation'

interface CpuProps {
    cpuData: {
        cpuLoad: number
    }
}

const Cpu = ({ cpuData }: CpuProps) => {
    const { cpuLoad } = cpuData;
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (canvasRef.current) {
            canvasLoadAnimation(canvasRef.current, cpuLoad);
        }
    }, [cpuLoad])

    return (
        <div className="flex flex-col gap-4">
            <h3 className="text-xl text-center">CPU Load</h3>
            <div className="relative mt-4">
                <canvas ref={canvasRef} width={200} height={200} className="mx-auto"></canvas>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold">{cpuLoad}</div>
            </div>
        </div >
    );
}

export default Cpu;