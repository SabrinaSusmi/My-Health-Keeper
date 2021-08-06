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
    const weightdata = [];
      await genHealthSchema.findOne({ user })
        .then((response) => {
         
            const strDate = inputDate.getMonth();
            const month = new Date().getMonth();
  
            if (strDate ==  month) {
              weightdata.push(response.info);
            } else {
              console.log("no data found");
            }
          
          if ( weightdata.length == 0) {
            res.send();
          } else {
            res.send( weightdata);
          }
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({ msg: err.message });
        });
}

module.exports = { postHealthInfo,getWeightGraph };