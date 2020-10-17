//服务端加载cookieparser
const cookieParser = process.server ? require('cookieparser') : undefined
// 服务端渲染期间运行的是同一个是实例
// 为了防止数据冲突，state要定义成函数，返回数据对象
export const state = () => {
     return {
         //登录用户状态数据
          user:null
     }
}
export const  mutations = {
     setUser(state,data){
        state.user = data
     }
}
export const  actions = {
    //nuxt中的特殊action,会在服务端渲染期间自动调用 初始化容器数据，传递数据给客户端使用
   nuxtServerInit({commit},{req}){
          let user = null
          if(req.headers.cookie){
              //解析cookie字符串转化为对象
               const parsed = cookieParser.parse(req.headers.cookie)
               try{
                //解析cookie对象user对应的json字符串，转化为对象
                user  = JSON.parse(parsed.user)
               }catch(e){
                    console.log(e)
               }
          }
          commit('setUser',user)
   }
}