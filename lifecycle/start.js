// 启动项目
const main = require('./../out/main').Main.main
setTimeout(() => main(process.argv.slice(2)));