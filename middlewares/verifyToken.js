
const wbt = require('jsonwebtoken');

const decodedToken = (req, res, next) => {
    try{
        const token = req.get('token');
        req.token = wbt.decode(token)
        res.status(200).json({ok : true, user : req.token.user})
    }catch(err){
        res.status(403).json({ok : false, err : { name : 'Token error', message : 'Token not valid' }});
    }
}



module.exports = {
    decodedToken
}