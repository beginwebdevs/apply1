const jwt = require('jsonwebtoken');
const accessTokenSecrete = 'b24cd70fa9134d5019250ccc9e43e223aea3974dab998c870cf42f4ddf3b14745cbaf3fe9c8a5a7eedf74c5dc48b84d641d07a90f09bb4a568c7f6e47a5f437b';

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