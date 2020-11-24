const path = require('path');
class AppBootHook {


    constructor(app) {
        this.app = app;
    }

    beforeStart() {

    }

    configWillLoad() { 
        this.app.config.middleware.push('goodsInfoRouter'); 
    }

    async didLoad() {
        console.log("数据模型初始化")
        // 数据模型初始化
        var modelsPath = path.resolve(__dirname, './app/model');
        this.app.initExtendModel(modelsPath);
    }

    async willReady() {

    }
}

module.exports = AppBootHook;