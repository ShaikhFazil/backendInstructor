const cloudinary = require('cloudinary').v2;
          
cloudinary.config({ 
  cloud_name: 'dr2krdnae', 
  api_key: '576661847896165', 
  api_secret: 'qtrs1eNH-7TBX5dVz40LfKqY0-w' 
});

module.exports = cloudinary;