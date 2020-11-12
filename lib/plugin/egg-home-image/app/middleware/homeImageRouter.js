const _ = require('lodash');
const HomeImageController = require('../controller/manage/homeimage');

module.exports = (options, app) => {

    // console.log("homeImageRouter")

    return async function homeImageRouter(ctx, next) {

        let pluginConfig = app.config.eggHomeImage;
        await app.initPluginRouter(ctx, pluginConfig, HomeImageController);
        await next();

    }

}