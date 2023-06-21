import request from '@/utils/request'

export function getSong(id) {
    return request({
        url: '/blog/song/' + id,
        method: 'get',
        headers: {
            isToken: false
        },
    })
}

/**
 * 歌曲是否已经购买
 * @param blogId
 * @returns {*}
 */
export function getSongIsBuy(blogId) {
    const query = {
        blogId: blogId
    }
    return request({
        url: '/blog/song/buy',
        method: 'get',
        headers: {
            isToken: false
        },
        params: query
    })
}

/**
 * 购买歌曲下载权
 * @param blogId
 * @returns {*}
 */
export function buySong(blogId) {
    const data = {
        blogId: blogId
    }
    return request({
        url: '/blog/song/buy',
        method: 'post',
        headers: {
            isToken: false
        },
        data: data
    })
}

/**
 * 打赏帖子
 * @param data
 * @returns {*}
 */
export function rewardBlog(data) {
    return request({
        url: '/blog/song/reward',
        method: 'post',
        headers: {
            isToken: false
        },
        data: data
    })
}

/**
 * 评论帖子
 * @param data
 * @returns {*}
 */
export function blogComment(data) {
    return request({
        url: '/blog/comment',
        method: 'post',
        data: data
    })
}

/**
 * 获取评论列表
 * @param param
 * @returns {*}
 */
export function getBlogComment(param) {
    return request({
        url: '/blog/comment',
        method: 'get',
        headers: {
            isToken: false
        },
        params: param
    })
}

/**
 * 查询回复
 * @param param
 * @returns {*}
 */
export function getBlogCommentReply(param) {
    return request({
        url: '/blog/comment/reply',
        method: 'get',
        headers: {
            isToken: false
        },
        params: param
    })
}

/**
 * 点赞评论
 * @param param
 * @returns {*}
 */
export function blogCommentLike(param) {
    return request({
        url: '/blog/comment/like/' + param,
        method: 'post',
    })
}

/**
 * 点赞回复
 * @param param
 * @returns {*}
 */
export function blogCommentLikeReply(param) {
    return request({
        url: '/blog/comment/likeReply/' + param,
        method: 'post',
    })
}

/**
 * 回复评论
 * @param param
 * @returns {*}
 */
export function blogCommentReply(param) {
    return request({
        url: '/blog/comment/reply',
        method: 'post',
        data: param,
    })
}

/**
 * 点赞帖子
 * @param blogId
 * @returns {*}
 */
export function blogSongLike(blogId) {
    return request({
        url: '/blog/song/like/' + blogId,
        method: 'post',
    })
}

/**
 * 收藏帖子
 * @param blogId
 * @returns {*}
 */
export function blogSongStar(blogId) {
    return request({
        url: '/blog/song/star/' + blogId,
        method: 'post',
    })
}