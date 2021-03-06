/*
 * @Author: doramart 
 * @Date: 2019-06-24 13:20:49 
 * @Last Modified by: doramart
 * @Last Modified time: 2020-08-31 00:10:28
 */

'use strict';
const Service = require('egg').Service;
const path = require('path')

// general是一个公共库，可用可不用
const {
    _list, 
    _create
} = require(path.join(process.cwd(), 'app/service/general'));


class HomeImageService extends Service {

    async find(payload, {
        query = {},
        searchKeys = [],
        include = [],
        attributes = null
    } = {}) {
 
        let listdata = _list(this, this.ctx.model.Homeimage, payload, {
            query: query,
            searchKeys: searchKeys,
            include: include,
            attributes
        });
        
        return listdata;

    }

    async create(payload) {
        return _create(this, this.ctx.model.Homeimage, payload);
    }
 

}

module.exports = HomeImageService;