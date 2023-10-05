const express = require('express');
const router = express();
const userdb = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");

//for user registration

// router.get("/", (req, res) => {
//     res.status(200).json("server is created");
// });

router.post("/register", async (req, res) => {
    const { fname, email, password, cpassword } = req.body;
    // console.log(req.body);

    if (!fname || !email || !password || !cpassword) {
        res.status(422).json({ error: "fill the details" });
    }
    try {
        const preuser = await userdb.findOne({ email: email });
        if (preuser) {
            res.status(422).json({ error: "This email is already exists" });
        } else if (password !== cpassword) {
            res.status(422).json({ error: "Password and  confirm password not match" });
        } else {
            const finalUser = new userdb({
                fname, email, password, cpassword
            });
            // console.log(finaluser);


            //password hashing

            const storeData = await finalUser.save();
            // console.log(storeData);
            res.status(201).json({ status: 201, storeData });
        }


    } catch (err) {
        res.status(401).json(err);
        console.log("catch block error");

    }
});

//user login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(422).json({ error: "Fill in all the details" });
    }

    try {
        const userValid = await userdb.findOne({ email: email });
        console.log(userValid);

        if (!userValid) {
            return res.status(422).json({ error: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, userValid.password);
        console.log(isMatch);

        if (!isMatch) {
            return res.status(422).json({ error: "Invalid password" });
        }

        const token = await userValid.generateAuthtoken();

        res.cookie("usercookie", token, {
            expires: new Date(Date.now() + 9000000),
            httpOnly: true
        });

        const result = {
            userValid,
            token
        };

        res.status(201).json({ status: 201, result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error, please try again later" });
    }
});


//user Valid

router.get("/validuser", authenticate, async (req, res) => {
    try {
        const ValidUserOne = await userdb.findOne({ _id: req.userId });
        res.status(201).json({ status: 201, ValidUserOne });
    } catch (error) {
        res.status(422).json({ status: 401, error });

    }
});

//user logout

router.get("/logout", authenticate, async (req, res) => {
    try {
        req.rootUser.tokens = req.rootUser.tokens.filter((curelem) => {
            return curelem.token !== req.token
        });

        res.clearCookie("usercookie", { path: "/" });

        req.rootUser.save();

        res.status(201).json({ status: 201 })

    } catch (error) {
        res.status(401).json({ status: 401, error })
    }
});

module.exports = router;
