const Contact = require("../model/contact")
const AddInstructor = require('../model/AddInstructor');
const cloudinary = require('../utils/cloudinary');
const fs = require('fs');
const Lecture = require('../model/Lecture');


const getAllContacts = async(req,res) =>{
  const contacts = await Contact.find({}).exec();
  res.status(200).json(contacts);
};



const addContacts = async(req,res) =>{
  try{
   const {path} = req.file 
const result = await cloudinary.uploader.upload(path)
const contact = new Contact({
   name:req.body.name,
   level:req.body.level,
   description:req.body.description,
   image:result.secure_url,
});
await contact.save();
fs.unlinkSync(path);
  }
  catch (error){
   console.log(error);
  }
}




const editContacts = async(req,res) =>{
    let contact; 

    try {
      contact = await Contact.findById(req.params.id).exec();
    
  
      await cloudinary.uploader.destroy(contact._id);
    
      let result = {}; 
    
      if (req.file) {
        result = await cloudinary.uploader.upload(req.file.path);
      }
    
      const data = {
        name: req.body.name || contact.name,
        level: req.body.level || contact.level,
        description: req.body.description || contact.description,
        image: result.secure_url || contact.image, 
      };
    
      
      contact = await Contact.findByIdAndUpdate(req.params.id, data, { new: true });
    
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      res.status(200).json(contact);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'An error occurred' }); 
    }
    };
    
  
   
    const AddInstructorName = async (req, res) => {
      try {
        const contact = new AddInstructor({
          name: req.body.name,
        });
    
        await contact.save();
       
        res.status(200).json({ message: 'Instructor added successfully' });
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    };

    const GetInstructorName = async (req, res) => {
      try {
        const contacts = await AddInstructor.find({}).exec();
        res.status(200).json(contacts);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    }

    const schedulelecture = async (req, res) => {
      try {
        console.log('Request Body:', req.body);
        const { instructor, course, date } = req.body;
    
       
        const lecture = new Lecture({
          instructor,
          course,
          date,
        });
    
       
        await lecture.save();
    
        res.status(200).json({ message: 'Lecture scheduled successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    };

module.exports = {
    getAllContacts,
    addContacts,
    editContacts,
    AddInstructorName,
    GetInstructorName,
    schedulelecture,
};