// const cloudinary = require('cloudinary').v2;
// const { CloudinaryStorage } = require('multer-storage-cloudinary');
// cloudinary.config({
//     cloud_name: process.env.CLOUDE_NAME,
//     api_key: process.env.CLODE_API,
//     api_secret: process.env.CLODE_SECRET,
// });



// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//         folder: 'wanderlust_DEV',
//         allowedFormats: ["png", "jpg", "jpeg"],

//     },
// });
// module.exports = {
//     cloudinary,
//     storage
// }


const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLODE_API,
    api_secret: process.env.CLODE_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'wanderlust_DEV',
        allowed_formats: ["png", "jpg", "jpeg"],
    },
});

module.exports = {
    cloudinary,
    storage
};