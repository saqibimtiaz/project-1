const User = require("../models/user.js")
const { register } = require("../models/user");
module.exports.signupForm= (req, res) => {
    res.render("users/signup.ejs");
  }
module.exports.signup=async (req, res) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({
        username,
        email,
      });
      let registerdUser = await User.register(newUser, password);
      console.log(registerdUser);
      req.login(newUser, (err)=>{
        if(err){
          next();
        }
        req.flash("success", "Welcome To Wonderlust");
        res.redirect("/listings");
      })
    } catch (e) {
      console.log(e);
      req.flash("error", e.message);
      res.redirect("/signup");
    }
  }
  module.exports.loginForm=(req, res) => {
    res.render("users/login.ejs");
  }
  module.exports.login= (req, res) => {
    req.flash("success", "Welcome back to wonderust");
    let redirectUrl = res.locals.redirectUrl||"/listings"
    res.redirect(redirectUrl);
  }
  module.exports.logout= (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      } else {
        req.flash("sucesss", "Youare loged out");
        res.redirect("/listings");
      }
    });
  }