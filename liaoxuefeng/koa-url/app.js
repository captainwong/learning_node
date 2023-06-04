const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const controller = require('./controller');
const app = new Koa();




app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

app.use(bodyParser());
app.use(controller());

app.listen(8080);

console.log('server is running at http://127.0.0.1:8080/');
