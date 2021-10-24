const bcrypt = require('bcrypt');

const salt = bcrypt.genSalt(10)

bcrypt.hash('password', salt).then((result) => {
    console.log(result);
});




