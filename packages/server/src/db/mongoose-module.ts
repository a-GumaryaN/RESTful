import { Schema, model } from "mongoose";

import {  cutomerInterface } from "../interfaces/interfaces";

const customerSchema = new Schema<cutomerInterface>({
    _id: { type:String, required: true },
    password: { type:String, required: true },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    age: { type: Number, required: false},
    address: { type: String, required: false },
    phone: { type: String, required: false },
});

export const customers = model<cutomerInterface>("customers", customerSchema);
