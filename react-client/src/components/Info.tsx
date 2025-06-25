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
    return <h1>Info</h1>;
}

export default Info;