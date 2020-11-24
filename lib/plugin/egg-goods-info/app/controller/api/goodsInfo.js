const _ = require('lodash');
 
 
let GoodsInfoController = {


    async list(ctx, app) { 

        
        console.log("GoodsInfoController list");

        try {

            let payload = ctx.query; 
            console.log(payload)
            let goodsList = await ctx.service.goodsInfo.find(payload); 

            ctx.helper.renderSuccess(ctx, {
                data: goodsList
            });

        } catch (err) {

            ctx.helper.renderFail(ctx, {
                message: err
            });

        }
    }, 
   
}

module.exports = GoodsInfoController;