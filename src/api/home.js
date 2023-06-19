import request from '@/utils/request'

export function getSongChart(data, chartType) {
    const url = '/blog/song/chart/' + chartType
    return request({
        url: url,
        method: 'get',
        headers: {
            isToken: false
        },
        params: data
    })
}