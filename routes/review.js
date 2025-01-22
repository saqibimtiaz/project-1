const express = require("express");
const router = express.Router({ mergeParams: true });
// const Listing = require("../models/listings.js");
const wrapasync = require("../utils/wrapasync.js");
// const Review = require("../models/review.js");
const { validateReview, toLogIn, isAuther } = require("../middlewares.js");
const { postReview, deleteReview } = require("../controller/reviews.js");


// POST review route
router.post(
    "/",
    toLogIn,
    validateReview,
    wrapasync(postReview)
);

//DELETE review route

router.delete(
    "/:reviewid",
    toLogIn,
    isAuther,
    wrapasync(deleteReview)
);

module.exports = router;