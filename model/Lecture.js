const mongoose = require('mongoose');
const { Schema } = mongoose;

const lectureSchema = new Schema({
  instructor: String,
  course: String,
  date: String,
});

const LectureModel = mongoose.model('Lecture', lectureSchema);

module.exports = LectureModel;