/**
 * Created by Administrator on 2017/4/15.
 * 广告管理
 */
'use strict'

const moment = require('moment');
module.exports = app => {
    const {
        DATE,
        STRING, 
        INTEGER,
        VIRTUAL
    } = app.Sequelize;
    const GoodsCategory = app.model.define('goods_category', {
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
        parentId: {
            type: STRING,
            defaultValue: '0'
        },
        background: {
            type: STRING, 
        },
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
        tableName: 'egg_goods_category',
        underscored: true,
    });
 
    GoodsCategory.sync({
        force: false
    });

    return GoodsCategory;
};
