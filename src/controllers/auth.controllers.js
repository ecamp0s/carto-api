import { getConnection } from "./../database/database";
import bcrypt from "bcrypt";

const createUser = async (req, res) => {
    try {
        const connection = await getConnection();
        
        const emailLookupResult = await connection.query("SELECT * FROM users WHERE email = ?", req.body.email);

        if (emailLookupResult.length > 0) {
            return res.status(400).json({error: "Email already exists"});
        }
        
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt);

        const insertData = {
            email: req.body.email,
            password: password
        };

        const insertResult = await connection.query("INSERT INTO users SET ?", insertData);

        if (insertResult.affectedRows === 0) {
            return res.status(500).send("Internal server error");
        }

        res.json({error: null, message: "User created"});
    } catch(error) {
        res.status(500).send(error.message);
    }
};

const login = async (req, res) => {
    try {
        const connection = await getConnection();
        
        const userLookupResult = await connection.query("SELECT * FROM users WHERE email = ?", req.body.email);

        if (userLookupResult.length === 0) {
            res.status(400).json({error: "User not found"});
        }

        const validPassword = await bcrypt.compare(req.body.password, userLookupResult[0].password);

        if (!validPassword) {
            return res.status(400).json({error: "Password not valid"});
        }

        const jwt = require("jsonwebtoken");
        const accessToken = jwt.sign({
            name: userLookupResult[0].email,
            id: userLookupResult[0].id
        }, process.env.TOKEN_SECRET, { expiresIn: 60 * 60});

        res.json({error: null, message: "Access granted", accessToken: accessToken});
    } catch(error) {
        res.status(500).send(error.message);
    }    
};

export const methods = {
    createUser,
    login
};