import mongoose from "mongoose";
import connectDB from "./db.routes.js";

let allStudentMarks;
connectDB(allStudentMarks);

const allMarks = mongoose.Schema({
    EnrollmentNo:Number,
    MATH:Number,
    SDP:Number,
    ESP:Number,
    DSA:Number
})

const marks = mongoose.model("allstudentmarks",allMarks);
export default marks;