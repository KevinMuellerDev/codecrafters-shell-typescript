import { createInterface } from "readline";
import { cmdManagement } from "./cmdmanagement";
import { config } from "./config/config";

const terminateSignals: string[] = ["SIGINT", "SIGTERM"]

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

let isRunning = true;

async function getInput(): Promise<string[]> {
  return new Promise((resolve) => {
    rl.question("$ ", (answer) => {
      const args: string[] = [];
      let current = "";
      let inSingleQuotes = false;

      for (let i = 0; i < answer.length; i++) {
        const char = answer[i];

        if (char === "'") {
          inSingleQuotes = !inSingleQuotes;
          continue;
        }

        if (!inSingleQuotes && /\s/.test(char)) {
          if (current.length > 0) {
            args.push(current);
            current = "";
          }
        } else {
          current += char;
        }
      }

      if (current.length > 0) {
        args.push(current);
      }
      resolve(args);
    });
  });
}

async function main() {

  terminateSignals.forEach((signal) => {
    process.on(signal, () => {
      console.log("Shell terminated.")
      process.exit(0);
    })
  })

  while (isRunning) {
    const input = await getInput();
    await cmdManagement.delegateAction(input)
  }
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
})



