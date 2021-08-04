const genHealthSchema = require('../models/genHealth.model');

const postHealthInfo = async (req,res) => {
    let user = req.user.id;

    const { infoTitle, info } = req.body;

    const healthInfo = new genHealthSchema ({
        user,
        infoTitle : infoTitle,
        info : info
    });
    healthInfo.save().then((data)=> res.json(data) ).catch((err)=> res.json(err));


}

module.exports = { postHealthInfo };