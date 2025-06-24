const os = require("os");

// initialize socket connection to server
const io = require("socket.io-client");
const socket = io("http://localhost:3000");

socket.on("connect", () => {
  // console.log("node client connected!");
  // identify this machine to the server for front-end usage
  const nI = os.networkInterfaces(); // list of all network interfaces in this machine
  // console.log(nI);
  let macA;
  for (const key in nI) {
    const isNetworkFacing = !nI[key][0].internal;
    if (isNetworkFacing) {
      // there is a mac address that can be use.
      macA = nI[key][0].mac;
      break;
    }
  }
  console.log(macA);
});

// total memory
const totalMem = os.totalmem();

// free memory
const freeMem = os.freemem();

// memory usage
const usedMem = totalMem - freeMem;
const memUsage = Math.floor((usedMem / totalMem) * 100) / 100; // 2 decimal places

// get cpu average
const cpuAverage = () => {
  const cpus = os.cpus();
  let idleMs = 0;
  let totalMs = 0;

  // loop through each cpu core
  cpus.forEach((core) => {
    // iterate through each mode in core.times
    for (mode in core.times) {
      totalMs += core.times[mode];
    }
    idleMs += core.times.idle;
  });
  return {
    idle: idleMs / cpus.length, // avg idle time per core
    total: totalMs / cpus.length, // avg total cpu time per core
  };
};

// calculate & display current cpu load
const getCpuLoad = () =>
  new Promise((resolve, reject) => {
    // call cpuAverage for "now"
    const start = cpuAverage();
    setTimeout(() => {
      // "call cpuAverage for "end" 100ms after "now"
      const end = cpuAverage();
      // calculate the difference in idle and total time
      const idleDiff = end.idle - start.idle;
      const totalDiff = end.total - start.total;
      // console.log(idleDiff, totalDiff);
      // calculate the % of used cpu
      const percentOfCpu = 100 - Math.floor((100 * idleDiff) / totalDiff);
      resolve(percentOfCpu);
    }, 100);
  });

const performanceLoadData = () =>
  new Promise(async (resolve, reject) => {
    // current cpu load
    const cpus = os.cpus();

    // os type
    const osType = os.type() === "Darwin" ? "Mac" : os.type();
    // console.log(osType);

    // uptime
    const uptime = os.uptime();
    // console.log(uptime);

    // cpu info
    // cpu type
    const cpuType = cpus[0].model;
    // number of cores
    const numCores = cpus.length;
    // clock speed
    const cpuSpeed = cpus[0].speed;
    // console.log(cpus);
    // console.log(cpuType, numCores, cpuSpeed);
    const cpuLoad = await getCpuLoad();
    resolve({
      freeMem,
      totalMem,
      usedMem,
      memUsage,
      osType,
      uptime,
      cpuType,
      numCores,
      cpuSpeed,
      cpuLoad,
    });
  });
