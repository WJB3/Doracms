

const _=require("lodash");
const { list } = require("../api/goodsBrand");

let controller={

    async list(ctx,app){
        try{
            let payload=ctx.query;
            let queryObj = {};

            let goodsBrandList = await ctx.service.goodsBrand.find(payload, {
                query: queryObj
            });

            ctx.helper.renderSuccess(ctx, {
                data: goodsBrandList
            });

        }catch(err){
            ctx.helper.renderFail(ctx, {
                message: err
            });
        }
    },
    async create(ctx, app) {


        try {

            let fields = ctx.request.body || {};

            const formObj = {
                name: fields.name,
                code:fields.code,
                business:fields.business,
                attribution:fields.attribution,
                sortId:fields.sortId,
                img:fields.img,
                parentId: fields.parentId
            }

            // ctx.validate(goodsCategoryRule(ctx), formObj);

            let cateObj = await ctx.service.goodsBrand.create(formObj);

            ctx.helper.renderSuccess(ctx);

        } catch (err) {
            ctx.helper.renderFail(ctx, {
                message: err
            });
        }
    },
    async removes(ctx, app) {

        try { 

            await ctx.service.goodsBrand.removes(targetIds, 'parentId');
      
            ctx.helper.renderSuccess(ctx);


        } catch (err) {

            ctx.helper.renderFail(ctx, {
                message: err
            });
        }
    }

}

module.exports = controller;