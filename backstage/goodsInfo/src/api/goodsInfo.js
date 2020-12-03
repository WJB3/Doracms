import request from '@root/publicMethods/request'

export function getList(params) {
  return request({
    url: '/manage/goodsInfo/getList',
    method: 'get',
    params
  })
}

export function getOneAd(params) {
  return request({
    url: '/manage/goodsInfo/getOne',
    method: 'get',
    params
  })
}

export function addOneAd(data) {
  return request({
    url: '/manage/goodsInfo/addOne',
    method: 'post',
    data
  })
}

export function updateAds(data) {
  return request({
    url: '/manage/goodsInfo/updateOne',
    method: 'post',
    data
  })
}

export function delAds(params) {
  return request({
    url: '/manage/goodsInfo/delete',
    method: 'get',
    params
  })
}

export function getCategoryList(params){
  return request({
    url: '/manage/goodsCategory/getList',
    params,
    method: 'get'
  })
}

export function getBrandList(params){
  return request({
    url: '/manage/goodsBrand/getList',
    params,
    method: 'get'
  })
}