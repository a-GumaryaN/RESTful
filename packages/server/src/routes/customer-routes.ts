import { Router } from 'express';
const router = Router();

import { register } from '../controllers/customer-controlls';

//routes for read client information
router.get('/', (req, res) => {
    
});


//routes for create and login client 
router.post('/register', (req, res) => {
    register(req, res);
});

router.post('/login', (req, res) => {
  
});


//routes for update client information
router.put('/update', (req, res) => {
  
});

//routes for delete client information
router.delete('/delete', (req, res) => {
    
});


module.exports = router;