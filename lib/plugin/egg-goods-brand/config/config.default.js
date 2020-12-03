'use strict'

/**
 * egg-doras-ads default config
 * @member Config#eggDoraAds
 * @property {String} SOME_KEY - some description
 */

const pkgInfo = require('../package.json');
exports.eggGoodsBrand = {
    alias: 'goodsBrand', // 插件目录，必须为英文
    pkgName: 'egg-goods-brand', // 插件包名
    enName: 'eggGoodsBrand', // 插件名
    name: '产品品牌管理', // 插件名称
    description: '产品品牌管理', // 插件描述
    isadm: 1, // 是否有后台管理，1：有，0：没有，入口地址:'/ext/devteam/admin/index'
    isindex: 0, // 是否需要前台访问，1：需要，0：不需要,入口地址:'/ext/devteam/index/index'
    version: pkgInfo.version, // 版本号
    iconName: 'icon_shakehands_fill', // 主菜单图标名称
    adminUrl: '/goodsBrand/js/app.js',
    adminApi: [{
        url: 'goodsBrand/getList',
        method: 'get',
        controllerName: 'list',
        details: '获取品牌列表',
    }, {
        url: 'goodsBrand/getOne',
        method: 'get',
        controllerName: 'getOne',
        details: '获取单条品牌信息',
    }, {
        url: 'goodsBrand/addOne',
        method: 'post',
        controllerName: 'create',
        details: '添加单个品牌',
    }, {
        url: 'goodsBrand/updateOne',
        method: 'post',
        controllerName: 'update',
        details: '更新品牌信息',
    }, {
        url: 'goodsBrand/deleteCategory',
        method: 'get',
        controllerName: 'removes',
        details: '删除品牌',
    }],
    fontApi: [{
        url: 'goodsBrand/getList',
        method: 'get',
        controllerName: 'list',
        details: '获取品牌列表',
    }],
    initData: '', // 初始化数据脚本
    pluginsConfig: ` 
    module.exports = {\n
        enable: true,\n        package: 'egg-goods-brand',    
    };\n
    `, // 插入到 plugins.js 中的配置
    defaultConfig: `
    module.exports = {\n
        match: [ctx => ctx.path.startsWith('/manage/goodsBrand'), ctx => ctx.path.startsWith('/api/goodsBrand')],\n
    },\n
    `, // 插入到 config.default.js 中的配置
}