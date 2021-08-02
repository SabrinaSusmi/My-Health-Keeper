const genHealthSchema = require('../models/genHealth.model');

const postHealthInfo = async (req,res) => {
    let user = req.user.id;

    const { infoTitleWeight, infoWeight } = req.body;

    const healthInfo = new genHealthSchema ({
        user,
        infoTitle : infoTitleWeight,
        info : infoWeight
    });
    healthInfo.save().then((data)=> res.json(data) ).catch((err)=> res.json(err));


}

module.exports = { postHealthInfo };