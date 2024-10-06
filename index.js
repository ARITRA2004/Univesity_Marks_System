import express from "express";
import { dirname, parse } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import path from "path";
import Student from "./routes/studentDetails.js";
import Teacher from "./routes/TeacherDetails.js";
import bcrypt from 'bcrypt';
import marks from "./routes/StudentMarks.js";


const app = express();
const port = 3000;

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    res.render("LoginOption");
});

app.post("/optionTeacheroStudent", (req, res) => {

    const { student, teacher } = req.body;

    if (student) {
        res.render("StudentLogin");
    }
    else if (teacher) {
        res.render("TeacherLogin");
    }
    else {
        res.render("LoginOption");
    }
})


app.post("/StudentSubmit", async (req, res) => {
    try {
        let salt = await bcrypt.genSalt(10);
        let password = req.body["password"];
        let encrypt = await bcrypt.hash(password, salt);
        let finalPassword = encrypt;
        let enrollmentNo = req.body["EnorollmentNumber"];

        let student = await Student.findOne({ EnorollmentNumber: enrollmentNo });
        if (student) {

            let result = await bcrypt.compare(password, student.password);
            if (result) {
                res.redirect("/viewresult/student");
                console.log("Password matched");
            } else {
                res.render("StudentLogin");
            }
        }
        else {
            const StudentDetails = await Student.create({
                EnorollmentNumber: req.body["EnorollmentNumber"],
                password: finalPassword
            })

            console.log(StudentDetails.password);

            res.render("StudentLogin");
            console.log(StudentDetails);
        }
    }
    catch (error) {
        console.log(error);
        res.send("Something wents wrong");
    }

})

app.get("/viewresult/student", (req, res) => {

    res.render("ViewResult");
})

app.post("/TeacherSubmit", async (req, res) => {
    let teacherID = req.body["TeacherID"];
    let password = req.body["password"];

    let encrypt = await bcrypt.hash(password, await bcrypt.genSalt(10));
    let finalPassword = encrypt;

    let teacher = await Teacher.findOne({ TeacherID: teacherID });
    try {
        if (teacher) {

            let result = await bcrypt.compare(password, teacher.password);
            if (result) {
                res.redirect("/uploadmarks/teacher");
                console.log("Password matched");
            } else {
                res.render("TeacherLogin");
            }
        }
        else {
            const TeacherDetails = await Teacher.create({
                TeacherID: req.body["TeacherID"],
                password: finalPassword
            })

            console.log(TeacherDetails.password);
            res.redirect("TeacherLogin");
            // res.send(TeacherDetails);
            console.log(TeacherDetails);
        }
    }
    catch (error) {
        console.log(error);
        res.send("Something went wrong");
    }

})

app.get("/uploadmarks/teacher", (req, res) => {
    res.render("putStudentMarks");
})
app.post("/submit/marks", async (req, res) => {

    try {
        const allMarks = await marks.create({
            EnrollmentNo: req.body["enrollment"],
            MATH: req.body["math"],
            SDP: req.body["SDP"],
            ESP: req.body["ESP"],
            POM: req.body["POM"],
            DSA: req.body["DSA"]
        })
        res.redirect("/uploadmarks/teacher?success=true");
        console.log(allMarks);
    }
    catch (error) {
        console.log(error);
    }

})

app.post("/signin", (req, res) => {
    res.send("sign in");
})

app.listen(port, () => {
    console.log(`Port is running at ${port}`);
});
