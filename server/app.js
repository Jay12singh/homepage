const express = require('express');
const app = express();
const cors = require("cors");
require("./db/conn");
const router = require("./routes/router");
const cookieparser = require("cookie-parser");
const port = 8009;


app.use(express.json());
app.use(cookieparser());
app.use(cors());
app.use(router);

// app.get("/", (req, res) => {
//     res.status(200).json("server is created");
// });


app.listen(port, () => {
    console.log(`server is runnig on port : ${port}`);
})