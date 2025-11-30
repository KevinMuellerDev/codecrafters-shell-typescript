import { cmdList } from "./commandlist";

export default function typeCheck(input: string[]): void {
    const command = input[1];

    if (!cmdList.includes(command)) {
        console.log(`${command}: not found`);
        return
    };

    console.log(`${command} is a shell builtin`)
}