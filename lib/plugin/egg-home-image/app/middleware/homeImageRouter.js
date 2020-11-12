const _ = require('lodash');
const homeimageAdminController = require('../controller/manage/homeimage');

module.exports = (options, app) => {

    return async function homeImageRouter(ctx, next) {

        let pluginConfig = app.config.eggHomeImage;
        await app.initPluginRouter(ctx, pluginConfig, homeimageAdminController);
        await next();

    }

}