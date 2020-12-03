const _ = require('lodash');
const GoodsBrandController = require('../controller/manage/goodsBrand');
const GoodsApiBrandController = require('../controller/api/goodsBrand');

module.exports = (options, app) => {

    return async function goodsBrandRouter(ctx, next) {

        let pluginConfig = app.config.eggGoodsBrand;
        await app.initPluginRouter(ctx, pluginConfig, GoodsBrandController,GoodsApiBrandController);
        await next();

    }

}