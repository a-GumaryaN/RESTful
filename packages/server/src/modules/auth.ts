import * as jwt from 'jsonwebtoken';
export const auth = (token, secretKey,res) => {
    if (!token) res.status(401).send('access denied...');
    try {
        const userVerified = jwt.verify(token, secretKey);
        if (userVerified)return true;
        res.status(400).send('invalid token...');
    } catch (err) {
        res.status(400).send('invalid token...');
    }
}