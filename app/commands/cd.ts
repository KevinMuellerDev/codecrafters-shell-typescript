import { existsSync } from "node:fs";
import { config } from "../config/config";

export default function cd(input: string[]) {
    const path = input[1];

    if (!existsSync(path)) {
        console.log(`cd: ${path}: No such file or directory`);
        return
    }
    process.chdir(path);
}