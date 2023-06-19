import request from '@/utils/request'

export function listDaoOpsClient() {
    return request({
        url: '/dict/listDaoOpsClient',
        method: 'get',
        headers: {
            isToken: false
        },
    })
}

export function listDevLanOpsClient() {
    return request({
        url: '/dict/listDevLanOpsClient',
        method: 'get',
        headers: {
            isToken: false
        },
    })
}