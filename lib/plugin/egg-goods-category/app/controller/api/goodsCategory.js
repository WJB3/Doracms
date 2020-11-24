const _ = require('lodash');
 
 
let controller = {

    async list(ctx, app) { 

        try {

            let payload = ctx.query; 
            let list = await ctx.service.goodsCategory.find(payload); 

            ctx.helper.renderSuccess(ctx, {
                data: list
            });

        } catch (err) {

            ctx.helper.renderFail(ctx, {
                message: err
            });

        }
    }, 
   
}

module.exports = controller;