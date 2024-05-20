import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function Database() {
  try {
    mongoose.connect(process.env.MONGODBURL);
    console.log("MongoDB connected ");
  } catch (error) {
    console.log(`Error connection to MongoDB - ${error}`);
  }
}

export default Database;
