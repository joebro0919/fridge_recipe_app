const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const routineSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true},
  tasks:[{title:String, description:String,days:String}]

});

module.exports = mongoose.model('Routine', routineSchema);