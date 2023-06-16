const express = require("express");
const User = require("../models/User");
const passport = require("passport");
const multer = require("multer");
const cloudinary = require("cloudinary");
const router = express.Router();

/* Multer setup */
const storage = multer.diskStorage({
    filename: (req, file, callback) => {
        callback(null, Data.now() + file.originalname);
    }
});

const imageFilter = (req, file, callbakc) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/i)){
        return callbakc(new Error("Only image files are allowed!"), false);
    }
    callback(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFilter });