const path = require('path');
const Koa = require('koa');

// const Views = require('koa-views');
const serve = require('koa-static')
const bodyParser = require('koa-bodyparser')
const render = require('koa-art-template');
const session = require('koa-session');

// 路由文件
const index = require('./routes/index')
const users = require('./routes/users')

const app = new Koa();
// 配置模版
render(app, {
  root: path.join(__dirname, 'view'),
  extname: '.html',
  debug: process.env.NODE_ENV !== 'production'
});

app.keys = ['some secret hurr'];
// middlewares
app.use(bodyParser()) // 提交post获取数据
app.use(serve(__dirname + '/public')); // 静态资源文件
app.use(session({
  key: 'koa.sess', 
  maxAge: 86400000, //过期时间
}, app));

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())


// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

app.listen(3000)