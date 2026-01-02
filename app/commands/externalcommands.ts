import { checkPath } from "./utilities";
import { exec } from "child_process";
import { promisify } from "util";

export default async function checkExternal(input: string[]) {
    const command = input[0];
    let cmdArgs: string = "";

    if (command === 'cat') {
        for (let index = 1; index < input.length; index++) {
            cmdArgs += ` '${input[index]}'`;
        }
    } else {
        cmdArgs = input.slice(1).join(" ");
    }

    const cmdExists = await checkPath(command);
    const execAsync = promisify(exec)

    if (cmdExists) {
        try {
            const { stdout } = await execAsync(`${command} ${cmdArgs}`)
            if (stdout.trim().length > 0)
                process.stdout.write(stdout)
        } catch (error) {
            console.log(error)
            return
        }

    } else {
        console.log(`${command}: command not found`)
    }
}