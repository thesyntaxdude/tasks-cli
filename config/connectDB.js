import config from "./config.js";
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoDB_URI);
  } catch (error) {
    console.error(`can't connect to db`, error);
    process.exit(1);
  }
};

export default connectDB;
