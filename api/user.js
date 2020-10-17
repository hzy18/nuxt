import {req} from '@/plugin/request'
export const login = data => {
      return req({
        method: "post",
        url: "/api/users/login",
        data
      })
}
export const logout = data => {
  return req({
    method: "post",
    url: "/api/users/login",
    data
  })
}
export const register = data => {
    return req({
      method: "post",
      url: "/api/users",
      data
    })
}

export const follow = username => {
  return req({
    method: "post",
    url: `/api/profiles/${username}/follow`,
  })
}
export const unFollow = username => {
  return req({
    method: "delete",
    url: `/api/profiles/${username}/follow`,
  })
}
export const favorite = slug => {
  return req({
    method: "post",
    url: `/api/articles/${slug}/favorite`,
  })
}
export const unFavorite = slug => {
  return req({
    method: "delete",
    url: `/api/articles/${slug}/favorite`,
  })
}

export const updateUser = data => {
  return req({
    method: "put",
    url: "/api/user",
    data
  })
}