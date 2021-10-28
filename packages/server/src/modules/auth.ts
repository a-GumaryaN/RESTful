import * as jwt from 'jsonwebtoken';

export const auth = (token, secretKey, res): (boolean | Function) => {
    if (!token) return res.status(401).send('access denied...');
    try {
        const nowDate = new Date().getTime();
        const info: any = jwt.decode(token);

        if (nowDate > info.expireDate) res
            .status(400)
            .send('token is expired...');


        const userVerified = jwt.verify(token, secretKey);
        if (userVerified) return true;

        return res.status(400).send('invalid token...');
    } catch (err) {
        return res.status(400).send('invalid token...');
    }
}