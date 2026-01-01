import checkExternal from "./commands/externalcommands";
import typeCheck from "./commands/type";
import echo from "./commands/echo";
import pwd from "./commands/pwd";
import cd from "./commands/cd";

interface ICmdManagement {
    delegateAction(input: string[]): Promise<void>;
}


/**
 * Manages command delegation and execution.
 * Routes user input to appropriate command handlers based on the first token.
 * 
 * @param input - Array of strings representing the parsed command and its arguments
 * @param input[0] - The command name to execute
 * 
 * @throws Exits the process with code 0 when 'exit' command is invoked
 * 
 * @example
 * cmdManagement.delegateAction(['echo', 'hello']); // Outputs: hello
 * cmdManagement.delegateAction(['exit']); // Terminates the process
 * cmdManagement.delegateAction(['unknown']); // Logs: unknown: command not found
 */
export const cmdManagement: ICmdManagement = {

    async delegateAction(input) {
        switch (input[0]) {
            case "exit":
                process.exit(0);
                break;
            case "echo":
                echo(input);
                break;
            case "type":
                await typeCheck(input);
                break;
            case "pwd":
                pwd();
                break;
            case "cd":
                cd(input);
                break;
            default:
                await checkExternal(input)
                break;
        }
    },
}