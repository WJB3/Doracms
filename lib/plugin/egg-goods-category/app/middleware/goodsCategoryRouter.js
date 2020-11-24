const _ = require('lodash');
const GoodsCategoryController = require('../controller/manage/goodsCategory');
const GoodsApiCategoryController = require('../controller/api/goodsCategory');

module.exports = (options, app) => {

    return async function goodsCategoryRouter(ctx, next) {

        let pluginConfig = app.config.eggGoodsCategory;
        await app.initPluginRouter(ctx, pluginConfig, GoodsCategoryController,GoodsApiCategoryController);
        await next();

    }

}