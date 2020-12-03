import * as types from '../types.js';
import {
  goodsCategoryList,
} from '@/api/goodsCategory';
import _ from 'lodash';
import {
  renderTreeData
} from '@/utils';

const state = {
  formState: {
    type: 'root',
    show: false,
    edit: false,
    formData: {
      label: '',  
      parentId: '',   
      name: '',
      parentObj:{},
      sortId:0
    }
  },
  categoryList: {
    pageInfo: {},
    docs: []
  },
}

const mutations = {
  [types.CONTENTCATEGORYS_FORMSTATE](state, formState) {
    state.formState.show = formState.show;
    state.formState.edit = formState.edit;
    state.formState.type = formState.type;
    state.formState.formData = Object.assign({
      name: '', 
      parentId: '',
      parentObj: {}, 
    }, formState.formData);

  },
  [types.CONTENTCATEGORYS_LIST](state, categoryList) {
    state.categoryList = categoryList
  },
}

const actions = {

  showGoodsCategoryForm: ({
    commit
  }, params = {
    type: 'root',
    edit: false,
    formData: {}
  }) => {
    commit(types.CONTENTCATEGORYS_FORMSTATE, {
      show: true,
      type: params.type,
      edit: params.edit,
      formData: params.formData
    })
  },
  hideGoodsCategoryForm: ({
    commit
  }) => {
    commit(types.CONTENTCATEGORYS_FORMSTATE, {
      show: false
    })
  },
  getGoodsCategoryList({
    commit
  }, params = {}) {
    goodsCategoryList(params).then((result) => {
     
      let treeData = renderTreeData({
        docs: result.data
      }); 
      commit(types.CONTENTCATEGORYS_LIST, treeData)
    })
  },

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}