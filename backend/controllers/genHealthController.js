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

const getWeightGraph = async (req,res)=>{
    let user = req.user.id;
    
        genHealthSchema.find(
          {
            user: user,
            infoTitle: "Weight",
            inputDate: new Date().getMonth(),
          },
          (err, info) => {
            if (info) {
              console.log(user);
              console.log("Test :" + err);
            }
            if (info) {
              res.send(info);
              console.log(info);
              
            }
          }
        );
}

module.exports = { postHealthInfo,getWeightGraph };