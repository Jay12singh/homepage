const mongoose = require("mongoose");

const DB = "mongodb+srv://jaysingh:Singhjay1234@cluster0.w5kvyvb.mongodb.net/Authusers?retryWrites=true&w=majority";
mongoose.connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => console.log("Database connected")).catch((err) => {
    console.log(err);
})