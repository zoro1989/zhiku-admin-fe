/**
 * Created by zhulin on 2017/7/9.
 */
const uris = {
  welcome: {
    userinfo: '/welcome/userinfo.tkm',
    updateSelf: '/welcome/updateSelf.tkm',
    updatePswd: '/welcome/updatePswd.tkm'
  },
  user: {
    logout: '/user/logout.tkm',
    submitLogin: '/user/submitLogin.tkm',
    subRegister: '/user/subRegister.tkm'
  },
  member: {
    list: '/member/list.tkm',
    deleteUserById: '/member/deleteUserById.tkm',
    forbidUserById: '/member/forbidUserById.tkm'
  },
  push: {
    send: '/push/send.tkm'
  },
  role: {
    getPermissionTree: '/role/getPermissionTree.tkm',
    clearRoleByUserIds: '/role/clearRoleByUserIds.tkm',
    allocation: '/role/allocation.tkm',
    selectRoleByUserId: '/role/selectRoleByUserId.tkm',
    addRole2User: '/role/addRole2User.tkm',
    index: '/role/index.tkm',
    deleteRoleById: '/role/deleteRoleById.tkm',
    addRole: '/role/addRole.tkm'
  },
  permission: {
    index: '/permission/index.tkm',
    allocation: '/permission/allocation.tkm',
    selectPermissionById: '/permission/selectPermissionById.tkm',
    addPermission2Role: '/permission/addPermission2Role.tkm',
    deletePermissionById: '/permission/deletePermissionById.tkm',
    addPermission: '/permission/addPermission.tkm',
    clearPermissionByRoleIds: '/permission/clearPermissionByRoleIds.tkm'
  },
  common: {
    getVCode: '/common/getVCode.tkm'
  },
  ebook: {
    list: '/ebook/list.tkm',
    selectTipById: '/ebook/selectTipById.tkm',
    saveTip: '/tips/addTip.tkm'
  },
  category: {
    index: '/category/index.tkm',
    deleteCategoryById: '/category/deleteCategoryById.tkm',
    save: '/category/save.tkm',
    selectCategoryById: '/category/selectCategoryById.tkm',
    selectCategoryParents: '/category/selectCategoryParents.tkm',
    uploadImage: '/category/uploadImage.tkm'
  },
  info: {
    list: '/info/list.tkm',
    selectInfoById: '/info/selectInfoById.tkm',
    save: '/info/save.tkm',
    deleteInfoById: '/info/deleteInfoById.tkm',
    selectInfoParents: '/info/selectInfoParents.tkm'
  }
}
export default uris
