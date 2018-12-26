const Koa = require('koa');
const respond = require('koa-respond');
const logger = require('koa-logger')
const cors = require('@koa/cors');

const connectToDb = require('./services/dbConnection');
const routes = require('./routes');

connectToDb();

const app = new Koa();

app.use(cors());
app.use(respond());
app.use(logger());

routes.forEach(route => app.use(route));

module.exports = app;
