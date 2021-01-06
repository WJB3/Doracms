
const _=require("lodash");


const GoodsController=require("../controller/manage/goods");
const GoodsApiController=require("../controller/api/goods");

module.exports=(options,app)=>{

    return async function goodsRouter(ctx,next){
        let pluginConfig=app.config.eggGoods;
        await app.initPluginRouter(ctx, pluginConfig, GoodsController,GoodsApiController);
        await next();
    }

}