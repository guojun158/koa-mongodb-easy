const router = require('koa-router')();
const DB = require('../module/db');

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: '首页',
    subTitle: '<h1>TodoList</h1>',
    content: '<h2>koa2 + mongodb + art-template</h2>',
  })
})

module.exports = router;