'use strict'

/**
 * egg-doras-ads default config
 * @member Config#eggDoraAds
 * @property {String} SOME_KEY - some description
 */

const pkgInfo = require('../package.json');
exports.eggHomeImage = {
    alias: 'homeimage', // 插件目录，必须为英文
    pkgName: 'egg-home-image', // 插件包名
    enName: 'eggHomeImage', // 插件名
    name: '首页图片管理', // 插件名称
    description: '首页图片管理', // 插件描述
    isadm: 1, // 是否有后台管理，1：有，0：没有，入口地址:'/ext/devteam/admin/index'
    isindex: 0, // 是否需要前台访问，1：需要，0：不需要,入口地址:'/ext/devteam/index/index'
    version: pkgInfo.version, // 版本号
    iconName: 'icon_shakehands_fill', // 主菜单图标名称
    adminUrl: '/homeimage/js/app.js',
    adminApi: [{
        url: 'homeimage/getList',
        method: 'get',
        controllerName: 'list',
        details: '获取首页图片列表',
    }], 
    fontApi: [{
        url: 'homeimage/getAppVersion',
        method: 'get',
        controllerName: 'list',
        details: '获取首页图片列表',
    }],
    initData: '', // 初始化数据脚本
    pluginsConfig: ` 
    module.exports = {\n
        enable: true,\n        package: 'egg-home-image',    
    };\n
    `, // 插入到 plugins.js 中的配置
    defaultConfig: `
    module.exports = {\n
        match: [ctx => ctx.path.startsWith('/manage/homeimage')
        ,\n
    },\n
    `, // 插入到 config.default.js 中的配置
}