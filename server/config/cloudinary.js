import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const profilePictire = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'profile_pictures',
        allowed_formats: ['jpg', 'png', 'jpeg'],
    },
});
const uploadImage = multer({ storage: profilePictire });


const uploadVideo = multer({
    storage: multer.diskStorage({}),
});

export { cloudinary, uploadImage, uploadVideo };
