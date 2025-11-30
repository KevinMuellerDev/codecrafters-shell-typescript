import { error } from "console";
import { createInterface } from "readline";

const terminateSignals: string[] = ["SIGINT", "SIGTERM"]

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

let isRunning = true;

async function getInput() {
  return new Promise((resolve) => {
    rl.question("$ ", (answer) => {
      resolve(answer)
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
    switch (input) {
      case "exit":
        console.log("exiting shell...");
        process.exit(0);
        break;

      default:
        console.log(`${input}: command not found`)
        break;
    }
  }
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
})



