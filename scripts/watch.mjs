import { createServer, build } from "vite";
import { spawn } from "child_process";
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
    name: "electron-main-watcher",
    writeBundle() {
      nodeGuiProcess && nodeGuiProcess.kill();
      nodeGuiProcess = spawn(cmd, ["exec", "qode", "."], { stdio: "inherit", env });
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
