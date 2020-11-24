import request from '@root/publicMethods/request'

export function goodsCategoryList(params) {
  return request({
    url: '/manage/goodsCategory/getList',
    params,
    method: 'get'
  })
}

export function getOneGoodsCategory(params) {
  return request({
    url: '/manage/goodsCategory/getOne',
    params,
    method: 'get'
  })
}

export function addGoodsCategory(data) {
  return request({
    url: '/manage/goodsCategory/addOne',
    data,
    method: 'post'
  })
}

export function updateGoodsCategory(data) {
  return request({
    url: '/manage/goodsCategory/updateOne',
    data,
    method: 'post'
  })
}

export function deleteGoodsCategory(params) {
  return request({
    url: '/manage/goodsCategory/deleteCategory',
    params,
    method: 'get'
  })
}