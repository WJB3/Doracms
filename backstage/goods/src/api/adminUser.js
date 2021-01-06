import request from '@root/publicMethods/request'


export function adminUserList(params) {
  return request({
    url: '/manage/goods/getList',
    method: 'get',
    params
  })
}

export function getOneAdminUser(params) {
  return request({
    url: '/manage/goods/get',
    method: 'get',
    params
  })
}

export function addAdminUser(data) {
  return request({
    url: '/manage/goods/add',
    method: 'post',
    data
  })
}

export function updateAdminUser(data) {
  return request({
    url: '/manage/goods/update',
    method: 'post',
    data
  })
}

export function deleteAdminUser(params) {
  return request({
    url: '/manage/goods/delete',
    method: 'get',
    params
  })
}

export function getBrandList(params){
  //获取品牌
  return request({
    url: '/manage/goodsBrand/getList',
    params,
    method: 'get'
  })
}

//获取分类
export function getCategoryList(params){
  return request({
    url: '/manage/goodsCategory/getList',
    params,
    method: 'get'
  })
}

export function getCaList(params={}){
  return request({
    url: '/manage/goods/getList',
    params,
    method: 'get'
  })
}