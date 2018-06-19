'use strict';

var app = require('./src/app');

/* Server */
var port = process.env.PORT || 3000;

app.listen(port, () =>{
    console.log('Server on port '+port);
});