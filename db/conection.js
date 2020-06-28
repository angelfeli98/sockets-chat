
require('../config/config');
const mongoose = require('mongoose');

const opt = {
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useFindAndModify: false,
    useCreateIndex : true
}

mongoose.connect(process.env.URL_DB, opt)
        .then(console.log(`Connected to database`))
        .catch(console.log)