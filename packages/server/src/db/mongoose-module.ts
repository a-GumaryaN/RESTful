import { Schema, model } from "mongoose";

import {  cutomerInterface } from "../interfaces/interfaces";

const customerSchema = new Schema<cutomerInterface>({
    firstName: { type:String, required: true },
    lastName: { type:String, required: true },
    age: { type: Number, required: true }
});

export const customers = model<cutomerInterface>("customers", customerSchema);
