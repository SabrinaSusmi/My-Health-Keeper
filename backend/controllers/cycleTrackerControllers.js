const Cycle = require("../models/periodTracker.model");
const sendMail = require("./sendMail.Controllers");

setInterval(() => {
  // console.log('ss')
  // let user = req.headers['userid'];
  Cycle.find({}, (err, reminder) => {
    if (err) {
      console.log("cycle notification: ", err);
    }
    if (reminder) {
      //for loop reminder.size,
      for (i = 0; i < reminder.length; i++) {
        if (!reminder[i].isReminded) {
          const now = new Date();
          const lastEndDate = new Date(reminder[i].endDate);

          const nextDay = reminder[i].cycleLength - 5;
          const periodDate = new Date(
            lastEndDate.setTime(lastEndDate.getTime() + nextDay * 86400000)
          );

          // console.log(
          //   "cycle tracker controller setinterval",
          //   reminder[i].userEmail,
          //   "   ",
          //   periodDate
          // );

          if (periodDate - now < 0) {
            Cycle.findByIdAndUpdate(
              reminder[i]._id,
              { isReminded: true },
              (err, remind) => {
                if (err) {
                  console.log(err);
                }

                const nextDate = new Date(
                  remind.endDate.setTime(
                    remind.endDate.getTime() + remind.cycleLength * 86400000
                  )
                );
                console.log(nextDate);
                sendMail(
                  remind.userEmail,
                  null,
                  `Get ready for your PERIOD !!  \n Your probable date : ${nextDate}`,
                  null,
                  null
                );
              }
            );
          }
        }
      }
    }
  });
}, 6000);

const cycleTrackerControllers = {
  displayNotes: async (req, res) => {
    let user = req.headers["userid"];

    const date = req.headers["dates"];
    const eventDate = new Date(date);
    const notesdata = [];
    await Cycle.findOne({ user })
      .then((response) => {
        for (i = 0; i < response.notes.length; i++) {
          const strDate = String(eventDate);
          const strNoteDate = String(response.notes[i].eventDate);

          if (strDate == strNoteDate) {
            console.log("ok ", response.notes[i]);
            notesdata.push(response.notes[i]) ;
          } else {
            console.log("no notes found");
          }
          
                 
        }
        if(notesdata.length==0){
         res.send()
         
        }
        else{
          console.log(notesdata)
          res.send(notesdata);
        }
      })

     
      .catch((err) => {
        console.log(err)
        return res.status(500).json({ msg: err.message });
      });

    // console.log("gvg  ", data);

    // console.log("note.eventDate: ",note.eventDate)

    // res.json({ msg: data.notes.find((note) => note.eventDate == eventDate) });
  },

  //doesn't work
  removeNotes: async (req, res) => {
    try {
      let user = req.headers["userid"];

      const { eventDate } = req.body;
      const { flow } = req.body;
      const { mood } = req.body;
      const data = await Cycle.findOne({ user });
      const noteData = data.notes.find((note) => note.flow == flow);
      console.log(noteData);

      // console.log(Cycle.findOneAndUpdate({ notes: noteData }, { mood }));
      res.json({ msg: "k" });
    } catch (err) {
      return res.status(500).json({ removeNotes: err.message });
    }
  },

  createNotes: async (req, res) => {
    let user = req.headers["userid"];
    const { eventDate, mood, symptoms, flow } = req.body;
    const check = await Cycle.findOne({
      user,
    });

    if (check) {
      await Cycle.findOneAndUpdate(
        { user },
        {
          $push: {
            notes: {
              eventDate: eventDate,
              mood: mood,
              symptoms: symptoms,
              flow: flow,
            },
          },
        }
      )
        .then(() => {
          return res.json({ msg: "saved" });
        })
        .catch((err) => {
          return res.status(500).json({ msg: err.message });
        });
    } else {
      return res.status(400).json({ msg: "provide the initial data first" });
    }
  },

  updateInitialData: async (req, res) => {
    try {
      let user = req.headers["userid"];

      const { startDate, endDate } = req.body;
      await Cycle.findOneAndUpdate(
        { user: user },
        {
          startDate: startDate,
          endDate: endDate,
          isReminded: false,
        }
      ).then(() => {
        console.log("updateInitialData ", startDate);
        return res.json({ msg: "Update Success!" });
      });
    } catch (err) {
      return res.status(500).json({ setupData: err.message });
    }
  },
  isInitialDataAvailable: async (req, res) => {
    try {
      let user = req.headers["userid"];

      // console.log("check ", user);
      const check = await Cycle.findOne({
        user,
      });

      if (check) {
        console.log(check.startDate);
        return res.json(check);
      }
    } catch (err) {
      return res.status(500).json({ setupData: err.message });
    }
  },

  setupInitialData: async (req, res) => {
    let user = req.headers["userid"];

    const { startDate, endDate, duration, cycleLength, userEmail } = req.body;
    if (!startDate || !endDate || !duration || !cycleLength)
      return res.json({ msg: "Please fill in all fields." });

    const initialinfo = new Cycle({
      user: user,
      startDate: startDate,
      endDate: endDate,
      duration: duration,
      cycleLength: cycleLength,
      userEmail: userEmail,
    });

    await initialinfo
      .save()
      .then(() => {
        return res.json({ msg: "Initial data is saved.  Please refresh the page now" });
      })
      .catch((err) => {
        return res.status(500).json({ msg: err.message });
      });
    // return res.json({ msg: "Initial data is saved" });
  },
};

module.exports = cycleTrackerControllers;
