'use strict'

/**
 * egg-doras-ads default config
 * @member Config#eggDoraAds
 * @property {String} SOME_KEY - some description
 */ 
const pkgInfo = require('../package.json');

exports.eggGoodsInfo = {
    alias: 'goodsInfo', // 插件目录，必须为英文
    pkgName: 'egg-goods-info', // 插件包名
    enName: 'eggGoodsInfo', // 插件名
    name: '分类管理', // 插件名称
    description: '分类管理', // 插件描述
    isadm: 1, // 是否有后台管理，1：有，0：没有，入口地址:'/ext/devteam/admin/index'
    isindex: 0, // 是否需要前台访问，1：需要，0：不需要,入口地址:'/ext/devteam/index/index'
    version: pkgInfo.version, // 版本号
    iconName: 'icon_shakehands_fill', // 主菜单图标名称
    adminUrl: '/goodsInfo/js/app.js',
    adminApi: [{
        url: 'goodsInfo/getList',
        method: 'get',
        controllerName: 'list',
        details: '获取类别列表',
    }, {
        url: 'goodsInfo/getOne',
        method: 'get',
        controllerName: 'getOne',
        details: '获取单条类别信息',
    }, {
        url: 'goodsInfo/addOne',
        method: 'post',
        controllerName: 'create',
        details: '添加单个类别',
    }, {
        url: 'goodsInfo/updateOne',
        method: 'post',
        controllerName: 'update',
        details: '更新类别信息',
    }, {
        url: 'goodsInfo/deleteCategory',
        method: 'get',
        controllerName: 'removes',
        details: '删除类别',
    }],
    fontApi: [{
        url: 'goodsInfo/getList',
        method: 'get',
        controllerName: 'list',
        details: '获取产品列表',
    }],
    initData: '', // 初始化数据脚本
    pluginsConfig: ` 
    module.exports = {\n
        enable: true,\n        package: 'egg-goods-info',    
    };\n
    `, // 插入到 plugins.js 中的配置
    defaultConfig: `
    module.exports = {\n
        match: [ctx => ctx.path.startsWith('/manage/goodsInfo'), ctx => ctx.path.startsWith('/api/goodsInfo')],\n
    },\n
    `, // 插入到 config.default.js 中的配置
}