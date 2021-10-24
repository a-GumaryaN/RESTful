import { customerModel } from '../db/customer-module';
import * as joi from 'joi';
import { removeTags } from '../modules/XSS';
const crypto = require('crypto');


const hasher = (algo: string, input: string, charStandard: string, hashFormat: string) => {
    const hash = crypto.createHash(algo);
    hash.update(input, charStandard);
    return hash.digest(hashFormat);
}

const schema = joi.object({
    username: joi.string()
        .min(10)
        .required(),
    password: joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
});

async function Save(object) {
    return await object.save();
}

async function Find(object) {
    return await object.save();
}

export const register = (req: any, res: any) => {

    const { error } = schema.validate(
        {
            username: req.body.username,
            password: req.body.password
        });
    if (error) return res.send(error);

    const clearPass = removeTags(req.body.password);

    const hashedPassword = hasher('md5',clearPass , 'utf-8' , 'hex');

    const newCustomer = new customerModel({
        _id: removeTags(req.body.username),
        password: hashedPassword
    });

    Save(newCustomer)
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });

}
