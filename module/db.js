const { MongoClient, ObjectID } = require('mongodb');
const config = require('./config');
/**
 * 数据库连接对象（单例模式）
 */
class DB {
  static getInstance() { // 1、单例
    if (!DB.instance) {
      DB.instance = new DB();
    }
    return DB.instance;
  }
  constructor() {
    this.dbClient = '';
    this.connect(); // 实例化的时候创建数据库连接
  }
  /**
   * 创建数据库连接
   */
  connect() {
    return new Promise((resolve, reject) => {
      if (!this.dbClient) { // 2、判断数据库多次连接的问题
        MongoClient.connect(config.dbURL, { useUnifiedTopology: true }, (err, client) => {
          if (err) {
            reject(err);
          } else {
            console.log("已成功连接到服务器");
            this.dbClient = client.db(config.dbName);
            resolve(this.dbClient)
          }
        });
      } else {
        resolve(this.dbClient);
      }
    })
  }
  /**
   * 查询数据
   * @param {string} collectionName - 集合名字
   * @param {Object} json - json对象 
   */
  find(collectionName, json) {
    return new Promise((resolve, reject) => {
      this.connect().then((db) => {
        const result = db.collection(collectionName).find(json);
        result.toArray((err, data) => {
          if (err) {
            reject(err);
          }
          resolve(data);
        })
      })
    })
  }
  /**
   * 增加数据
   * @param {string} collectionName - 集合名字
   * @param {Object} json - json对象
   */
  insert(collectionName, json) {
    return new Promise((resolve, reject) => {
      this.connect().then((db) => {
        db.collection(collectionName).insertOne(json, ((err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }));
      })
    })
  }
  update(collectionName, json1, json2) {
    return new Promise((resolve, reject) => {
      this.connect().then((db) => {
        db.collection(collectionName).updateOne(json1, {
          $set: json2,
        }, ((err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }));
      })
    })
  }
  remove(collectionName, json) {
    return new Promise((resolve, reject) => {
      this.connect().then((db) => {
        db.collection(collectionName).removeOne(json, ((err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }));
      })
    })
  }
  /**
   * 获取ObjectID对象
   * @param {stirng} id _id
   */
  getObjectID(id) {
    return new ObjectID(id)
  }
}

module.exports = DB.getInstance();

// 测试性能
// const db = DB.getInstance()

// setTimeout(async () => {
//   console.time('DB1')
//   const data = await db.find('user', {})
//   console.timeEnd('DB1')
// }, 500)

// setTimeout(async () => {
//   console.time('DB2')
//   const data = await db.find('user', {})
//   console.timeEnd('DB2')
// }, 3000)

// setTimeout(async () => {
//   console.time('DB3')
//   const data = await db.find('user', {})
//   console.timeEnd('DB3')
// }, 5000)

// setTimeout(async () => {
//   console.time('DB4')
//   const data = await db.find('user', {})
//   console.timeEnd('DB4')
// }, 7000)