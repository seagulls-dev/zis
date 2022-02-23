import { createHash } from 'crypto'
import { RolePermissionDetails } from 'pages/role/models'
import { UserDetails } from 'pages/user/models'

export const hash256 = (txt: string) => {
  return createHash('sha256').update(txt).digest('hex')
}
export const hash512 = (txt: string) => {
  return createHash('sha512').update(txt).digest('hex')
}

export const storeCurrentUser = (token: {}) =>
  localStorage.setItem('currentUser', JSON.stringify(token))

export const removeCurrentUser = () => localStorage.removeItem('currentUser')

export const currentUser = (): string | null => {
  const token = localStorage.getItem('currentUser')
  return token && JSON.parse(token)
}

export const isAllowedHelper = (
  rule: string[],
  self?: UserDetails,
  rolesPermissions?: RolePermissionDetails[],
) => {
  //version 2
  // const result = self?.roles.some((item:string) => {
  //   const rolePermission = rolesPermissions?.find(i => i.role === item)
  //   return rule?.some((subitem:string) => {
  //     return rolePermission?.services.includes(subitem)
  //   })
  // })
  //version 3
  if (rule?.includes('*') || self?.roles?.includes('zcom-root')) {
    return true
  }
  const result = self?.roles?.some((item:string) => rule?.includes(item))
  //version 1
  // const permission = rolesPermissions?.find((permissions) =>
  //   rule?.some((i) => permissions.services.includes(i)),
  // )
  // return permission && self.roles && self.roles.includes(permission.role)
  return result
}

export const hasRoleHelper = (self: UserDetails, role) =>
  self?.roles?.includes(role)

export const isZcomNavHelper = (self?: UserDetails) => {
  const roles = self?.roles
  return !!(roles?.includes('zcom-root') || roles?.includes('zcom-admin'));
}

export const isNavAllowHelper = (self?: UserDetails, menu_roles?: string[]) => {
  const roles = self?.roles
  return menu_roles?.some((item:string) => roles?.includes(item))
}
