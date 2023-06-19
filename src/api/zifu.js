import request from '@/utils/request'

// 获取拼音首字母
export function getFirstLetter(query) {
    return request({
        url: '/zifu/getFirstLetter',
        method: 'get',
        headers: {
            isToken: false
        },
        params: query,
    })
}

// 获取拼音
export function getPinyin(query) {
    return request({
        url: '/zifu/getPinyin',
        method: 'get',
        headers: {
            isToken: false
        },
        params: query,
    })
}

// 驼峰转下滑
export function toUnderlineCase(query) {
    return request({
        url: '/zifu/toUnderlineCase',
        method: 'get',
        headers: {
            isToken: false
        },
        params: query,
    })
}

// 下划线转驼峰
export function toCamelCase(query) {
    return request({
        url: '/zifu/toCamelCase',
        method: 'get',
        headers: {
            isToken: false
        },
        params: query,
    })
}