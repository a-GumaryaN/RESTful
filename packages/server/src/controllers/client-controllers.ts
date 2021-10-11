import { customers } from "../db/mongoose-module";

export const getClient = (req: any, res?: any) => {
    customers.find({ firstName : req.query.fname }, (err, result) => {
        if (err) res.send(err);
        else {
            console.log(result)
            res.send(result);
        }
    });
}

export const addClient = (req: any, res?: any) => {
    const newCustomer = new customers({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
    });
    newCustomer.save((err, result) => {
        if (err) res.send(err);
        else res.send(result);
    });
}

export const updateClient = (req: any, res?: any) => {
    customers.updateMany({ _id: req.params.id }, { "$set": req.body} , {} , (err , result)=>{
        if (err) res.send(err);
        else res.send(result);
    });
}

export const deleteClient = (req: any, res?: any) => {
    customers.deleteOne({_id:req.params.id} , (err)=>{
        if (err) res.send(err);
        else res.send({result:true});
    });
}