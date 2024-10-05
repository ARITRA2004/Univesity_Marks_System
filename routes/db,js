import mongoose from "mongoose";

const connectDB = async (dbname) => {
  try {
    await mongoose.connect(`mongodb://127.0.0.1:27017/${dbname}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
