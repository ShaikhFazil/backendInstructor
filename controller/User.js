const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 
const User = require('../model/userSchema');

const SECRET_KEY = 'eifgkbkkf'

const Register = async(req,res) =>{
    try{

        const {email, username,password} = req.body;
        const hashPassword = await bcrypt.hash(password,10);
        const newUser = new User({email: email, username:username, password: hashPassword});
        await newUser.save();
        res.status(200).json({
            message: "Success to register"
        })
        
            }
            catch(err){
                res.status(500).json({
                    error: err.message
                })
            }
        }
        


const Login =async (req,res) =>{
    try{

        const {username,password} = req.body
        const user = await User.findOne({username: username})
        
        if(!user){
            return res.status(404).json({
                error: 'User not found'
            })
        }
        
        const isPasswordValid = await bcrypt.compare(password,user.password)
        
        if(!isPasswordValid){
            return res.status(404).json({
                error: 'Password is not valid'
            })
        }
        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1hr' });
        res.json({ message: 'login succesfull', token });
        
            }
            catch(err){
                res.status(500).json({
                    error: err.message
                })
            }
        }

        
module.exports = {
    Register,
    Login,
}