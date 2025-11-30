import { createInterface } from "readline";
import { cmdManagement } from "./cmdmanagement";

const terminateSignals: string[] = ["SIGINT", "SIGTERM"]

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

let isRunning = true;

async function getInput(): Promise<string[]> {
  return new Promise((resolve) => {
    rl.question("$ ", (answer) => {
      const trimmed = answer.trim();
      const words = trimmed.split(/\s+/);
      resolve(words)
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
    cmdManagement.delegateAction(input)
  }
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
})



