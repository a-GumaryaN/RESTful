import { customerModel } from '../db/customer-module';
import * as joi from 'joi';
import { removeTags } from '../modules/XSS';
import * as jwt from 'jsonwebtoken';
import { auth } from '../modules/auth'
import {
    FindOne,
    Save,
    UpdateOne,
    DeleteOne,
    hasher,
    secretKey
} from '../modules/modules';




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

    FindOne(customerModel, { _id: clearUsername })
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

    const clearUsername = removeTags(req.body.username);
    const clearPass = removeTags(req.body.password);
    const hashedPassword = hasher('md5', clearPass, 'utf-8', 'hex');



    FindOne(customerModel, { _id: clearUsername })
        .then((result) => {
            if (!result) res
                .status(400)
                .send(`user with this username not registered`)

            if (result.password !== hashedPassword)
                res
                    .status(400)
                    .send(`password not valid...`)

            const expireDate = new Date().getTime() + 60;

            const madeToken: string =
                jwt.sign({ username: req.body.username, expireDate:expireDate }, secretKey)

            res.header('auth-token', madeToken).send('logged in successfully...');

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

    const decodedToken: any = jwt.decode(req.headers.authheader);

    UpdateOne(customerModel, { _id: decodedToken.username }, req.body)
        .then((result) => {
            res.send(`successfully updated...`);
        })
        .catch((err) => {
            res.send(err);
        });

}


export const Delete = (req: any, res: any) => {
    auth(req.headers.authheader, secretKey, res);

    const delete_id: any = jwt.decode(req.headers.authheader);

    FindOne(customerModel, { _id: delete_id.username })
        .then((result) => {
            if (!result) return res.send(`user not found...`)
        })
        .catch((err) => {
            return res.send(err);
        });

    DeleteOne(customerModel, { _id: delete_id.username })
        .then((result) => {
            res.send(`successfully deleted...`);
        })
        .catch((err) => {
            res.send(err);
        });
}
