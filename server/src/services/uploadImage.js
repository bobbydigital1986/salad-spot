import AWS from "aws-sdk"
import multer from "multer"
import multerS3 from "multer-s3"

import config from "../config.js"

AWS.config.update({
    accessKeyId: config.awsAccess.key,
    secretAccessKey: config.awsSecret.key,
    region: "us-east-1"
})

const s3 = new AWS.S3()

const uploadImage = multer({
    storage: multerS3({
        s3: s3,
        bucket: config.s3Bucket.name,
        acl: "public-read",
<<<<<<< HEAD
        key: function (req, file, cb) { 
            cb(null, file.originalname)
=======
        key: function (req, file, cb) {
            cb(null, Date.now().toString())
>>>>>>> bf1c9d430572535c3b16665544aef2d082d6cb80
        }
    })
})

export default uploadImage