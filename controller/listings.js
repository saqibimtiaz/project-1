const Listing = require("../models/listings.js");
module.exports.index =async(req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm =   (req, res) => {
    res.render("listings/new.ejs");
};
module.exports.showListing= async(req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: {
                path: "auther",
            },
        })
        .populate("owner");
    if (!listing) {
        req.flash("error", "Listing not exist");
        res.redirect("/listings");
    }
   
    res.render("listings/show.ejs", { listing });
};
module.exports.newListing= async(req, res) => {
        let url = req.file.path;
        let filename = req.file.filename;
        const newListing = new Listing(req.body.listing);
        newListing.owner = req.user._id;
        console.log(newListing.owner);
        newListing.image = { url, filename }
            // console.log(url, "--", filename);
        await newListing.save();
        console.log(newListing);
        req.flash("success", "Listing Created");
        res.redirect("/listings");
    };
    module.exports.editListing =async(req, res) => {
            let { id } = req.params;
            const listing = await Listing.findById(id);
            if (!listing) {
                req.flash("error", "Listing not exist");
                res.redirect("/listings");
            }
            let orignalImg = listing.image.url;
            orignalImg = orignalImg.replace("/upload" , "/upload/h_300,w_250")
            res.render("listings/edit.ejs", { listing, orignalImg });
        };
        module.exports.updateListing=async(req, res) => {
            let { id } = req.params;
            console.log(id);
           let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing });
           console.log(req.file);
           if(typeof req.file !== "undefined"){
            let url = req.file.path;
            let filename = req.file.filename;
            listing.image = { url, filename };
            // console.log(url, "--", filename);
            await listing.save();
           }
            console.log(req.body);
            req.flash("success", "Listing edited");
            res.redirect(`/listings/${id}`);
        };
        module.exports.deleteListing=async(req, res) => {
            let { id } = req.params;
            let del = await Listing.findByIdAndDelete(id);
            console.log(del);
            req.flash("success", "Listing deleted");
            // if (!listing) {
            //   req.flash("error", "Listing not exist");
            //   res.redirect("/listings");
            // }
            res.redirect(`/listings`);
        }