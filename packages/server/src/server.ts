const log = console.log;

import * as express from 'express';

const app = express();

const dburl: string = "mongodb://localhost:27017/nodejsExercise";

const port: number = 3000;

import * as mongoose from 'mongoose';

import * as bodyParser from 'body-parser';

app.use(bodyParser.json())

// log(async () => { await  });

mongoose.connect(dburl, (err)=>{
if(err)throw err;
console.log("connected to the database successfully!!!");
})


const customerRoutes= require('./routes/customer-routes');

app.use(customerRoutes);






app.listen(port, () => {
    log(`server is running on port ${port}`)
});

