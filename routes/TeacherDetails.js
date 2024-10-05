import mongoose from "mongoose";
import connectDB from "./db,js";

// mongoose.connect("mongodb://127.0.0.1:27017/TeacherDetails");
let TeacherDetails;
connectDB(TeacherDetails);

const AllTeacherDetails = mongoose.Schema({
    TeacherID:Number,
    password:String
});

const Teacher = mongoose.model("TeacherDetails",AllTeacherDetails);
export default Teacher;