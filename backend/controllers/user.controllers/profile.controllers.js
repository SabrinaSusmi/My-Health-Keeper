const User=require('../../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {CLIENT_URL} = process.env
const sendMail = require('../sendMail.Controllers')
const {google} = require('googleapis')
const {OAuth2} = google.auth
const fetch = require('node-fetch')
const moment = require('moment')

const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID)

const profileControllers={
    getUserInfor: async (req, res) => {
        try {
            const user = await User.findById(req.user.id).select('-password')

            res.json(user)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateUser: async (req, res) => {
        try {
            const {name, phone,gender} = req.body
            await User.findOneAndUpdate({_id: req.user.id}, {
                name,phone,gender
            })

            res.json({msg: "Update Success! Please refresh the page now"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
   
    // setProfilePicture : async (req, res, next) => {
    //     try{
    //         const file = new SingleFile({
    //             fileName: req.file.originalname,
    //             filePath: req.file.path,
    //             fileType: req.file.mimetype,
    //             fileSize: fileSizeFormatter(req.file.size, 2) // 0.00
    //         });
    //         await file.save();
    //       return  res.status(201).send('File Uploaded Successfully');
    //     }catch(error) {
    //       return  res.status(400).send(error.message);
    //     }
    // },
    // getallSingleFiles : async (req, res, next) => {
    //     try{
    //         const files = await SingleFile.find();
    //         res.status(200).send(files);
    //     }catch(error) {
    //         res.status(400).send(error.message);
    //     }
    // },
}

module.exports=profileControllers