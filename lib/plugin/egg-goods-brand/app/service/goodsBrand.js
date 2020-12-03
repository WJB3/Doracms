

'use strict';
const Service = require('egg').Service;
const path = require('path')
const _ = require('lodash'); 

const {
    _list,
    _count,
    _create, 
    _removes, 
}=require(path.join(process.cwd(),'app/service/general'));

class GoodsBrandService extends Service{

    async find(payload,{
        query={},
        searchKeys=[],
        include=[],
        attributes=null
    }={}){

        let listdata=_list(this,this.ctx.model.GoodsBrand,payload,{
            query:query,
            searchKeys:searchKeys,
            include:include,
            attributes
        });
        return listdata;
    }

    async count(params={}){
        return _count(this,this.ctx.model.GoodsBrand,params);
    }

    async create(payload){
        return _create(this,this.ctx.model.GoodsBrand,payload);
    }

    async removes(values,key='id'){
        return _removes(this,this.ctx.model.GoodsBrand,values,key);
    }

}


module.exports = GoodsBrandService;