
const User = require('../model/usuario');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const salts = 10;

const savedUser = async(req, res) => {
    try{
        const body = req.body;
        body.google = false;
        body.password = bcrypt.hashSync(body.password, salts);
        const newUser = new User(body);
        const userSaved = await newUser.save();
        const token = jwt.sign(
                { user : userSaved },
                process.env.SEED,
                { expiresIn : process.env.DEAD_LINE * 1 }
            )
        res.status(202).json({ok : true, userSaved, token});
    }catch(err){
        res.status(500).json({ok : false, err });
   }
}

const loginUser = async(req, res) => {
    try{
        const userData = req.body.data;
        const providePassword = req.body.password;
        const user = await User.findOne({$or : [{user : userData}, {email : userData}]});
        if(!!!user) res.status(400).json({ok : false, err : { name : 'login error' , message : 'wrong user or password'}});
        else{
            const passwordIsValid = bcrypt.compareSync(providePassword, user.password);
            if(passwordIsValid){
                const token = jwt.sign({user}, process.env.SEED, { expiresIn : process.env.DEAD_LINE });
                res.status(200).json({ ok : true, user, token });
            }else
            res.status(400).json({ok : false, err : { name : 'login error' , message : 'wrong user or password'}});
        }
    }catch(err){
        res.status(500).json({ ok : false, err : { name : 'login error' , message : 'server error'} });
    }
}

const liginGoogle = (req, res) => {

}

const asycUpdateUser = async(id, data) => {
    try{
        const option = {new : true};
        const userUpdated = await User.findByIdAndUpdate(id, {conection_id : data}, option);
        if(userUpdated)
            return {ok : true, userUpdated};
        else
            return {ok : false, error : {name : 'Query error', message : 'User not found'}};
    }catch(err){
        return {ok : false , err: { name : 'Server errr', message : 'Internal error server' }};
    }
}

module.exports = {
    savedUser,
    loginUser,
    asycUpdateUser
}