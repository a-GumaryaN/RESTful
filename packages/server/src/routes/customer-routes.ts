import { Router } from 'express';
const router = Router();

import {
    login,
    register,
    update,
    Delete,
    getInfo
} from '../controllers/customer-controlls';

//routes for read client information
router.get('/', (req, res) => {
    getInfo(req,res);
});


//routes for create and login client 
router.post('/register', (req, res) => {
    register(req, res);
});

router.post('/login', (req, res) => {
    login(req, res);
});


//routes for update client information
router.put('/update', (req, res) => {
update(req,res);
});

//routes for delete client information
router.delete('/delete', (req, res) => {
    Delete(req,res)
});


module.exports = router;