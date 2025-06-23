const os = require("os");

// total memory
const totalMem = os.totalmem();

// free memory
const freeMem = os.freemem();
console.log(totalMem, freeMem);

// memory usage
const usedMem = totalMem - freeMem;
const memUsage = Math.floor((usedMem / totalMem) * 100) / 100; // 2 decimal places
console.log(memUsage);

// current cpu load
const cpus = os.cpus();

// os type
const osType = os.type() === "Darwin" ? "Mac" : os.type();
console.log(osType);

// uptime
const uptime = os.uptime();
console.log(uptime);

// cpu info
// type
const cpuType = cpus[0].model;
// number of cores
const numCores = cpus.length;
// clock speed
const clockSpeed = cpus[0].speed;
console.log(cpus);
console.log(cpuType, numCores, clockSpeed);
