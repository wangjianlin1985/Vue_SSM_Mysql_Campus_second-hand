// 商品类别信息业务处理
import request from './request'
import qs from 'qs'

/* 根据查询条件分页查询商品类别信息 */
export function queryProductClass(page) {
    return request({
        url: '/productClass/list',
        method: "POST",
        params: {
            "page": page,
            "rows": 10
        }
    })
}

/* 查询所有的商品类别信息*/
export function queryAllProductClass() {
    return request({
        url: '/productClass/listAll',
        method: "POST",
    })
}

/* 添加商品类别信息 */
export function addProductClass(productClass) {
    return request({
        url: '/productClass/add',
        method: "POST",
        data: qs.stringify(productClass),
        headers: { //添加请求头
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    })
}

/* 更新商品类别信息 */
export function updateProductClass(productClass) {
    return request({
        url: '/productClass/update',
        method: "POST",
        data: qs.stringify(productClass),
        headers: { //添加请求头
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    })
}

/* 根据主键类别id查询商品类别信息 */
export function getProductClass(classId) {
    return request({
        url: '/productClass/get/' + classId,
        method: "POST"
    })
}

/* 根据主键classId删除商品类别 */
export function deleteProductClass(classId) {
    return request({
        url: '/productClass/delete/' + classId,
        method: "POST",
    })
}
