const Listing = require("./models/listings.js");
const ExpressError = require("./utils/ExpressError.js");
const { ListiningSchema } = require("./schema.js");
const { reviewSchema } = require("./schema.js");
const Review = require("./models/review.js");

module.exports.toLogIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "Must login first");
        return res.redirect("/login");
    }
    next();
};
module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};
module.exports.isOwner = async(req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    // console.log(listing?.owner);
    if (!listing.owner._id.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not permitted (only Owner can make change)");
        return res.redirect(`/listings/${id}`);
    }
    next();
};
module.exports.validateListing = (req, res, next) => {
    let { error } = ListiningSchema.validate(req.body);
    if (error) {
        // console.log(error);
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};
module.exports.validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};
module.exports.isAuther = async(req, res, next) => {
    let { id, reviewid } = req.params;
    let review = await Review.findById(reviewid);
    console.log(review.auther);
    if (!review.auther.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not permitted (only auther can make change)");
        return res.redirect(`/listings/${id}`);
    }
    next();
};