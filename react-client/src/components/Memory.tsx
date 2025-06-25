interface MemoryProps {
    memData: {
        freeMem: number;
        totalMem: number;
        usedMem: number;
        memUsage: number;
    }
}
const Memory = ({ memData }: MemoryProps) => {
    return <h1>Memory</h1>;
}

export default Memory;