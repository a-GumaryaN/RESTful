import e = require("express");
import { customers } from "../db/mongoose-module";

import { removeTags } from "../modules/XSS";


async function Find(model: any, query: object) {
    return await model.find(query);
}

async function Save(newCustomer: any) {
    return await newCustomer.save();
}

async function Update(model: any, updateID: string, updateObject: object): Promise<any> {
    return await model.updateMany({ userName: updateID }, { '$set': updateObject })
}

async function Delete(model: any, deleteID: string): Promise<any> {
    return await model.deleteMany({ _id: deleteID });
}


export const getClient = (req: any, res?: any) => {

    let _id = req.query.username;


    //check nullability of password and userName
    if (!_id) res.status(400).send({
        errType: 'bad-request',
        reason: "no username exist",
        result: "rejected"
    });

    Find(customers, { _id : _id })
        .then((result) => {
            res.send(result);
        })
        .catch(err => {
            res.send(err);
        });
}




export const addClient = (req: any, res?: any) => {

    let _id = req.body.username,
        password = req.body.password;


    //check nullability of password and userName
    if (!_id) res.status(400).send({
        errType: 'bad-request',
        reason: "no username exist",
        result: "rejected"
    });
    else if (!password) res.status(400).send({
        errType: 'bad-request',
        reason: "no password exist",
        result: "rejected"
    });

    //prevent XSS

    _id = removeTags(_id);
    password = removeTags(password);


    const newCustomer = new customers({
        _id: _id,
        password: password,
    });

    Save(newCustomer)
        .then((result) => {
            res.send(result);
        })
        .catch(err => {
            console.log('users registered');
            res.send('users registered');
        });
}





export const updateClient = (req: any, res?: any) => {
    //check if request has an id
    if (req.params._id === null || req.params._id === undefined)
        res.status(400).send({
            errType: 'bad-request',
            reason: 'no id found',
            result: 'rejected'
        });


    //make customer objest to update

    for (var item in req.body){
        req.body[item] = removeTags(req.body[item]);
    }

    //update database

    Update(customers, req.params._id, req.body)
        .then((result) => {
            res.send(result);
        })
        .catch(err => {
            res.send(err);
        });

}

export const deleteClient = (req: any, res?: any) => {

    //check if request has an id
    if (req.params._id === null || req.params._id === undefined)
        res.status(400).send({
            errType: 'bad-request',
            reason: 'no id found',
            result: 'rejected'
        })

    //delete record in data base

    Delete(customers, req.params._id)
        .then((result) => {
            res.send(result);
        })
        .catch(err => {
            res.send(err);
        });
}


