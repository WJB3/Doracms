
const _=require("lodash"); 

let GoodsController={
    async list(ctx,app){
        try { 

            let payload = ctx.query;
            let queryObj = {};

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

        } catch (err) {

            ctx.helper.renderFail(ctx, {
                message: err
            });

        }

    },
    async create(ctx, app) {
        try {

            let fields = ctx.request.body || {}; 
            const formObj = {
                 name:fields.name,
                 model:fields.model,
                 brand_id:fields.brand_id,
                 unit:fields.unit,
                 category_id:fields.category_id,
                 is_work:fields.is_work,
                 mark_price:fields.mark_price,
                 imgList:fields.imgList,
                 category_list:fields.category_list
            } 

            let cateObj = await ctx.service.goods.create(formObj);

            ctx.helper.renderSuccess(ctx);

        } catch (err) {
            ctx.helper.renderFail(ctx, {
                message: err
            });
        }
    },
    async get(ctx, app) {

        try {
            let id = ctx.query.id;

            let targetItem = await ctx.service.goods.item({
                query: {
                    id: id
                }
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
    async update(ctx, app) {
        try {

            let fields = ctx.request.body || {};
            const formObj = {
                name:fields.name,
                model:fields.model,
                brand_id:fields.brand_id,
                unit:fields.unit,
                category_id:fields.category_id,
                is_work:fields.is_work,
                mark_price:fields.mark_price,
                imgList:fields.imgList,
                category_list:fields.category_list
           }  

            await ctx.service.goods.update(fields.id, formObj);
            await app.getRoutes(ctx, 'update');
            ctx.helper.renderSuccess(ctx);

        } catch (err) {

            ctx.helper.renderFail(ctx, {
                message: err
            });

        }

    },
    async remove(ctx, app) {

        try {
            let targetIds = ctx.query.ids;


            // 删除主分类
            await ctx.service.goods.removes(targetIds); 
            await app.getRoutes(ctx, 'update');
            ctx.helper.renderSuccess(ctx); 

        } catch (err) {

            ctx.helper.renderFail(ctx, {
                message: err
            });
        }
    }
}

module.exports = GoodsController;