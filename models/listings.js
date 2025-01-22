const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const Listing = require("Listing");
const Review = require("./review.js")

const ListiningSchema = new Schema({
    title: {
        type: String,
        reurired: true,
    },
    description: {
        type: String,
        requried: true,
    },
    image: {
        filename: {
            type: String,
            // default: "Listing Image",
            // set: (v) =>
            //     v === "" ?
            //     "Listing Image" :
            //     v,
        },
        url: {
            type: String,
            // default: "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
            // set: (v) =>
            //     v === "" ?
            //     "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60" : v,
        }
    },
    price: {
        type: Number,
    },
    location: String,
    country: String,
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: "Review"
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }
});

ListiningSchema.post("findOneAndDelete", async(listing) => {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }

})


const Listing = mongoose.model("Listing", ListiningSchema);
module.exports = Listing;


// image: {
//     filename : String,
//     url : String,
//  default:
//   "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
// set: (v) =>
//   v === ""
//     ? "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
//     : v,

//   },