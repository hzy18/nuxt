// axios封装
import axios from 'axios'
export const req = axios.create({
    baseURL: "https://conduit.productionready.io"
})
//通过插件获取上下文对象
export default ({store}) => {
    //请求拦截
    req.interceptors.request.use(
        config => {
            if(store.state.user){
                config.headers.Authorization = `Token ${store.state.user.token}`  //请求头加上token
            }
            return config
           
        },
        err => {
            return Promise.reject(err)
        })
}

