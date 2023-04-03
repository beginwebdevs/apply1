const jwt = require('jsonwebtoken');
const accessTokenSecrete = process.env.JWT_ACCESS_TOKEN_SECRETE;

module.exports = async function (req, res, next) {
    
    try {
        const { accessToken } = req.cookies;
        if(!accessToken) {
            throw new Error();
        }
        
        const userData = await jwt.verify(accessToken, accessTokenSecrete);
        //console.log(userData)
        if(!userData) {
            throw new Error()
        }
        req.user = userData;
        next()
    } catch (err) {
        return res.status(401).json({message: "Invalid Token"});

    }
}