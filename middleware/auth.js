// 验证是否登陆的中间件  路由渲染之前自动调用 想保护那个页面就把中间件加给对应页面
export default function({store,redirect}){
      if(!store.state.user){
        return redirect('/login')
      }
}