// 价格区间信息业务处理
import request from './request'
import qs from 'qs'

/* 根据查询条件分页查询价格区间信息 */
export function queryPriceRegion(page) {
    return request({
        url: '/priceRegion/list',
        method: "POST",
        params: {
            "page": page,
            "rows": 10
        }
    })
}

/* 查询所有的价格区间信息*/
export function queryAllPriceRegion() {
    return request({
        url: '/priceRegion/listAll',
        method: "POST",
    })
}

/* 添加价格区间信息 */
export function addPriceRegion(priceRegion) {
    return request({
        url: '/priceRegion/add',
        method: "POST",
        data: qs.stringify(priceRegion),
        headers: { //添加请求头
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    })
}

/* 更新价格区间信息 */
export function updatePriceRegion(priceRegion) {
    return request({
        url: '/priceRegion/update',
        method: "POST",
        data: qs.stringify(priceRegion),
        headers: { //添加请求头
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    })
}

/* 根据主键区间id查询价格区间信息 */
export function getPriceRegion(regionId) {
    return request({
        url: '/priceRegion/get/' + regionId,
        method: "POST"
    })
}

/* 根据主键regionId删除价格区间 */
export function deletePriceRegion(regionId) {
    return request({
        url: '/priceRegion/delete/' + regionId,
        method: "POST",
    })
}
