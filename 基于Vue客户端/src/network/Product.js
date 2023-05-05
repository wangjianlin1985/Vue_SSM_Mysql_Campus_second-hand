// 商品信息业务处理
import request from './request'
import qs from 'qs'

/* 根据查询条件分页查询商品信息 */
export function queryProduct(productClassObj_classId, productName, oldLevel_levelId, priceRegionObj_regionId, areaObj_areaId, connectPerson, connectPhone, userObj_user_name, addTime, page) {
    return request({
        url: '/product/list',
        method: "POST",
        params: {
            "productClassObj.classId": productClassObj_classId,
            "productName": productName,
            "oldLevel.levelId": oldLevel_levelId,
            "priceRegionObj.regionId": priceRegionObj_regionId,
            "areaObj.areaId": areaObj_areaId,
            "connectPerson": connectPerson,
            "connectPhone": connectPhone,
            "userObj.user_name": userObj_user_name,
            "addTime": addTime,
            "page": page,
            "rows": 10
        }
    })
}


/* 根据查询条件分页查询商品信息 */
export function userQueryProduct(productClassObj_classId, productName, oldLevel_levelId, priceRegionObj_regionId, areaObj_areaId, connectPerson, connectPhone, addTime, page) {
    return request({
        url: '/product/userList',
        method: "POST",
        params: {
            "productClassObj.classId": productClassObj_classId,
            "productName": productName,
            "oldLevel.levelId": oldLevel_levelId,
            "priceRegionObj.regionId": priceRegionObj_regionId,
            "areaObj.areaId": areaObj_areaId,
            "connectPerson": connectPerson,
            "connectPhone": connectPhone,
            "addTime": addTime,
            "page": page,
            "rows": 10
        }
    })
}


/* 查询所有的商品信息*/
export function queryAllProduct() {
    return request({
        url: '/product/listAll',
        method: "POST",
    })
}

/* 添加商品信息 */
export function addProduct(product) {
    return request({
        url: '/product/add',
        method: "POST",
        data: qs.stringify(product),
        headers: { //添加请求头
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    })
}

/* 更新商品信息 */
export function updateProduct(product) {
    return request({
        url: '/product/update',
        method: "POST",
        data: qs.stringify(product),
        headers: { //添加请求头
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    })
}

/* 根据主键商品id查询商品信息 */
export function getProduct(productId) {
    return request({
        url: '/product/get/' + productId,
        method: "POST"
    })
}

/* 根据主键productId删除商品 */
export function deleteProduct(productId) {
    return request({
        url: '/product/delete/' + productId,
        method: "POST",
    })
}
