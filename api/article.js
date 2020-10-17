import {req} from '@/plugin/request'
export const getArticles = params => {
      return req({
        method: "get",
        url: "/api/articles",
        params
      })
}
export const getFeedArticles = params => {
  return req({
    method: "get",
    url: "/api/articles/feed",
    params
  })
}
export const addFavorite = slug => {
  return req({
    method: "post",
    url: `/api/articles/${slug}/favorite`,
  })
}
export const deleteFavorite = slug => {
  return req({
    method: "delete",
    url: `/api/articles/${slug}/favorite`,
  })
}
export const getArticleDetail = slug => {
  return req({
    method: "get",
    url: `/api/articles/${slug}`,
  })
}

export const getCommons = slug => {
  return req({
    method: "get",
    url: `/api/articles/${slug}/comments`,
  })
}

export const postCommons = (slug,comment) => {
  return req({
    method: "post",
    url: `/api/articles/${slug}/comments`,
    data:{
      comment: {
        body: comment
      }
    }
  })
}
export const publishArticles = data => {
  return req({
    method: "post",
    url: `/api/articles`,
    data:{
      article: data
    }
  })
}
export const updateArticles = (data,slug) => {
  return req({
    method: "put",
    url: `/api/articles/${slug}`,
    data:{
      article: data
    }
  })
}
export const deleteArticles = slug => {
  return req({
    method: "DELETE",
    url: `/api/articles/${slug}`,
  })
}
