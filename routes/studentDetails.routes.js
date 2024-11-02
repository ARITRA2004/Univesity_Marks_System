import mongoose, { mongo } from "mongoose";
import connectDB from "./db.routes.js";
// mongoose.connect("mongodb://127.0.0.1:27017/StudentDetails");

let student;
connectDB(student);

const StudentDetails = mongoose.Schema({
    name:String,
    EnorollmentNumber:Number,
    password:String
})
const Student =  mongoose.model("student",StudentDetails);
export default Student;