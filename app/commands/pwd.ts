import { config } from "../config/config";

export default function pwd(): void {
    console.log(process.cwd());
}