import { createClient } from "redis";

const client = createClient();

async function main() {
  try {
    await client.connect();
    console.log("Connected to Redis");

    while (true) {
      const response = await client.rPop("Submissions");

      if (response) {
        console.log("Processed submission:", response);
      } else {
        console.log("No submissions to process.");
      }

      // Wait for 1 second before the next iteration
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await client.disconnect();
  }
}

main();
