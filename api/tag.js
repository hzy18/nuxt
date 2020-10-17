import {req} from '@/plugin/request'
export const getTags = () => {
      return req({
        method: "get",
        url: "/api/tags",
      })
}
