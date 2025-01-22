const express = require("express");
const router = express.Router();
const Listing = require("../models/listings.js");
const wrapasync = require("../utils/wrapasync.js");
// const ExpressError = require("../utils/ExpressError.js");
// const { ListiningSchema } = require("../schema.js");
const { toLogIn, validateListing } = require("../middlewares.js");
const { index, showListing, newListing, editListing, updateListing, deleteListing} = require("../controller/listings.js");
const multer = require("multer");
const { storage } = require("../cloudeconfig.js");
const upload = multer({ storage });


//index Router.............

router.get(
    "/",
    wrapasync(index));

//new route................

router.get(
    "/new",
    validateListing,
    toLogIn,
    //  isOwner ,
    (req, res) => {
        res.render("listings/new.ejs");
    }
);
//show....................
router.get(
    "/:id",
    wrapasync(showListing)
);

//creat route...............

router.post(
    "/",
    toLogIn,
    validateListing,
    upload.single("listing[image]"),
    wrapasync(newListing));

//Edit route..................

router.get(
    "/:id/edit",
    toLogIn,
    // isOwner,
    wrapasync(editListing)
);
// update route...............

router.put(
    "/:id",
    toLogIn,
    upload.single("listing[image]"),
    validateListing,
    // isOwner,
    wrapasync(updateListing)
);
// delete route...............

router.delete(
    "/:id",
    toLogIn,
    // isOwner,
    wrapasync(deleteListing)
);

module.exports = router;