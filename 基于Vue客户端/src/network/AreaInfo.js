// 所在区域信息业务处理
import request from './request'
import qs from 'qs'

/* 根据查询条件分页查询所在区域信息 */
export function queryAreaInfo(page) {
    return request({
        url: '/areaInfo/list',
        method: "POST",
        params: {
            "page": page,
            "rows": 10
        }
    })
}

/* 查询所有的所在区域信息*/
export function queryAllAreaInfo() {
    return request({
        url: '/areaInfo/listAll',
        method: "POST",
    })
}

/* 添加所在区域信息 */
export function addAreaInfo(areaInfo) {
    return request({
        url: '/areaInfo/add',
        method: "POST",
        data: qs.stringify(areaInfo),
        headers: { //添加请求头
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    })
}

/* 更新所在区域信息 */
export function updateAreaInfo(areaInfo) {
    return request({
        url: '/areaInfo/update',
        method: "POST",
        data: qs.stringify(areaInfo),
        headers: { //添加请求头
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    })
}

/* 根据主键区域id查询所在区域信息 */
export function getAreaInfo(areaId) {
    return request({
        url: '/areaInfo/get/' + areaId,
        method: "POST"
    })
}

/* 根据主键areaId删除所在区域 */
export function deleteAreaInfo(areaId) {
    return request({
        url: '/areaInfo/delete/' + areaId,
        method: "POST",
    })
}
