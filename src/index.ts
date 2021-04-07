import "./tsoa";

import cluster from "cluster";
import Application from "./Application";
import { initIoc } from "./Container";

if (cluster.isMaster) {
  const cpuCount = require("os").cpus().length;
  for (var i = 0; i < cpuCount; i += 1) {
    cluster.fork();
  }

  cluster.on("exit", function (worker) {
    console.log("Worker " + worker.id + " died.");
    cluster.fork();
  });
} else {
  initIoc();
  try {
    const app = new Application();
    app.start().then(() => console.info("application started"));
  } catch (err) {
    console.error("Error while starting the application.");
    console.error(err);
  }
}
