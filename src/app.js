//Importing
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const bcrypt = require('bcryptjs');
const SignUp = require('./Models/signup.js');
var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');


//app config
const app = express();

const port = process.env.PORT || 8000;


//middleware
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
const publicPath = path.join(__dirname, "../public")

const templatePath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");


app.set("view engine", "hbs");
app.use(express.static(publicPath));
hbs.registerPartials(partialPath);

app.set("views", templatePath);

//DB config

require("./DB/connec")

//????



//api routes

app.get("/", async(req, res) => {

    try {
        const ck = req.cookies.jwt;
        if (ck != undefined) {
            const userVer = await jwt.verify(ck, "Lorem ipsum dolor sit amet consectetur");
            const data = await SignUp.findOne({ _id: userVer._id });
            if (data != null) {
                const user = true;
                const userName = data.user;
                res.render("index", { user, userName });
            } else {
                res.clearCookie("jwt");
                const user = false;
                res.render("index", { user });
            }
        } else {
            const user = false;
            res.render("index", { user });
        }

    } catch (e) {
        console.log(e)
    }
})

app.get("/result", async(req, res) => {

    try {
        const ck = req.cookies.jwt;

        if (ck != undefined) {
            const userVer = await jwt.verify(ck, "Lorem ipsum dolor sit amet consectetur");
            const data = await SignUp.findOne({ _id: userVer._id });
            if (data.length != 0) {
                const user = true;
                const userName = data.user;
                res.render("result", { user, userName });
            } else {
                res.send("Wrong Cookies");
            }
        } else {
            const user = false;
            res.render("result", { user });
        }

    } catch (e) {
        console.log(e)
    }
})

app.get("/test", async(req, res) => {

    try {
        const ck = req.cookies.jwt;

        if (ck != undefined) {
            const userVer = await jwt.verify(ck, "Lorem ipsum dolor sit amet consectetur");
            const data = await SignUp.findOne({ _id: userVer._id });
            if (data.length != 0) {
                const user = true;
                const userName = data.user;
                res.render("test", { user, userName });
            } else {
                res.send("Wrong Cookies");
            }
        } else {
            const user = false; 
            res.render("index", { user });
        }

    } catch (e) {
        console.log(e)
    }
})


app.get("/logout", (req, res) => {
    res.clearCookie("jwt");
    const user = false;
    res.render("result", { user });
})

app.get("/login", (req, res) => {
    res.render("login");

})
app.get("/signup", (req, res) => {
    res.render("signUp");

})
app.post("/signup", async(req, res) => {
    try {
        let pswd = req.body.pswd;
        let cpswd = req.body.cpswd;
        if (pswd === cpswd) {
            const data = new SignUp({
                user: req.body.user,
                email: req.body.email,
                pswd: pswd
            });

            const token = await data.generateAuthToken();
            res.cookie("jwt", token);

            const signup = await data.save();
            const user = true;
            const userName = signup.user;
            res.render("index", { user, userName });
        } else {
            res.send("Password does not match");
        }

    } catch (e) {
        console.log(e);
        res.send("Please Use Different email address");
    }

})

// Login Check

app.post("/login", async(req, res) => {
    try {
        const email = req.body.email;
        const pswd = req.body.pswd;
        const data = await SignUp.findOne({ email: email });
        const isMatch = await bcrypt.compare(pswd, data.pswd);

        if (isMatch) {
            const token = await data.generateAuthToken();
            res.cookie("jwt", token);
            try {
                const userVer = await jwt.verify(token, "Lorem ipsum dolor sit amet consectetur");

            } catch (e) {
                console.log("verification error");
            }

            const user = true;
            const userName = data.user;
            res.render("index", { user, userName });
        } else {
            res.send("Login details not valid")
        }

    } catch (e) {
        console.log(e);
        res.send("Login details not valid")
    }

})

//listen

app.listen(port, () => console.log(`App is listening at the port ${port}`));