项目目录介绍

+ src             -- 源码目录
|
+ -- config       -- 配置目录
+ -- lib          -- 业务无关库目录
+ -- middleware   -- 中间件目录
+ -- model        -- 数据模型目录
+ -- parser       -- html静态文件处理目录
+ -- spider       -- 爬虫定义目录
|
+ -- main.js      -- main函数，编写定时文件等



装饰器
@KaspApplication(spiderLocation:string[])        定义一个Kasp程序，参数为扫描的包路径