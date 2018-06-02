import * as cwd from "cwd";
import { merge } from "lodash";
import { exists } from "mz/fs";
import * as path from "path";

export interface IConfig {
    allowExistingServer?: boolean;
    args?: string[];
    command?: string;
    launchTimeout?: number;
    port?: number;
    options?: {};
}

const CONFIG_PATH = path.join(cwd(), "jest-dev-server.config.js")

const DEFAULT_CONFIG = {};

const DEFAULT_CONFIG_CI = {
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
};

export const readConfig = async (): Promise<IConfig> => {
    const defaultConfig =
        process.env.CI === "true"
            ? DEFAULT_CONFIG_CI
            : DEFAULT_CONFIG;

    if (!await exists(CONFIG_PATH)) {
        return defaultConfig;
    }

    const localConfig = require(CONFIG_PATH);
    return merge({}, defaultConfig, localConfig);
};
