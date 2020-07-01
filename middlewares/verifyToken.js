
const wbt = require('jsonwebtoken');

const valirateToken = (req, res, next) => {
    try{
        const token = req.get('token');
        req.user = wbt.verify(token, process.env.SEED);
        res.status(200).json({ok : true, token});
    }catch(err){
        res.status(403).json({ok : false, err : { name : 'Token error', message : 'Token not valid' }});
    }
}


module.exports = {
    valirateToken
}