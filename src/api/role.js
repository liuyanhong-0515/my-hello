/**
 * 角色接口封装
 */

 /**
  * 获取角色
 */
import request from '@/utils/request'

export const getRoleList = () => request({
    method: 'GET',
    url: '/roles',

  }).then(res => res.data)

/**
 * 根据用户 id 修改用户角色
 * */
export const updateUserRoleByUserId = ( userId,roleId ) => request({
  method: 'PUT',
  url: `/users/${userId}/role`,
  data: {
    // put 和 post一样
    rid: roleId
  }
}).then(res => res.data)
