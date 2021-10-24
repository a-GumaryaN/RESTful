import * as mongoose from 'mongoose';

import { customerInterface } from '../interfaces/customerInterfaces';

const customerSchima = new mongoose.Schema<customerInterface>({
    _id : { type: 'string', required: true },
    password: { type: 'string', required: true },
    firstName: { type: 'string', required: false },
    lastName: { type: 'string', required: false },
    age: { type: 'number', required: false },
    phone: { type: 'string', required: false },
    address: { type: 'string', required: false },
});

export const customerModel = mongoose.model<customerInterface>
    ('customers', customerSchima);