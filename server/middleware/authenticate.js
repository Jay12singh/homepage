const jwt = require("jsonwebtoken");
const userdb = require("../models/userSchema");
const keysecret = "jaysinghjaysinghjaysinghjaysingh";


const authenticate = async (req, res, next) => {
    try {

        let token = req.headers.authorization;

        const verifytoken = jwt.verify(token, keysecret);
        const rootUser = await userdb.findOne({ _id: verifytoken._id });


        if (!rootUser) { throw new Error("user not found") }

        req.token = token
        req.rootUser = rootUser
        req.userId = rootUser._id

        next();

        // console.log(rootUser);

    } catch (err) {

        res.status(401).json({ status: 401, message: "Unauthorized no token provide" })

    }

}


module.exports = authenticate;