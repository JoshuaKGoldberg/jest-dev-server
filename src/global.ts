import * as cwd from "cwd";
import * as portscanner from "portscanner";
import * as spawnd from "spawnd";
import * as waitPort from "wait-port";

import { readConfig } from "./config";

let server: { destroy: () => Promise<void> } | undefined;

export const setupServer = async () => {
    const config = await readConfig();

    if (config.command === undefined) {
        return;
    }

    if (config.allowExistingServer && config.port) {
        const status = await portscanner.checkPortStatus(config.port, "127.0.0.1");

        if (status !== "closed") {
            return;
        }
    }

    server = spawnd(config.command, {
        shell: true,
        env: process.env,
        cwd: cwd(),
        ...config.options,
    });

    if (config.port) {
        await waitPort({
            output: "silent",
            port: config.port,
            timeout: config.launchTimeout,
        });
    }
};

export const teardownServer = async () => {
    if (server !== undefined) {
        await server.destroy();
    }
};
