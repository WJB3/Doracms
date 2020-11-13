const _ = require('lodash');
 
let HomeImageController = {

    async list(ctx, app) {
 

        try {

            let payload = ctx.query; 
            let homeImageList = await ctx.service.homeimage.find(payload); 

            ctx.helper.renderSuccess(ctx, {
                data: homeImageList
            });

        } catch (err) {

            ctx.helper.renderFail(ctx, {
                message: err
            });

        }
    }, 
}

module.exports = HomeImageController;