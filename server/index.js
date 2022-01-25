const express = require("express")
const passport = require('passport')
const app = express()
const bodyparser = require("body-parser")
const localStrategy = require("passport-local")
const customStrategy = require('passport-custom')
const methodoverride = require("method-override")
const mongoose = require("mongoose")
const localmongo = "mongodb://localhost:27017/practice"
const cors = require("cors");
const User = require('./models/user');
const port = 3001 || process.env.PORT
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
}

mongoose.connect(localmongo, {useUnifiedTopology:true ,useNewUrlParser: true})
var db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.use(cors(corsOptions))
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
}))

app.use(require("express-session")({
    secret: "wherever",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new customStrategy(
    function(req, done) {
        User.findOne({
            username: req.body.username
        }, function(err, user) {
            if (err || user==null) {
                return done(err, false)
            }
            user.authenticate(req.body.password, (error)=> {
                if (error==null) {
                    done(err, user)
                } else {
                    done(error, false)
                }
            })
        })
    }
))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
app.use(methodoverride("_method"))
app.use(express.static("public"))



var server = app.listen(port, function () {
    console.log("server started " + port)
})


app.get("/home", function (req, res) {
    console.log("entered "+"/home")
    // console.log(req._passport)
    let extra = ""
    if (req.user) {
        extra=req.user.username;
    }
    console.log(req.user)
    res.json({
        result: "connected to server "+extra
    });
})

app.post("/sign-in", passport.authenticate('custom'), (req, res)=> {
    console.log("entered "+"/sign-in")
    res.json({
        result: "success",
        nav: "/secret",
        src: "signin"
    })
    console.log("exited "+"/sign-in")
})

app.post("/sign-up", function(req, res) {
    console.log("entered "+"/sign-up")
    // console.log(req._passport.instance)
    User.register(new User({username: req.body.username,}), req.body.password, function (err, newUser) { 
        if (err) {
            console.log(err)
            res.json({
                result: "error",
                nav: "/sign-up",
                error: err,
                src: "signup"
            })
        }
        else {
            passport.authenticate("custom")(req, res, ()=> {
                res.json({
                    result: "success",
                    nav: "/secret",
                    src:"signup"
                })
            })
    }
    console.log("exited "+"/sign-up")
});
})

app.get('/sign-out', function(req, res) {
    console.log("entered "+"/sign-out")
    req.logOut();
    res.json({
        nav: "/",
        result: "success"
    })
    console.log("exited "+"/sign-out")
})

app.get("/authenticate", function(req, res) {
    console.log("entered "+"/authenticate")
    if (req.isAuthenticated()) {
        console.log('logged in')
        res.json({
            result: "success",
            user: req.user,
            src: "auth"
        })
    } else {
        console.log('not logged')
        res.json({
            result:"error",
            src: "auth"
        })
    }
    console.log("exited "+"/authenticate")
})

app.get("*", function (req, res) {
    console.log("entered "+"/*")
    res.json({})
})