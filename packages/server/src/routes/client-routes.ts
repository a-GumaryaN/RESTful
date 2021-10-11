const router = require('express').Router();

import {
    getClient,
    addClient,
    updateClient,
    deleteClient
} from "../controllers/client-controllers";

router.get('/client', (req: any, res: any) => {
    getClient(req, res);
});

router.post('/client', (req: any, res: any) => {
    addClient(req, res);
});

router.put('/client/:id', (req: any, res: any) => {
    updateClient(req, res);
});

router.delete('/client/:id', (req: any, res: any) => {
    deleteClient(req, res);
});

module.exports = router;