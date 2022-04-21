import { createServer, build } from "vite";
import { spawn, execSync } from "child_process";
import { platform } from "os";

let cmd = "npm";
if (platform() == "win32") {
  cmd = "npm.cmd";
}

/**
 * @param {import('vite').ViteDevServer} server
 */
function watch(server) {
  /**
   * @type {import('child_process').ChildProcessWithoutNullStreams | null}
   */
  let nodeGuiProcess = null;

  const address = server.httpServer.address();
  const env = Object.assign(process.env, {
    VITE_DEV_SERVER_HOST: address.address,
    VITE_DEV_SERVER_PORT: address.port
  });

  /**
   * @type {import('vite').Plugin}
   */
  const startNodeGui = {
    name: "nodegui-main-watcher",
    writeBundle() {
      if (nodeGuiProcess && !nodeGuiProcess.killed) {
        if (platform() === "win32") {
          try {
            execSync(`taskkill /F /T /PID ${nodeGuiProcess.pid}`); // windows specific
          } catch (error) {
            console.log('error killing node-gui process');
          }
        } else {
          nodeGuiProcess.kill();
        }
      }
      nodeGuiProcess = spawn(cmd, ["exec", "qode", "--inspect", "."], { stdio: "inherit", env });
      nodeGuiProcess.on("close", (code) => {
        if (code == 1) {
          process.exit(0)
        }
      });
    }
  };

  return build({
    mode: "development",
    plugins: [startNodeGui],
    build: {
      watch: true
    }
  });
}

const server = await createServer();

await server.listen();

await watch(server);
