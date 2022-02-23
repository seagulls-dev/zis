import { ActionType, GroupActions } from './actions'
import { AsyncActionMode } from 'common/models'
import { GroupState } from './models'

const INITIAL_STATE: GroupState = {
  isLoading: false,
  error: undefined,
  data: undefined,
}

export default (
  state: GroupState = INITIAL_STATE,
  action: GroupActions,
): GroupState => {
  switch (action.type) {
    case ActionType.USER_GROUP:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isLoading: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          isLoading: false,
          data: action.data,
        }
      }
      if (action.mode === AsyncActionMode.ERROR) {
        return {
          ...state,
          isLoading: false,
          error: action.error,
          data: undefined
        }
      }
      break
    case ActionType.CREATE_USER_GROUP:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isLoading: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        const treeData = {
          ...action.data, users: [], roles: [], customer: action.parent
        }
        const update = (items) => {
          if (items && items.length > 0) {
            for (let child of items) {
              if (action.data && child.id === action.data.parent_id) {
                child.children = child.children ? [...child.children, treeData] : [treeData]
              }
              else if (child.children) {
                update(child.children)
              }
            }
          }
          else {
            children = [treeData]
          }
        }

        let children = state.data?.children ? state.data.children : []
        update(children)
        const updated = state.data ? {...state.data, children: children} : state.data

        return {
          ...state,
          isLoading: false,
          data: updated
        }
      }
      if (action.mode === AsyncActionMode.ERROR) {
        return {
          ...state,
          isLoading: false,
          error: action.error,
        }
      }
      break
    case ActionType.GET_USER_GROUP:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isLoading: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          isLoading: false,
          data: action.data,
        }
      }
      if (action.mode === AsyncActionMode.ERROR) {
        return {
          ...state,
          isLoading: false,
          error: action.error,
          data: undefined
        }
      }
      break
    case ActionType.GET_ROOT_GROUP:
      if (action.mode === AsyncActionMode.REQUEST) {
        return {...state, isLoading: true}
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {...state, isLoading: false, data: action.data}
      }
      if (action.mode === AsyncActionMode.ERROR) {
        return {...state, isLoading: false, error: action.error, data: undefined}
      }
      break
    case ActionType.GET_USER_GROUP_BY_PARENT:
      if (action.mode === AsyncActionMode.REQUEST) {
        return {...state, isLoading: true}
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        const update = (items) => {
          if (items && items.length > 0) {
            for (let child of items) {
              if (action.data && action.data.length > 0 && child.id === action.data[0].parent_id) {
                child.children = action.data
              }
              else if (child.children) {
                update(child.children)
              }
              else if (action.data.length === 0 && child.id === action.request.id) {
                child.children = [...child.users]
              }
            }
          }
          else {
            children = action.data
          }
        }
        let children = state.data?.children ? state.data.children : []
        update(children)
        const treeData = state.data ? {...state.data, children: children} : state.data
        return {
          ...state, isLoading: false, data: treeData
        }
      }
      if (action.mode === AsyncActionMode.ERROR) {
        return {
          ...state,
          isLoading: false,
          error: action.error,
        }
      }
      break
    case ActionType.DELETE_USER_GROUP:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isLoading: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        const update = (parent, items) => {
          if (items && items.length > 0) {
            for (let child of items) {
              if (child.id === action.id.id) {
                parent.children = undefined
              }
              else if (child.children) {
                update(child, child.children)
              }
            }
          }
          else {
            parent.children = undefined
          }
        }

        let children = state.data?.children ? state.data.children : []
        update(state.data, children)
        const treeData = state.data ? {...state.data, children: children} : state.data

        return {
          ...state,
          isLoading: false,
          data: treeData
        }
      }
      if (action.mode === AsyncActionMode.ERROR) {
        return {
          ...state,
          isLoading: false,
          error: action.error,
        }
      }
      break
    case ActionType.UPDATE_USER_GROUP:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isLoading: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        return {
          ...state,
          isLoading: false,
          data: action.data,
        }
      }
      if (action.mode === AsyncActionMode.ERROR) {
        return {
          ...state,
          isLoading: false,
          error: action.error,
        }
      }
      break

    case ActionType.UPDATE_USERS_IN_GROUP:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isLoading: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        const treeData = {
          ...action.data, users: action.data.users, roles: [], customer: action.parent
        }
        const update = (items) => {
          if (items && items.length > 0) {
            for (let child of items) {
              if (action.data && child.id === action.data.id) {
                child.users = action.data.users
              }
              else if (child.children) {
                update(child.children)
              }
            }
          }
          else {
            children = [treeData]
          }
        }

        let children = state.data?.children ? state.data.children : []
        update(children)

        const updated = state.data ? {...state.data, children: children} : state.data

        return {
          ...state,
          isLoading: false,
          data: updated
        }
      }
      if (action.mode === AsyncActionMode.ERROR) {
        return {
          ...state,
          isLoading: false,
          error: action.error,
        }
      }
      break
    case ActionType.UPDATE_ROLES_IN_GROUP:
      if (action.mode === AsyncActionMode.REQUEST) {
        return { ...state, isLoading: true }
      }
      if (action.mode === AsyncActionMode.RESPONSE) {
        const treeData = {
          ...action.data, users: [], roles: action.data.roles, customer: action.parent
        }
        const update = (items) => {
          if (items && items.length > 0) {
            for (let child of items) {
              if (action.data && child.id === action.data.id) {
                child.roles = action.data.roles
              }
              else if (child.children) {
                update(child.children)
              }
            }
          }
          else {
            children = [treeData]
          }
        }

        let children = state.data?.children ? state.data.children : []
        update(children)
        const updated = state.data ? {...state.data, children: children} : state.data

        return {
          ...state,
          isLoading: false,
          data: updated
        }
      }
      if (action.mode === AsyncActionMode.ERROR) {
        return {
          ...state,
          isLoading: false,
          error: action.error,
        }
      }
      break
  }
  return state
}
