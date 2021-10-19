const express = require("express");
const app = express();
const http = require("http").Server(app);
const port = process.env.PORT || 3000;
const log = console.log;

app.get("",(req , res)=>{
log(req.query);
})

http.listen(port, () => {
  log(`server is running on port ${port}...`);
});


/*

connect to an atlas mongodb database with URI
    mongodb+srv://user:password@clusterURI.mongodb.net/databaseName

BSON
    mongorestore => import data in BSON
    mongodump => export data in BSON

JSON
    mongoimport => import data in JSON
    mongoexport => export data in JSON


   





*/