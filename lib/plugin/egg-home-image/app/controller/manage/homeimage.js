const _ = require('lodash');

const rule = (ctx) => {
    return {
        name: {
            type: "string",
            required: true, 
            message: "首页图片名称不能为空"
        },
        imgList: {
            type: "string",
            required: true, 
            message: "首页图片不能为空"
        }
    }
}
 
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
    async create(ctx, app) { 
 
        try {

            let fields = ctx.request.body || {};
            const formObj = {
                name: fields.name, 
                imgList: fields.imgList&&fields.imgList.length>0?JSON.stringify(fields.imgList):""
            }  
            ctx.validate(rule(ctx), formObj);


            let newAds = await ctx.service.homeimage.create(formObj);
         
            // formObj.items = itemIdArr;


            ctx.helper.renderSuccess(ctx);

        } catch (err) {
            ctx.helper.renderFail(ctx, {
                message: err
            });
        }
    },
}

module.exports = HomeImageController;