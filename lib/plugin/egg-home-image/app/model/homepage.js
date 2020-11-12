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
    const Homeimage = app.model.define('homepage', {
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
        link:STRING,
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
        tableName: 'egg_home_image',
        underscored: true,
    });
 
    Homeimage.sync({
        force: false
    });

    return Homeimage;
};
