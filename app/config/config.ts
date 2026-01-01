import { cmdList } from "../commands/commandlist";

interface IConfigShell {
    cwd: string;
    cmdList: string[]
}
export const config: IConfigShell = {
    cwd: "",
    cmdList
}