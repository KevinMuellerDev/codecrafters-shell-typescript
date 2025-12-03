import { cmdList } from "./commandlist";
import { checkPath } from "./utilities";

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
        return
    } else {
        console.log(`${command} is ${cmdExists}`)
        return
    }

}

