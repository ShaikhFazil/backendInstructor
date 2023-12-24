const Admin = require("../model/AdminCrud")
const cloudinary = require('../utils/cloudinary');
const fs = require('fs');


const getAllContacts = async(req,res) =>{
  const contacts = await Admin.find({}).exec();
  res.status(200).json(contacts);
};


const addContacts = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.buffer.toString('base64'));
    const contact = new Admin({
      name: req.body.name,
      level: req.body.level,
      description: req.body.description,
      image: result.secure_url,
    });
    await contact.save();
    res.status(200).json({ message: 'Contact added successfully', contact });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};


const editContacts = async(req,res) =>{
    let contact; 

    try {
      contact = await Admin.findById(req.params.id).exec();
    
      
      await cloudinary.uploader.destroy(contact._id);
    
      let result = {}; 
    
      if (req.file) {
        result = await cloudinary.uploader.upload(req.file.path);
      }
    
      const data = {
        name: req.body.name || contact.name,
        image: result.secure_url || contact.image,
      };
    
    
    
      contact = await Admin.findByIdAndUpdate(req.params.id, data, { new: true });
    
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      res.status(200).json(contact);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'An error occurred' }); 
    }
    };
    
  


const deleteContacts = async (req,res) =>{
    let contact;

    try {
      contact = await Admin.findById(req.params.id).exec();
    
      await cloudinary.uploader.destroy(contact._id);
      await contact.remove();
      res.status(200).json(`contact with the name of ${contact.name} was deleted succesfully`)
}
catch (err) {
    console.log(err);
    res.status(500).json({ error: 'An error occurred' }); 
  }

}
const getSignalContacts = async(req,res) =>{
    try{
let contact = await Admin.findById(req.params.id).exec();
res.status(200).json(contact);
    }
    catch(err){
        res.status(500).json({ error: 'An error occurred' });
    }
}



module.exports = {
    getAllContacts,
    addContacts,
    editContacts,
    deleteContacts,
    getSignalContacts,
};