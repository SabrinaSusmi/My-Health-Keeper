const mongoose = require('mongoose')

const genHealthSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    infoTitle: {
        type: String,
        required: true
    },
    info: {
        type: Number,
        required: true
    },
    inputDate: {
        type : Date,
        required : true
    }
})

module.exports = mongoose.model('genHealth', genHealthSchema)