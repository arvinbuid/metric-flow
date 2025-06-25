import moment from 'moment';

interface InfoProps {
    infoData: {
        osType: string;
        uptime: number;
        macA: string;
        cpuType: string;
        cpuSpeed: number;
        numCores: number;
    }
}

const Info = ({ infoData }: InfoProps) => {
    const { osType, uptime, cpuType, cpuSpeed, numCores } = infoData;
    return (
        <div className="cpu-info space-y-4">
            <h3 className="text-2xl font-semibold">Operating System</h3>
            <div>{osType}</div>
            <h3 className="text-2xl font-semibold">Time Online</h3>
            <div>{moment.duration(uptime).humanize()}</div>
            <h3 className="text-2xl font-semibold">Processor information</h3>
            <div><strong>Type:</strong> {cpuType}</div>
            <div><strong>Number of Cores:</strong> {numCores}</div>
            <div><strong>Clock Speed:</strong> {cpuSpeed}</div>
        </div>
    );
}

export default Info;