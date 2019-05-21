import Vue from 'vue'

var apis = {
    //登录
    signin: '/signin',
    //角色管理
    deleteRole : '/system/role/deleteRole',//删除角色
    addNewRole : '/system/role/addNewRole',//新增角色
    updateRoleInfo : '/system/permission/updateRoleInfo',//更新角色信息
    findAllRoles : '/system/role/findAllRoles',//查询所有的角色
    findRoleInfoById : '/system/role/findRoleInfoById',//查询角色信息
    //用户账号管理
    deleteUser : '/system/user/deleteUser',//删除账号
    addNewUser : '/system/user/addNewUser',//新增用户
    updateUserInfo : '/system/user/updateUserInfo',//更新账号信息
    findUserInfoById : '/system/user/findUserInfoById',//查询用户信息
    findAllUsers : '/system/user/findAllUsers',//获取所有的账号
    //权限管理
    deletePermission : '/system/permission/deletePermission',//删除权限
    addNewPersmission : '/system/permission/addNewPersmission',//新增权限
    showAllPermission : '/system/permission/showAllPermission',//查询所有权限
    findPermissionById : '/system/permission/findPermissionById',//根据权限id查询权限信息
    //彩票管理
    addNewGame : '/gameManage/games/addNewGame', //更新彩票列表
    findAllGames : '/gameManage/games/findAllGames',//获取所有彩种
    findByGameName :'/gameManage/games/findByGameName',//获取指定彩种的彩票信息

}

Vue.prototype.$apis = apis;
export default apis