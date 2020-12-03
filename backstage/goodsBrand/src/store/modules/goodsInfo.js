import * as types from '../types.js';
import {
  getList,
} from '@/api/goodsInfo';
import _ from 'lodash';

const state = {
  list: {
    pageInfo: {},
    docs: []
  },
  infoFormState: {
    edit: false,
    category1:"",
    category2:"",
    category3:"",
    goodsList:[]
  },
  itemFormState: {
    show: false,
    edit: false,
    formData: {
      name:"",
      sImg: ''
    }
  },
}

const mutations = {
  [types.ADS_LIST](state, list) {
    state.list = list
  },
  [types.ADS_INFO_FORMSTATE](state, formState) {
    state.infoFormState.edit = formState.edit;
    state.infoFormState.formData = Object.assign({
      name: '',
      sImg:"",
    }, formState.formData);
    state.infoFormState.goodsList = formState.goodsList;
  },
  [types.ADS_ITEM_FORMSTATE](state, formState) {
    state.itemFormState.edit = formState.edit;
    state.itemFormState.show = formState.show;
    state.itemFormState.formData = Object.assign({
      name:"",
      sImg: '',
    }, formState.formData);
  },
}

const actions = {

  getList({
    commit
  }, params = {}) {
    getList(params).then((result) => {
      commit(types.ADS_LIST, result.data)
    })
  },
  infoForm: ({
    commit
  }, params = {}) => {
    commit(types.ADS_INFO_FORMSTATE, {
      edit: params.edit,
      formData: params.formData,
      goodsList:params.goodsList
    })
  },
  showItemForm: ({
    commit
  }, params = {
    edit: false,
    formData: {}
  }) => {
    commit(types.ADS_ITEM_FORMSTATE, {
      show: true,
      edit: params.edit,
      formData: params.formData
    })
  },
  hideItemForm: ({
    commit
  }) => {
    commit(types.ADS_ITEM_FORMSTATE, {
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