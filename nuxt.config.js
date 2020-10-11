module.exports = { 
    router:{
        // 自定义路由规则
        extendRoutes(routes,resolve){
            //清除默认路由
            routes.splice(0)
            routes.push(...[
                {
                    path:'/',
                    component:resolve(__dirname,'pages/layout'),
                    children:[
                        {
                            path:"",
                            component:resolve(__dirname,'pages/home'),
                        }
                    ]
                }
            ])
            // routes.push({
            //     name:"hello",
            //     path:"/hello",
            //     component:resolve(__dirname,'pages/about.vue')
            // })
          }
    }
}