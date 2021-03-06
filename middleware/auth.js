const jwt = require('jsonwebtoken');

require('dotenv').config();

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.TOKEN_ENCRYPT);
        const userId = decodedToken.userId;
        if(req.body.userId && req.body.userId !== userId) throw '403: unauthorized request.';
        else {
            next();
        }
    } catch (err) {
        res.status(401).json({error: err | 'Requête non authentifiée!' });
    }
}