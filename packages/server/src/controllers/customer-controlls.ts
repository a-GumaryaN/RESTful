import { customerModel } from '../db/customer-module';
import * as joi from 'joi';
import { removeTags } from '../modules/XSS';
import * as jwt from 'jsonwebtoken';
const crypto = require('crypto');
import { auth } from '../modules/auth'

export const secretKey: string = "mfef#%3,s/,.!#";


const hasher = (algo: string, input: string, charStandard: string, hashFormat: string) => {
    const hash = crypto.createHash(algo);
    hash.update(input, charStandard);
    return hash.digest(hashFormat);
}

const registerSchema = joi.object({
    username: joi.string()
        .min(10)
        .required(),
    password: joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
});

const updateSchema = joi.object({
    firstName: joi.string(),
    lastName: joi.string(),
    phone: joi.string(),
    address: joi.string(),
    age: joi.number(),
});

async function Save(object) {
    return await object.save();
}

async function Find(object) {
    return await object.save();
}



export const register = (req: any, res: any) => {

    const { error } = registerSchema.validate(
        {
            username: req.body.username,
            password: req.body.password
        });
    if (error) return res.send(error);

    const clearUsername = removeTags(req.body.username);

    customerModel.findOne({ _id: clearUsername })
        .then((result) => {
            if (result) return res.send(`user registered last`)
        })
        .catch((err) => {
            return res.send(err);
        });



    const clearPass = removeTags(req.body.password);

    const hashedPassword = hasher('md5', clearPass, 'utf-8', 'hex');

    const newCustomer = new customerModel({
        _id: clearUsername,
        password: hashedPassword
    });

    Save(newCustomer)
        .then((result) => {
            return res.send(`successfully registered by ${result._id}`);
        })
        .catch((err) => {
            return res.send(err);
        });

}

export const login = (req: any, res: any) => {
    const { error } = registerSchema.validate(
        {
            username: req.body.username,
            password: req.body.password
        });
    if (error) return res.send(error);

    const clearUsername = removeTags(req.body.password);
    const clearPass = removeTags(req.body.password);
    const hashedPassword = hasher('md5', clearPass, 'utf-8', 'hex');

    customerModel.findOne({ username: clearUsername })
        .then((result) => {
            if (!result) res.status(400).send(`user with this username not registered`)

            if (result.password !== hashedPassword)
                res
                    .status(400)
                    .send(`password not valid...`)

            const madeToken: string =
                jwt.sign({ username: req.body.username }, secretKey)

            res.header('auth-token', madeToken).send(madeToken);

        })
        .catch((err) => {
            res.send(err);
        });

}


export const update = (req, res) => {

    auth(req.headers.authheader, secretKey, res);


    const { error } = updateSchema.validate(
        {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            address: req.body.address,
            phone: req.body.phone,
            age: req.body.age
        });

    if (error) return res.send(error);

    const decodedToken = jwt.decode(req.headers.authheader);

    customerModel.updateOne({ _id: decodedToken.username }, req.body)
        .then((result) => {
            res.send(`successfully updated...`);
        })
        .catch((err) => {
            res.send(err);
        });

}


export const Delete = (req: any, res: any) => {
    auth(req.headers.authheader, secretKey, res);

    const delete_id = jwt.decode(req.headers.authheader);

    customerModel.findOne({ _id: delete_id.username })
        .then((result) => {
            if (!result) return res.send(`user not found...`)
        })
        .catch((err) => {
            return res.send(err);
        });

    customerModel.deleteOne({ _id: delete_id.username })
        .then((result) => {
            res.send(`successfully deleted...`);
        })
        .catch((err) => {
            res.send(err);
        });
}
