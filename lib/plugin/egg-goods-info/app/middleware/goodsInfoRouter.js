const _ = require('lodash');
const GoodsInfoController = require('../controller/manage/goodsInfo');
const GoodsApiCategoryController = require('../controller/api/goodsInfo');

module.exports = (options, app) => {

    return async function goodsCategoryRouter(ctx, next) {

        let pluginConfig = app.config.eggGoodsInfo;
        await app.initPluginRouter(ctx, pluginConfig, GoodsInfoController,GoodsApiCategoryController);
        await next();

    }

}