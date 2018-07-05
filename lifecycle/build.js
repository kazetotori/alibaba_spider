// 编译，运行tsc命令
const nodecmd=require('node-cmd');
require('./clean');

console.log('========= BUILD START ==========')

nodecmd.run('tsc');
console.log('========= BUILD SUCCESS ==========')