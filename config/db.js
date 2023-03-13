import mongoose from "mongoose";
import { MongoClient } from "mongodb";
import dotenv from 'dotenv'
dotenv.config()

export const conn = async () => {
  await mongoose.connect(process.env.MONGO_URI1);
};

//mongodb connection with driver
export const client = new MongoClient(process.env.MONGO_URI2, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
