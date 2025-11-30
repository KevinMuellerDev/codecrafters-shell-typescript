import { file } from "bun";
import { cmdList } from "./commandlist";
import fs from "fs"

/**
 * Checks if a command is a shell builtin or not found.
 * @param input - An array of strings where the second element (index 1) is the command to check
 * @returns void
 */
export default async function typeCheck(input: string[]): Promise<void> {
    const command = input[1];

    if (cmdList.includes(command)) {
        console.log(`${command} is a shell builtin`)
        return
    };

    const cmdExists = await checkPath(command);

    if (!cmdExists) {
        console.log(`${command}: not found`)
        return;
    }

    console.log(`${command} is ${cmdExists}`)
}

async function checkPath(input: string) {
    const pathEnvContent = process.env.PATH;
    const pathDirs = pathEnvContent?.split(":") || [];

    for (const dir of pathDirs) {
        try {
            const files = await fs.promises.readdir(dir);
            if (files.includes(input)) {
                return `${dir}/${input}`;
            }
        } catch (_err) {
            // Directory doesn't exist or can't be read, continue
        }
    }

    return undefined;
}
