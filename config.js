const test = true;
// 测试 const test = true;
let dev = process.env.NODE_ENV === "development";
const local = dev;
module.exports = {
  test: test,
  dev: dev,
  sessionMaxAge: 365 * 24 * 3600 * 1000 * 10,
  db: {
    name: test ? 'music' : 'music',
    username: test ? 'jishuya' : 'jishuya',
    password: test ? 'jishuya' : 'jishuya',
    config: {
      host: '192.144.131.126',
      dialect: "postgres",
      pool: {
        max: 5,
        min: 0,
        idle: 200000,
        acquire: 200000
      },
      logging: false
    }
  },
  cookieSecret: "silver jump recent harder"
};