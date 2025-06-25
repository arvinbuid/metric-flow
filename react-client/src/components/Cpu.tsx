interface CpuProps {
    cpuData: {
        cpuLoad: number
    }
}

const Cpu = ({ cpuData }: CpuProps) => {
    return <h1>Cpu</h1>;
}

export default Cpu;