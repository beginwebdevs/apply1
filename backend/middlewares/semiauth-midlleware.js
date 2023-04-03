const jwt = require('jsonwebtoken');
const accessTokenSecrete = process.env.JWT_ACCESS_TOKEN_SECRETE;

module.exports = async function (req, res, next) {
    
    try {
        const { accessToken } = req.cookies;
        //console.log(accessToken)
        if(!accessToken) {
            console.log('no token')
           next();
           return
        }


       
        
        const userData = await jwt.verify(accessToken, accessTokenSecrete)
        console.log(userData)
        console.log(accessToken)
        if(accessToken && !userData){
            next()
            return
        }
        req.user = userData;
        next()
    } catch (err) {
        return res.status(401).json({message: "Invalid Token"});

    }
}