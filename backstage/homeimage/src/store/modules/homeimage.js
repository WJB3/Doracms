import * as types from '../types.js';
import {
  getHomeImageList,
} from '@/api/homeimage';
import _ from 'lodash';

const state = {
  list: {
    pageInfo: {},
    docs: []
  },
  infoFormState: {
    edit: false,
    name:"",
    imgList:[],
    type:"1"
  },
  itemFormState: {
    edit: false,
    show:false,
    img:""
  },
   
}

const mutations = {
  [types.ADS_LIST](state, list) {
    state.list = list
  },
  [types.INFO_FORMSTATE](state, formState) { 
    state.infoFormState.imgList = Object.assign({
      
    }, formState.imgList);
  },
  [types.ITEM_FORMSTATE](state, formState) {
    state.itemFormState.edit = formState.edit;
    state.itemFormState.show = formState.show;
    state.itemFormState.img = formState.img;
  },
  [types.ADD_IMAGE](state,formState){
    let list=state.infoFormState.imgList
    let item=list[list.length-1]||0
    state.infoFormState.imgList.push({_id:item._id,link:formState.img})
    state.infoFormState.imgList = state.infoFormState.imgList; 
  }
   
}

const actions = {

  getHomeImageList({
    commit
  }, params = {}) { 
    getHomeImageList(params).then((result) => {
      console.log(result.data)
      commit(types.ADS_LIST, result.data)
    })
  },
  homeimageInfoForm: ({
    commit
  }, params = {}) => {
    commit(types.INFO_FORMSTATE,params)
  },
  addImage:({commit},params={})=>{ 
    commit(types.ADD_IMAGE, { 
      img:params.img
    })
  },
  showItemForm: ({
    commit
  }, params = {
    edit: false
  }) => {
    commit(types.ITEM_FORMSTATE, {
      show: true,
      edit: params.edit, 
      img:""
    })
  },
  hideItemForm: ({
    commit
  }) => {
    commit(types.ITEM_FORMSTATE, {
      show: false
    })
  },

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}