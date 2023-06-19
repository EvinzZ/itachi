import request from '@/utils/request'

// 登录方法
export function login(username, password, code, uuid) {
  const data = {
    username,
    password,
    code,
    uuid
  }
  const param = {
    grant_type: 'password',
    scope: 'all',
    client_id: 'clientId',
    client_secret: 'secret',
    username: username,
    password: password,
    codeKey: uuid,
    verification: code,
  }
  return request({
    url: '/oauth/token',
    headers: {
      isToken: false
    },
    method: 'post',
    // data: data,
    params: param,
  })
}

// 注册方法
export function register(data) {
  return request({
    url: '/register',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}

// 获取用户详细信息
export function getInfo() {
  return request({
    url: '/user/userinfo',
    method: 'get'
  })
}

// 退出方法
export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

// 获取验证码
export function getCodeImg() {
  return request({
    url: '/user/code/image',
    headers: {
      isToken: false
    },
    method: 'get',
    timeout: 20000
  })
}