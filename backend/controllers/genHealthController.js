const genHealthSchema = require('../models/genHealth.model');

const postHealthInfo = async (req,res) => {
    let user = req.user.id;

    const { infoTitle, info } = req.body;
    //console.log(new Date().toISOString().slice(0, 10))

    genHealthSchema.findOne({ infoTitle : infoTitle, inputDate : new Date().toISOString().slice(0, 10) }).then((health) => {
        if(health) {
            genHealthSchema.findOneAndUpdate({infoTitle : infoTitle, inputDate : new Date().toISOString().slice(0, 10) }, {info})
            .then(data => res.json(data)).catch(err => res.json(err))
        } else {
            const healthInfo = new genHealthSchema ({
                user,
                infoTitle : infoTitle,
                info : info,
                inputDate : new Date().toISOString().slice(0, 10)
            });
            healthInfo.save().then((data)=> res.json(data) ).catch((err)=> res.json(err));
        }
    }).catch(err => res.json(err))



}

const getSugarData = async (req,res)=>{
    let user = req.user.id;
    let health_data = [];
    let chart_data = [];
    let chart_date = [];
    const fromDate=new Date()
    fromDate.setDate(fromDate.getDate()-7)

    genHealthSchema.find(
        {
          user: user,
          infoTitle: "Sugar",
          inputDate: {$gte:fromDate},
        }, (err, data) =>{
            if(err) {
                console.log(user);
                console.log("Chart Data :" + err);
            }
            if(data) {
                health_data = data;
                console.log(health_data);
                health_data.forEach(cdata=>{
                    chart_data.push(cdata.info)
                    chart_date.push(cdata.inputDate.toISOString().slice(0, 10))
                });

                console.log(chart_date)
                console.log(chart_data)

                res.send({infoData : chart_data, dates : chart_date});
            }
            
        })
}

const getWeightData = async (req,res)=>{
    let user = req.user.id;
    let health_data = [];
    let chart_data = [];
    let chart_date = [];
    const fromDate=new Date()
    fromDate.setDate(fromDate.getDate()-7)

    genHealthSchema.find(
        {
          user: user,
          infoTitle: "Weight",
          inputDate: {$gte:fromDate},
        }, (err, data) =>{
            if(err) {
                console.log(user);
                console.log("Chart Data :" + err);
            }
            if(data) {
                health_data = data;
                console.log(health_data);
                health_data.forEach(cdata=>{
                    chart_data.push(cdata.info)
                    chart_date.push(cdata.inputDate.toISOString().slice(0, 10))
                });

                console.log(chart_date)
                console.log(chart_data)

                res.send({infoData : chart_data, dates : chart_date});
            }
            
        })
}

const getBpData = async (req,res)=>{
    let user = req.user.id;
    let health_data = [];
    let chart_data = [];
    let chart_date = [];
    const fromDate=new Date()
    fromDate.setDate(fromDate.getDate()-7)

    genHealthSchema.find(
        {
          user: user,
          infoTitle: "Bp",
          inputDate: {$gte:fromDate},
        }, (err, data) =>{
            if(err) {
                console.log(user);
                console.log("Chart Data :" + err);
            }
            if(data) {
                health_data = data;
                console.log(health_data);
                health_data.forEach(cdata=>{
                    chart_data.push(cdata.info)
                    chart_date.push(cdata.inputDate.toISOString().slice(0, 10))
                });

                console.log(chart_date)
                console.log(chart_data)

                res.send({infoData : chart_data, dates : chart_date});
            }
            
        })
}

const getPulseData = async (req,res)=>{
    let user = req.user.id;
    let health_data = [];
    let chart_data = [];
    let chart_date = [];
    const fromDate=new Date()
    fromDate.setDate(fromDate.getDate()-7)

    genHealthSchema.find(
        {
          user: user,
          infoTitle: "Pulse",
          inputDate: {$gte:fromDate},
        }, (err, data) =>{
            if(err) {
                console.log(user);
                console.log("Chart Data :" + err);
            }
            if(data) {
                health_data = data;
                console.log(health_data);
                health_data.forEach(cdata=>{
                    chart_data.push(cdata.info)
                    chart_date.push(cdata.inputDate.toISOString().slice(0, 10))
                });

                console.log(chart_date)
                console.log(chart_data)

                res.send({infoData : chart_data, dates : chart_date});
            }
            
        })
}


module.exports = { postHealthInfo, getSugarData, getWeightData, getBpData, getPulseData };