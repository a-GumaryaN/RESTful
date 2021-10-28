const crypto = require('crypto');

export const secretKey: string = "mfef#%3,s/,.!#";
 
export async function FindOne(model, query: object):Promise<any>{
    return await model.findOne(query);
}

export async function Save(model): Promise<any>{
    return await model.save();
}

export async function UpdateOne(model, query, updateInfo): Promise<any>{
    return await model.updateOne(query, updateInfo);
}

export async function DeleteOne(model, query): Promise<any>{
    return await model.deleteOne(query);
}

export const hasher = 
(algo: string, input: string, charStandard: string, hashFormat: string) => {
    const hash = crypto.createHash(algo);
    hash.update(input, charStandard);
    return hash.digest(hashFormat);
}