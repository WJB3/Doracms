


/**
 * 品牌管理
 */

'use strict'

const moment=require("moment");

module.exports=app=>{

    const {
        DATE,
        STRING,
        INTEGER,
        VIRTUAL
    }=app.Sequelize;

    const GoodsBrand=app.model.define("goods_brand",{
        id:{
            type:INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true
        },
        _id:{
            type:VIRTUAL,
            get(){
                return this.id;
            },
            set(value){
                throw new Error("not set!");
            } 
        },
        name:STRING,
        code:STRING,
        business:STRING,
        attribution:STRING,
        sortId:STRING,
        img:STRING,
        createdAt: {
            type: DATE,
            get() {
                return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
            }
        },
        updatedAt: {
            type: DATE,
            get() {
                return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss');
            }
        }
    },{
        freezeTableName: true,
        tableName: 'egg_goods_brand',
        underscored: true,
    });

    GoodsBrand.sync({
        force:false
    });

    return GoodsBrand;

}