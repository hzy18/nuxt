import {req} from '@/plugin/request'
export const getProfile = (username) => {
      return req({
        method: "get",
        url: `/api/profiles/${username}`,
      })
}
