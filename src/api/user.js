// 用户接口封装
import request from '@/utils/request'

export const getUserList = ({ pagenum = 1, pagesize = 5 ,query = ''}) => {
  return request({
    method: 'GET',
    url: '/users',
    params: {
      pagenum,
      pagesize,
      query      //模糊查询用户名
    }
  }).then(res => res.data)
}

/**
 * 添加用户
*/
export const addUser = ({ username, password, email, mobile }) => {
  return request({
    method: 'POST',
    url: '/users',
    data: {
      username,
      password,
      email,
      mobile
    }
  }).then(res => res.data)
}

/**
 * 修改用户状态
 *
*/
export const changeState = (id,state) => request({
  method: 'PUT',
  url: `users/${id}/state/${state}`

}).then(res => res.data)

/**
 * 删除用户
 */
export const deleteById = id => request({
  method: 'DELETE',
  url: `users/${id}`
}).then(res => res.data)

/**
 * 根据id查询用户信息
*/

export const getById = id => request({
  method: 'GET',
  url: `users/${id}`
}).then(res => res.data)

/**
 * 根据id修改用户信息
*/

export const updateById = ( id,data ) => request({
  method: 'PUT',
  url: `users/${id}`,
  data: {
    // put 和 post一样
    email: data.email,
    mobile: data.mobile
  }
}).then(res => res.data)
