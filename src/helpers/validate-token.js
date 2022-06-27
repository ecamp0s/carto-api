import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401);
    }
    
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401);
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).send(err.message);
        }

        req.user = user

        next()
    });

};

export default verifyToken ;