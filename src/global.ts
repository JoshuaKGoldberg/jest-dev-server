import * as cwd from "cwd";
import * as spawnd from "spawnd";
import * as waitPort from "wait-port";

import { readConfig } from "./config";

let server: { destroy: () => Promise<void> } | undefined;

export const setupServer = async () => {
    const config = await readConfig();

	server = spawnd(config.command, {
		shell: true,
		env: process.env,
        cwd: cwd(),
        ...config.options,
	});

	await waitPort({
		port: config.port,
		output: "silent",
	});
};

export const teardownServer = async () => {
	if (server !== undefined) {
		await server.destroy();
	}
};
