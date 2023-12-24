const mongoose = require('mongoose');
const {Schema} = mongoose;

const AdminSchema = new Schema({
    name: String,
    level: String,
    description: String,
    image: String,
    cloudinary_id: String,
});

module.exports = mongoose.model("Admin",AdminSchema);