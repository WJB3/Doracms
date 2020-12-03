/*
 * @Author: doramart 
 * @Date: 2019-09-26 09:19:25 
 * @Last Modified by: doramart
 * @Last Modified time: 2020-08-22 23:58:57
 */
const _ = require('lodash');

async function hebing(ctx){
    let list=await ctx.service.ads.find(ctx.query);
  
    for(let i=0;i<list.length;i++){
        let targetItem = await ctx.service.ads.item({
            query: {
                id: list[i].id,
                state: true
            },
            include: [{
                as: 'items',
                model: 'AdsItems'
            }]
        });
        list[i]=targetItem;
    }
    return list;
}



let AdsController = {

    async getOne(ctx, app) {

        try {
            let name = ctx.query.name;

            if (!name) {
                throw new Error(ctx.__('validate_error_params'));
            }

            let targetItem = await ctx.service.ads.item({
                query: {
                    name: name,
                    state: true
                },
                include: [{
                    as: 'items',
                    model: 'AdsItems'
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
        
            let list=await hebing(ctx);
            ctx.helper.renderSuccess(ctx,{
                data:list
            })
        }catch(err){
            ctx.helper.renderFail(ctx,{
                message:err
            });
        }
    }

}

module.exports = AdsController;