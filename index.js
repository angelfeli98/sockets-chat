
require('./config/config');

const { server } = require('./app');

server.listen(process.env.PORT, (err) => {
    if(!!!err) console.log(`Sever ready at http://localhost:${process.env.PORT}`);
})