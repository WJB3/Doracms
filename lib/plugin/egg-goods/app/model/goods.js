'use strict'

const moment = require('moment');

module.exports = app => {
    const {
        DATE,
        STRING, 
        INTEGER,
        VIRTUAL, 
        FLOAT
    } = app.Sequelize;
    const Goods = app.model.define('goods', {
        id: {
            type: INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        _id: {
            type: VIRTUAL,
            get() {
                return this.id;
            },
            set(value) {
                throw new Error('not set!');
            }
        },
        name: STRING,
        model:STRING,
        brand_id: INTEGER,
        unit:STRING,
        category_id:INTEGER,
        category_list:STRING,
        is_work:INTEGER , 
        mark_price:FLOAT, 
        imgList:STRING,
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
    }, {
        freezeTableName: true,
        tableName: 'egg_goods',
        underscored: true,
    });
    
    Goods.associate = function () {
        app.model.Goods.hasMany(app.model.GoodsBrand, {
            foreignKey: 'id',
            sourceKey: 'brand_id',
            as: "brand_items"
        });
    }


    Goods.sync({
        force: false
    });

    return Goods;
};
