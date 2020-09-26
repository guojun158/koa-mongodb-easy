const router = require('koa-router')();
const DB = require('../module/db');
router.prefix('/user');
// 查询数据
router.get('/', async (ctx, next) => {
  const data = await DB.find('user', {})
  await ctx.render('user', {
    title: '用户管理',
    list: data,
  })
})
// 增加数据
router.post('/add', async (ctx, next) => {
  const params = ctx.request.body
  const data = await DB.insert('user', params)
  try {
    if (data.result.ok) {
      ctx.redirect('/user')
    }
  } catch (error) {
    console.error(error)
  }
})
// 更新数据
router.post('/update', async (ctx, next) => {
  const { id, name, age, sex } = ctx.request.body
  try {
    const data = await DB.update('user', { _id: DB.getObjectID(id) }, { name, age, sex })
    if (data.result.ok) {
      ctx.redirect('/user')
    }
  } catch(error) {
    console.error(error)
  }
})
// 删除数据
router.get('/user/delete/:id', async (ctx, next) => {
  const { id } = ctx.params;
  if (id) {
    try {
      const data = await DB.remove('user', { _id: DB.getObjectID(id) })
      if (data.result.ok) {
        ctx.redirect('/user')
      }
    } catch (error) {
      console.error(error)
    }
  }
})
module.exports = router;