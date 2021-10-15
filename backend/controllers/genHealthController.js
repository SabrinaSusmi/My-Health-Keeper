const genHealthSchema = require("../models/genHealth.model");

const postHealthInfo = async (req, res) => {
  let user = req.user.id;

  const { infoTitle, info } = req.body;
  //console.log(new Date().toISOString().slice(0, 10))

  if (infoTitle === "Bp") {
    let bp_split = info.split("/");
    genHealthSchema
      .findOne({
        user:user,
        infoTitle: infoTitle,
        inputDate: new Date().toISOString().slice(0, 10),
      })
      .then((health) => {
        if (health) {
          genHealthSchema
            .findOneAndUpdate(
              {
                user:user,
                infoTitle: infoTitle,
                inputDate: new Date().toISOString().slice(0, 10),
                bpType: "systolic",
              },
              { info: bp_split[0] }
            )
            .then((data) => res.json(data))
            .catch((err) => res.json(err));
          genHealthSchema
            .findOneAndUpdate(
              {
                user:user,
                infoTitle: infoTitle,
                inputDate: new Date().toISOString().slice(0, 10),
                bpType: "diastolic",
              },
              { info: bp_split[1] }
            )
            .then((data) => res.json(data))
            .catch((err) => res.json(err));
        } else {
          const sysInfo = new genHealthSchema({
            user,
            infoTitle: infoTitle,
            bpType: "systolic",
            info: bp_split[0],
            inputDate: new Date().toISOString().slice(0, 10),
          });
          sysInfo
            .save()
            .then((data) => res.json(data))
            .catch((err) => res.json(err));

          const diasInfo = new genHealthSchema({
            user,
            infoTitle: infoTitle,
            bpType: "diastolic",
            info: bp_split[1],
            inputDate: new Date().toISOString().slice(0, 10),
          });
          diasInfo
            .save()
            .then((data) => {
              console.log("ddqdwssdx");
              res.json(data);
            })
            .catch((err) => res.json(err));
        }
      })
      .catch((err) => res.json(err));
  } else {
    genHealthSchema
      .findOne({
        user:user,
        infoTitle: infoTitle,
        inputDate: new Date().toISOString().slice(0, 10),
      })
      .then((health) => {
        if (health) {
          genHealthSchema
            .findOneAndUpdate(
              {
                user:user,
                infoTitle: infoTitle,
                inputDate: new Date().toISOString().slice(0, 10),
              },
              { info }
            )
            .then((data) => res.json(data))
            .catch((err) => res.json(err));
        } else {
          const healthInfo = new genHealthSchema({
            user,
            infoTitle: infoTitle,
            info: info,
            inputDate: new Date().toISOString().slice(0, 10),
          });
          healthInfo
            .save()
            .then((data) => {
              console.log("asedqkwisjiw");
              res.json(data);
            })
            .catch((err) => res.json(err));
        }
      })
      .catch((err) => res.json(err));
  }
};

const getSugarData = async (req, res) => {
  let user = req.user.id;
  let health_data = [];
  let chart_data = [];
  let chart_date = [];
  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - 7);

  genHealthSchema.find(
    {
      user: user,
      infoTitle: "Sugar",
      inputDate: { $gte: fromDate },
    },
    (err, data) => {
      if (err) {
        console.log(user);
        console.log("Chart Data :" + err);
      }
      if (data) {
        health_data = data;
        //  console.log(health_data);
        health_data.forEach((cdata) => {
          chart_data.push(parseInt(cdata.info));
          chart_date.push(cdata.inputDate.toISOString().slice(0, 10));
        });

        // console.log(chart_date)
        // console.log(chart_data)

        res.send({ infoData: chart_data, dates: chart_date });
      }
    }
  );
};

const getWeightData = async (req, res) => {
  let user = req.user.id;
  let health_data = [];
  let chart_data = [];
  let chart_date = [];
  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - 7);

  genHealthSchema.find(
    {
      user: user,
      infoTitle: "Weight",
      inputDate: { $gte: fromDate },
    },
    (err, data) => {
      if (err) {
        console.log(user);
        console.log("Chart Data :" + err);
      }
      if (data) {
        health_data = data;
        //  console.log(health_data);
        health_data.forEach((cdata) => {
          chart_data.push(parseInt(cdata.info));
          chart_date.push(cdata.inputDate.toISOString().slice(0, 10));
        });

        // console.log(chart_date)
        // console.log(chart_data)

        res.send({ infoData: chart_data, dates: chart_date });
      }
    }
  );
};

const getBpSysData = async (req, res) => {
  let user = req.user.id;
  let health_data = [];
  let chart_data = [];
  let chart_date = [];
  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - 7);

  genHealthSchema.find(
    {
      user: user,
      infoTitle: "Bp",
      inputDate: { $gte: fromDate },
      bpType: "systolic",
    },
    (err, data) => {
      if (err) {
        console.log(user);
        console.log("Chart Data :" + err);
      }
      if (data) {
        health_data = data;

        health_data.forEach((cdata) => {
          chart_data.push(cdata.info);
          chart_date.push(cdata.inputDate.toISOString().slice(0, 10));
        });

        // console.log(chart_date)
        // console.log(chart_data)

        res.send({ infoData: chart_data, dates: chart_date });
      }
    }
  );
};
const getBpDiasData = async (req, res) => {
  let user = req.user.id;
  let health_data = [];
  let chart_data = [];
  let chart_date = [];
  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - 7);

  genHealthSchema.find(
    {
      user: user,
      infoTitle: "Bp",
      inputDate: { $gte: fromDate },
      bpType: "diastolic",
    },
    (err, data) => {
      if (err) {
        console.log(user);
        console.log("Chart Data :" + err);
      }
      if (data) {
        health_data = data;

        health_data.forEach((cdata) => {
          chart_data.push(cdata.info);
          chart_date.push(cdata.inputDate.toISOString().slice(0, 10));
        });

        // console.log(chart_date)
        // console.log(chart_data)

        res.send({ infoData: chart_data, dates: chart_date });
      }
    }
  );
};

const getPulseData = async (req, res) => {
  let user = req.user.id;
  let health_data = [];
  let chart_data = [];
  let chart_date = [];
  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - 7);

  genHealthSchema.find(
    {
      user: user,
      infoTitle: "Pulse",
      inputDate: { $gte: fromDate },
    },
    (err, data) => {
      if (err) {
        console.log(user);
        console.log("Chart Data :" + err);
      }
      if (data) {
        health_data = data;
        // console.log(health_data);
        health_data.forEach((cdata) => {
          chart_data.push(parseInt(cdata.info));
          chart_date.push(cdata.inputDate.toISOString().slice(0, 10));
        });

        // console.log(chart_date)
        // console.log(chart_data)

        res.send({ infoData: chart_data, dates: chart_date });
      }
    }
  );
};
const getHistory = async (req, res) => {
  let user = req.user.id;
  const dates = req.headers["dates"];
  const infolist = [];
  genHealthSchema.find({ user }, (err, dataList) => {
    if (err) {
      console.log("Health info get :" + err);
    }
    if (dataList) {
      dataList.forEach((data) => {
        const dbDate = data.inputDate.toISOString().slice(0, 10);
        if (dates == dbDate) {
          infolist.push(data);
        }
        
      });
      console.log(infolist[0]);
      res.send(infolist);
    }
  });
}

module.exports = {
  postHealthInfo,
  getSugarData,
  getWeightData,
  getBpSysData,
  getBpDiasData,
  getPulseData,
  getHistory,
};
