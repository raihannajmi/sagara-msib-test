import { connect } from "mongoose";
import { validateEnv } from "../configs/env.config";

const MONGO_DB_URI = validateEnv().MONGO_DB_URI;

export async function connectToMongoDB() {
  try {
    const connection = await connect(MONGO_DB_URI);

    console.log("New mongodb connection established");

    return connection;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
