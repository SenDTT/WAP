import os from "node:os";

function checkSystem() {
    return new Promise((resolve, reject) => {
        const totalMemoryInGB = os.totalmem() / 1024 ** 3;
        const cpuCores = os.cpus().length;

        if (totalMemoryInGB < 8) {
          reject("You need at least 8 GB of RAM");
        } else if (cpuCores < 4) {
          reject("Processor must have at least 4 cores");
        } else {
          resolve("System is checked successfully.");
        }
    });
}

checkSystem().then(console.log).catch(console.log);