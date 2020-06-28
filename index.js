
require('./config/config');
require('./db/conection');

const { server } = require('./app');

server.listen(process.env.PORT, (err) => {
    if(!!!err) console.log(`Sever ready at http://localhost:${process.env.PORT}`);
})