import storage from 'good-storage'

const ROLES_KEY = '__roles__'

const PERMISSIONS_KEY = '__permissions__'

function insertArray(arr, val, compare) {
  const index = arr.findIndex(compare)
  if (index === 0) {
    return
  }
  if (index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(val)
}

export function saveRoles(querys) {
  let roles = storage.get(ROLES_KEY, [])
  for (let i = 0; i < querys.length; i++) {
    insertArray(roles, querys[i], (item) => {
      return item === querys[i]
    })
  }
  storage.set(ROLES_KEY, roles)
  return roles
}

export function clearRoles() {
  storage.remove(ROLES_KEY)
  return []
}

export function loadRoles() {
  return storage.get(ROLES_KEY, [])
}

export function savePermissions(querys) {
  let permissions = storage.get(PERMISSIONS_KEY, [])
  for (let i = 0; i < querys.length; i++) {
    insertArray(permissions, querys[i], (item) => {
      return item === querys[i]
    })
  }
  storage.set(PERMISSIONS_KEY, permissions)
  return permissions
}

export function clearPermissions() {
  storage.remove(PERMISSIONS_KEY)
  return []
}

export function loadPermissions() {
  return storage.get(PERMISSIONS_KEY, [])
}
