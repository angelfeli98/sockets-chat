
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

process.env.PORT = process.env.PORT || 7070;

const BASE_DATA = `mongodb://localhost:27017/chat`;

if(process.env.NODE_ENV === 'dev')
    process.env.URL_DB = BASE_DATA;

process.env.SEED = process.env.SEED || 'SECRET';
process.env.DEAD_LINE = process.env.DEAD_LINE || (60*60*12);