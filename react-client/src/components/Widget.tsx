import Cpu from "./Cpu";
import Info from "./Info";
import Memory from "./Memory";

const Widget = () => {
    return (
        <>
            <h1>Widget</h1>
            <Cpu />
            <Memory />
            <Info />
        </>
    );
}

export default Widget;