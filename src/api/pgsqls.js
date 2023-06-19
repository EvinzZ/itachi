import request from '@/utils/request'

// ddl语句生成insert插入语句
export function ddlGenInsertSql(data) {
    return request({
        url: '/pgsql/ddlGenInsertSql',
        method: 'post',
        headers: {
            isToken: false
        },
        data: data
    })
}

// ddl语句生成实体
export function ddlGenEntity(data) {
    return request({
        url: '/pgsql/ddlGenEntity',
        method: 'post',
        headers: {
            isToken: false
        },
        data: data
    })
}

// ddl语句生成updateById sql
export function ddlGenUpdateSql(data) {
    return request({
        url: '/pgsql/ddlGenUpdateSql',
        method: 'post',
        headers: {
            isToken: false
        },
        data: data
    })
}