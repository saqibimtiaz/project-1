const Listing = require("../models/listings.js");
const Review = require("../models/review.js");
module.exports.postReview=async(req, res) => {
        let listing = await Listing.findById(req.params.id);
        let newReview = new Review(req.body.review);
        console.log(newReview.comment);
        newReview.auther = req.user._id;
        // console.log(req.user);
        listing.reviews.push(newReview);
        await newReview.save();
        await listing.save();
        req.flash("success", "review added");
        res.redirect(`/listings/${listing._id}`);
    };
    module.exports.deleteReview=async(req, res) => {
        //   console.log(req.params);
        let { id, reviewid } = req.params;
        await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewid } });
        let del = await Review.findByIdAndDelete(reviewid);
        console.log(del);
        req.flash("success", "review deleted");
        res.redirect(`/listings/${id}`);
    }