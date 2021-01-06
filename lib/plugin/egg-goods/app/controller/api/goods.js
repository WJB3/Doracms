/*
 * @Author: doramart 
 * @Date: 2019-09-26 09:19:25 
 * @Last Modified by: doramart
 * @Last Modified time: 2020-08-22 23:58:57
 */
const _ = require('lodash');

 

let GoodsController = {

    async get(ctx, app) {

        try {
            let id = ctx.query.id;

            if (!id) {
                throw new Error(ctx.__('validate_error_params'));
            } 

            let targetItem = await ctx.service.goods.item({
                query: { 
                    id, 
                },
                include: [{
                    as: 'brand_items',
                    model: 'GoodsBrand'
                }]
            });

            ctx.helper.renderSuccess(ctx, {
                data: targetItem
            });

        } catch (err) {
            ctx.helper.renderFail(ctx, {
                message: err
            });
        }

    },
    async list(ctx,app){

        try{
        
            let payload = ctx.query;
            

            let params = _.assign({}, payload )
            let goodsList = await ctx.service.goods.find(params ,{
                include: [{
                    as: 'brand_items',
                    model: 'GoodsBrand'
                }]
            });

            ctx.helper.renderSuccess(ctx, {
                data: goodsList
            });
        }catch(err){
            ctx.helper.renderFail(ctx,{
                message:err
            });
        }
    }

}

module.exports = GoodsController;