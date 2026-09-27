import path from "node:path";
import { loadEnvFile } from "node:process";

loadEnvFile(path.join(import.meta.dirname, "..", ".env"));

const config = {
  mongoDB_URI: process.env.MONGODB_URI,
};

if (!config.mongoDB_URI) {
  console.log(`add mongodb URI`);
  process.exit();
}

export default config;
