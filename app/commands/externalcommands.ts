import { checkPath } from "./utilities";
import { exec } from "child_process";
import { promisify } from "util";

export async function checkExternal(input: string[]) {
    const command = input[0];
    const cmdArgs = input.slice(1).join(" ");
    const cmdExists = await checkPath(command);
    const execAsync = promisify(exec)

    if (cmdExists) {
        const { stdout } = await execAsync(`${command} ${cmdArgs}`)
        if (stdout.trim().length > 0)
            process.stdout.write(stdout)
    } else {
        console.log(`${command}: command not found`)
    }
}