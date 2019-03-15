const http = require('http');
const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(bodyParser.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

var student = [
    {
        name : "Anusri",
        regno: "15mis1116",
        password:"Anu123"
    },
    {
        name : "Srija",
        regno: "14bbb1098",
        password: "Anu123"
    },
    {
        name: "anu",
        regno: "15mis1016",
        password: "Anu123"
    },
    {
        name: "Anuradha",
        regno: "15mis0116",
        password: "Anuradha123"
    },
    {
        name: "Srinivasulu",
        regno: "15mis1126",
        password: "Sri123"
    }
];

var dt = new Date("January 30, 2019 13:30:00");
function startsFrom(n = 0)
{
    return dt.setDate(dt.getDate() + n);
}
function endsOnv(n = 0,d=0) {
    return dt.setDate(dt.getDate() + n+d);
}

courses = [
    {
        1: "Artificial Intelligence",
        startsOn: startsFrom(10),
        endsOn: endsOnv(10, 30)
},
    {
        2: "Machine learning",
        startsOn: startsFrom(20),
        endsOn: endsOnv(20, 60)
},
    {
        3: "phisiotherapy",
        startsOn: startsFrom(40),
        endsOn: endsOnv(40, 90)
    },
    {
        4: "Neural network",
        startsOn: startsFrom(15),
        endsOn: endsOnv(15, 30)
    }
];
var log_in = false;

app.get("/home", function (req, res) {
    if (log_in === false) {
        res.render("home_login");
    }
});

//opening sign up form
app.get("/signup_button", function (req, res) {
    res.render("signup");
});


//to add new student
app.post("/signup", function (req, res) {
    console.log(req.body.regno);
    console.log(req.body.studname);
    console.log(req.body.password);

    //getting the result of the entries if "Successful" all the entries were correct else appropriate result to be shown back to  the user 
    var result = signup_ch((req.body.regno).toString().trim(), (req.body.studname).toString.trim(), (req.body.password).toString().trim());
    if (result === "Successful")
    {
        console.log("Regsitration form elements are OK");
        if (userExixts(student, req.body.regno) == "user exits") {
            res.render("home_login", { message: "Account already exits, go to login page" });
        }
        else {
            student.push({ name: req.body.studname, regno: req.body.regno, password: req.body.password });
            console.log("Data has been added to registration details");
            console.log("The updated reg array is");
            console.log(student);
        }
    }
    else {
        res.render("home_login", { message: result });
    }
});


//Login page
app.post("/login", function (req, res) {
    var regno = (req.body.regno);
    var password = (req.body.password);
    var r = check_login(student, regno, password);
    //console.log(r);
    if (r == "Success") {
        log_in = true;
        current_regno = regno;
        if (log_in) {
            res.render("homepage", { name: current_user_name, rno: current_regno });
        }
        else {
            ren.render("home_login");
        }

    }
    else {
        res.render("signup", { message: "Email ID or password is incorrect" });
    }
});

app.get('/', function (req, res) {
    res.render('home', {
        title: 'Student',
        student: student
    });
});

server = http.createServer(app);
server.listen(port, hostname, () => {
    console.log('Server running at http://${hostname}:${port}');
});






//all the functions written for checking


//If any error is found in the entries then proper error is returned else a "Successful" string is returned
function signup_ch(regno, name, password) {
    console.log("In checking proc");
    var msg = "";
//    console.log(name + "\n");
  //  console.log(regno + "\n");
   // console.log(password + "\n");
    // Checking if all values have been filled
    if (name === null || regno === null || password === null) {
        msg = " Empyty Field. Please ener again";
        return msg;
    }

    // Check for name having any digits or special characters
    var re = /^[A-Za-z]+$/;
    if (re.test(name) === false) {
        msg = "Name should be only letters and no special characters or number";
        return msg;
    }
    
    console.log("successful. will return now");
    return "Successful";
}




//checking if the user is  already presentif not then update_ data function is execute
function userExixts(student1, regno1) {
    student1.forEach(function (stud) {
        console.log(stud);
        if (stud != null) {
            if (stud.regno.toString().trim() === regno1.toString().trim()) {
                return "user exists";
            }
        }
        
    })
    return "New account";
}

function check_login(student1, regno1, password1) {
    // else the proper message is rendered back to the user
    
    console.log("Checking if the student already exists");
    console.log("E N : " + reg_no + " " + "E p : " + " " + password + " " + "E_n lenght: " + reg_no.length + " " + "E_p length: " + password.length);
    //delete: E N : " + regno1 + " " + "E p : " + " " + password1 + " " + "E_n lenght: " + reg_no.length + " " + "E_p length: " + password1.length);
    student1.forEach(function (stud) {
        //delete:
        console.log("Reg : " + stud.Registration_Number + " " + "Pass : " + stud.Password + "");
        console.log(stud.Registration_Number.length + " " + stud.Password.length);
        if (stud.regno.toString().trim() === regno1.toString().trim() && stud.password.toString().trim() === password1.toString().trim()) {
            console.log("Student found");
            return "Success";
        }
    })
    return "Unsuccessful";
 }
