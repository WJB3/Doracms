const _ = require('lodash');
const HomeImageController = require('../controller/manage/homeimage');
const HomeApiImageController = require('../controller/api/homeimage');

module.exports = (options, app) => {

    return async function homeImageRouter(ctx, next) {

        let pluginConfig = app.config.eggHomeImage;
        await app.initPluginRouter(ctx, pluginConfig, HomeImageController,HomeApiImageController);
        await next();

    }

}