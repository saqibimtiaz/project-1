if (process.env.NODE_ENV != "production") {
    require('dotenv').config();
}
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 8080;
const path = require("path");
const Listing = require("./models/listings.js");
const { url } = require("inspector");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStratagy = require("passport-local");
const User = require("./models/user.js");

const routerListing = require("./routes/listing.js");
const routerReview = require("./routes/review.js");
const routerUser = require("./routes/user.js");
const { cpSync } = require('fs');
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));


    const mongoUrl = process.env.ATLAS_URL;
main()
    .then((res) => {
        console.log("Connection Success");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(mongoUrl);
}

const store = MongoStore.create({
    mongoUrl :mongoUrl,
    crypto:{
        secret: process.env.SECRET,
    },
    touchAfter : 24* 3600,
})
store.on("error" , ()=>[
    console.log("Error in Store of Mongo " ,err)
]);

sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    }
}

// app.get("/", (req, res) => {
//     res.send("This IS MY Home Route");
// });

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStratagy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

// app.get("/demo" ,async (req,res)=>{
//   let fakeUser = new User({
//     email: "abc@gmail.com",
//     username : "saqib",
//   })
// let newUser = await User.register(fakeUser,"password");
// res.send(newUser);
// });



app.use("/listings", routerListing);
app.use("/listings/:id/reviews", routerReview);
app.use("/", routerUser);


app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});

app.use((err, req, res, next) => {
    // console.log(err);
    let { statusCode = 500, message = "Somthing went wrong" } = err;
    // console.log(err.message);
    res.render("error.ejs", { message });
    // res.status(statusCode).send(message);
});

app.listen(8080, () => {
    console.log("Listining on port # ", port);
});