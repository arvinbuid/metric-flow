import { useEffect, useRef } from "react";
import canvasLoadAnimation from '../utils/canvasLoadAnimation'

interface MemoryProps {
    memData: {
        freeMem: number;
        totalMem: number;
        usedMem: number;
        memUsage: number;
    }
}
const Memory = ({ memData }: MemoryProps) => {
    const { freeMem, totalMem, memUsage } = memData;
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (canvasRef.current) {
            canvasLoadAnimation(canvasRef.current, memUsage * 100);
        }
    }, [memUsage])

    const binaryGB = 1073741824
    const totalMemInGB = Math.floor(totalMem / binaryGB * 100) / 100;
    const freeMemInGB = Math.floor(freeMem / binaryGB * 100) / 100;

    return (
        <div className="flex flex-col gap-4">
            <h3 className="text-xl text-center">Memory Usage</h3>
            <div className="relative mt-4">
                <canvas ref={canvasRef} width={200} height={200} className="mx-auto"></canvas>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold">{Math.round(memUsage * 100)}%</div>
            </div>
            <div className="text-center mt-2">
                {/* Total Memory */}
                <p className="text-sm font-semibold">Total Memory: <span className="font-normal">{totalMemInGB} GB</span></p>
                {/* Free Memory */}
                <p className="text-sm font-semibold">Free Memory: <span className="font-normal">{freeMemInGB} GB</span></p>
            </div>
        </div >
    );
}

export default Memory;