import { existsSync } from "node:fs";
import { homedir } from "node:os";

export default function cd(input: string[]) {
    const path = input[1];

    if (!existsSync(path)) {
        console.log(`cd: ${path}: No such file or directory`);
        return
    } else if (path === "~") {
        process.chdir(homedir())
        return
    }
    process.chdir(path);
}