import mongoose from "mongoose";
import env from "../configs/environment.config.js";

export const connectDB = async () => {
  try {
    const { MONGO_URI } = env;
    if (!MONGO_URI) throw new Error("Chưa khai báo biến môi trường MONGO_URI");
    const res = await mongoose.connect(MONGO_URI);
    console.log("Mongodb connected: ", res.connection.host);
  } catch (error) {
    console.error("Error connection to Mongodb", error);
    process.exit(1); // 1 là fail, 0 là success
  }
};
