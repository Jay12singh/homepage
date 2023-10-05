const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keysecret = "jaysinghjaysinghjaysinghjaysingh";

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new error(" not valid email");
            }
        }
    },
    password: {

        type: String,
        required: true,
        minlength: 6

    },
    cpassword: {

        type: String,
        required: true,
        minlength: 6

    },
    tokens: [
        {
            token: {

                type: String,
                required: true,

            }
        }
    ]

});



//hashing password
//calling pre method of mongodb
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }

    next()
});
// console.log("Hello");
//token generate
userSchema.methods.generateAuthtoken = async function () {
    try {
        let token12 = jwt.sign({ _id: this._id }, keysecret, {
            expiresIn: "1d"
        })
        this.tokens = this.tokens.concat({ token: token12 });
        await this.save();
        console.log("Hello");
        return token12;

    } catch (err) {
        res.status(422).json(err);
        console.log(err);

    }

}
//creating model

const userdb = new mongoose.model("users", userSchema);

module.exports = userdb;


