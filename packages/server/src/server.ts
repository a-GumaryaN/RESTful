const express = require("express");
const app = express();
const http = require("http").Server(app);
const port: number | string = process.env.PORT || 3000;
const log = console.log;
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const dburl: string = "mongodb://localhost:27017/nodejsExercise";

app.use(bodyParser.json());


mongoose.connect(dburl)
    .then(()=>{
        log("connected to the database successfully...");
    })
    .catch((err: any) => { throw err })


const clientRoutes = require("./routes/client-routes");

app.use(clientRoutes);



app.use("", (req: any, res: any) => {
    res.status(404).send({
        errorType: "404",
        reason: "request not valid",
    });
});

http.listen(port, () => {
    log(`server is running on port ${port}...`);
});
