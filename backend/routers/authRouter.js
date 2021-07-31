const router = require("express").Router();

const userCtrl = require("../controllers/user.controllers/authControllers");
const passwordChangeControllers=require('../controllers/user.controllers/passwordChange.controllers')
const profileCtrl=require('../controllers/user.controllers/profile.controllers')
const auth=require("../middleware/auth")


router.post("/signup", userCtrl.register);
router.post("/activation", userCtrl.activateEmail);

router.post("/login",userCtrl.login)
router.post('/refresh_token', userCtrl.getAccessToken)
router.post('/forgot', passwordChangeControllers.forgotPassword)
router.post('/reset', auth, passwordChangeControllers.resetPassword)
router.get('/infor', auth, profileCtrl.getUserInfor)
router.get('/logout', userCtrl.logout)
router.patch('/update', auth, profileCtrl.updateUser)
router.post('/google_login', userCtrl.googleLogin)




module.exports = router;
