
'use strict'

const pkgInfo=require("../package.json");

exports.eggGoods={
    alias:"goods",
    pkgName:"egg-goods",
    enName:"eggGoods",
    name:"产品管理",
    description:"产品管理",
    isadm:1,
    isindex:1,
    version:pkgInfo.version,
    iconName:"icon_shakehands_fill",
    adminUrl: '/goods/js/app.js',
    adminApi: [{
        url: 'goods/getList',
        method: 'get',
        controllerName: 'list',
        details: '获取列表',
    }, {
        url: 'goods/get',
        method: 'get',
        controllerName: 'get',
        details: '获取单条产品信息',
    }, {
        url: 'goods/add',
        method: 'post',
        controllerName: 'create',
        details: '添加单个产品',
    }, {
        url: 'goods/update',
        method: 'post',
        controllerName: 'update',
        details: '更新产品信息',
    }, {
        url: 'goods/delete',
        method: 'get',
        controllerName: 'remove',
        details: '删除产品',
    }],
    fontApi: [{
        url: 'goods/getList',
        method: 'get',
        controllerName: 'list',
        details: '获取产品列表',
    },{
        url: 'goods/get',
        method: 'get',
        controllerName: 'get',
        details: '获取产品列表',
    }],
    initData: '', // 初始化数据脚本
    pluginsConfig: ` 
    module.exports = {\n
        enable: true,\n        package: 'egg-goods',    
    };\n
    `, // 插入到 plugins.js 中的配置
    defaultConfig: `
    module.exports = {\n
        match: [ctx => ctx.path.startsWith('/manage/goods'), ctx => ctx.path.startsWith('/api/goods')],\n
    },\n
    `,
}