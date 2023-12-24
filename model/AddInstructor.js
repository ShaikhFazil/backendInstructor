const mongoose = require('mongoose');
const {Schema} = mongoose;

const AdminSchema = new Schema({
    name: String,

});

module.exports = mongoose.model("AddInstructor",AdminSchema);