var bcrypt = require('bcrypt');
var salt = bcrypt.genSalt(10);
bcrypt.hash('password', salt).then(function (result) {
    console.log(result);
});
