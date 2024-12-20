import { exec, ChildProcess } from "child_process";

let process: null | ChildProcess;

const start = () => {
  process = exec("npx pm2 start ./src/app/api/atlas/index.ts", (error, stdout, stderr) => {
    if (error) {
      console.error(`Error starting Atlas: ${error.message}`);
      return;
    }

    if (stderr) {
      console.error(`Error: ${stderr}`);
      return;
    }

    console.log(`Atlas output: ${stdout}`);
  });
};

const stop = async () => {
  await exec("pm2 delete all -f");
};

export async function POST() {
  try {
    if (process) {
      await stop();
    } else {
      start();
    }
  } catch (error) {}

  return Response.json({});
}
