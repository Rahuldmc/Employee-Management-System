import express  from "express";
import cors from 'cors';
import mysql from 'mysql2';
import cookieParser from "cookie-parser";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "Bublu@2003",
//     database: "EmployeeTest",
//     auth: {
//         type: 'mysql', 
//         user: 'root',
//         password: 'Bublu@2003',
//         database: 'EmployeeTest'
//     }
// })

const db = mysql.createConnection("mysql://root:3HCcbDFbf4E4Aa1CG6-bf4fhBeb4d2AD@viaduct.proxy.rlwy.net:49913/railway");

// EMPLOYEE DETAIL INSERTION
app.post('/',(req,res) => {
    const sql = "INSERT INTO DetailsTest (`Emp_Id`,`FirstName`,`LastName`,`Age`,`Email`,`Phone`,`Dept`,`salary`) VALUES(?,?,?,?,?,?,?,?)";
    const values = [
        req.body.empId,
        req.body.firstName,
        req.body.lastName,
        req.body.age,
        req.body.email,
        req.body.phone,
        req.body.dept,
        req.body.salary
    ]
    console.log(values);
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error while inserting values:", err); // Log the MySQL error message
            return res.json({ Error: "Error while inserting values" });
        }
        console.log("Insertion successful");
        return res.json({ Status: "Success" });
    });
})


// EMPLOYEE DATA RETRIEVAL

app.get('/database',(req,res) => {
    const sql = "SELECT * FROM DetailsTest";
    db.query(sql,(err,result) => {
        if(err){
            console.error("Error while fetching data",err);
            return res.json({ Error: "Error while fetching data"});
        } else {
            // console.log(res);
            return res.json(result);
        }
    })
})



app.listen(8082,() => {
    console.log("Running...");
})