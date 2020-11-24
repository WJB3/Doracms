const _ = require('lodash');

const goodsCategoryRule = (ctx) => {
    return {
        name: {
            type: "string",
            required: true,
            min: 2,
            max: 20,
            message: "表单验证有误"
        },
    }
}



let GoodsInfoController = {

    async list(ctx, app) {

        try {
 

            let payload = ctx.query;
            let queryObj = {};

            let categoryParams = _.assign({}, payload, {
                isPaging: '0'
            })
            let goodsCategoryList = await ctx.service.goodsInfo.find(payload, {
                searchKeys: ['name'],
                query: queryObj
            });

            ctx.helper.renderSuccess(ctx, {
                data: goodsCategoryList
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
                goodsList: fields.goodsList,
                categoryId: fields.categoryId
            }

            // ctx.validate(goodsCategoryRule(ctx), formObj);

            let cateObj = await ctx.service.goodsInfo.create(formObj);

            ctx.helper.renderSuccess(ctx);

        } catch (err) {
            ctx.helper.renderFail(ctx, {
                message: err
            });
        }
    },



    async getOne(ctx, app) {

        try {
            let id = ctx.query.id;

            let targetItem = await ctx.service.goodsInfo.item({
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

    async alllist(ctx, app) {
        return await ctx.service.goodsInfo.find({
            isPaging: '0'
        })
    },


    async update(ctx, app) {


        try {

            let fields = ctx.request.body || {};
            const formObj = {
                name: fields.name,
                keywords: fields.keywords,
                sortId: fields.sortId,
                parentId: fields.parentId,
                enable: fields.enable,
                defaultUrl: fields.defaultUrl,
                content_temp: fields.content_temp,
                sortPath: fields.sortPath,
                comments: fields.comments,
                sImg: fields.sImg,
                cate_type: fields.cate_type
            }

            // 针对子类自动继承父类的模板
            if (fields.parentId == '0' && fields.content_temp) {
                await ctx.service.goodsInfo.updateMany('', {
                    content_temp: fields.content_temp
                }, {
                    'parentId': fields.id
                })
            }

            ctx.validate(goodsCategoryRule(ctx), formObj);

            await ctx.service.goodsInfo.update(fields.id, formObj);
            await app.getRoutes(ctx, 'update');
            ctx.helper.renderSuccess(ctx);

        } catch (err) {

            ctx.helper.renderFail(ctx, {
                message: err
            });

        }

    },


    async removes(ctx, app) {

        try {
            let targetIds = ctx.query.ids;


            // 删除主分类
            await ctx.service.goodsInfo.removes(targetIds);
            // 删除子类
            await ctx.service.goodsInfo.removes(targetIds, 'parentId');
            await app.getRoutes(ctx, 'update');
            ctx.helper.renderSuccess(ctx);


        } catch (err) {

            ctx.helper.renderFail(ctx, {
                message: err
            });
        }
    }

}

module.exports = GoodsInfoController;