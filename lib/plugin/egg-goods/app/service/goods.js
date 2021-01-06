

'use strict';
const Service = require('egg').Service;
const path = require('path')
const _ = require('lodash')

// general是一个公共库，可用可不用
const {
    _list, 
    _count,
    _create,
    _update, 
    _removes, 
    _item
} = require(path.join(process.cwd(), 'app/service/general'));

class GoodsService extends Service {
    async find(payload, {
        query = {},
        searchKeys = [],
        include = [],
        attributes = null
    } = {}) {

        let listdata = _list(this, this.ctx.model.Goods, payload, {
            query: query,
            searchKeys: searchKeys,
            include: include,
            attributes, 
            
        });
        return listdata; 
    }


    async count(params = {}) {
        return _count(this, this.ctx.model.Goods, params);
    }

    async create(payload) { 
        return _create(this, this.ctx.model.Goods, payload);
    }

    async removes(values, key = 'id') {
        return _removes(this, this.ctx.model.Goods, values, key);
    }

    async item(params = {}) {
        return _item(this, this.ctx.model.Goods, params)
    }

    async update(id, payload) {
        return _update(this, this.ctx.model.Goods, id, payload);
    }
 
}
    module.exports = GoodsService;