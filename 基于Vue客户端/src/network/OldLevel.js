// 新旧程度信息业务处理
import request from './request'
import qs from 'qs'

/* 根据查询条件分页查询新旧程度信息 */
export function queryOldLevel(page) {
    return request({
        url: '/oldLevel/list',
        method: "POST",
        params: {
            "page": page,
            "rows": 10
        }
    })
}

/* 查询所有的新旧程度信息*/
export function queryAllOldLevel() {
    return request({
        url: '/oldLevel/listAll',
        method: "POST",
    })
}

/* 添加新旧程度信息 */
export function addOldLevel(oldLevel) {
    return request({
        url: '/oldLevel/add',
        method: "POST",
        data: qs.stringify(oldLevel),
        headers: { //添加请求头
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    })
}

/* 更新新旧程度信息 */
export function updateOldLevel(oldLevel) {
    return request({
        url: '/oldLevel/update',
        method: "POST",
        data: qs.stringify(oldLevel),
        headers: { //添加请求头
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    })
}

/* 根据主键新旧程度id查询新旧程度信息 */
export function getOldLevel(levelId) {
    return request({
        url: '/oldLevel/get/' + levelId,
        method: "POST"
    })
}

/* 根据主键levelId删除新旧程度 */
export function deleteOldLevel(levelId) {
    return request({
        url: '/oldLevel/delete/' + levelId,
        method: "POST",
    })
}
