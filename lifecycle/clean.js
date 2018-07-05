// 清空tsc编译
// 删除out目录

const fs = require('fs');
const path = require('path');

console.log('========= CLEAN START ==========')

let outDir = path.join(__dirname, '../out')
let built = fs.existsSync(outDir);

if (built) {
    rm(outDir)
}

console.log('========= CLEAN SUCCESS ==========');



/**
 * 删除对应的目录下所有文件以及目录本身
 * @param {String} dirname 
 */
function rm(dirname) {

    let file = fs.statSync(dirname);

    // 如果为目录，则遍历目录下文件删除
    if (file.isDirectory()) {
        let childFiles = fs.readdirSync(dirname)
        for (let childFile of childFiles) {
            let filename = path.join(dirname, '/', childFile);
            rm(filename);
        }
        fs.rmdirSync(dirname);
        console.log(`DIR CLEANED: ${dirname}`)
        return;
    }

    // 否则为文件
    fs.unlinkSync(dirname);
    console.log(`FILE CLEANED: ${dirname}`)
}