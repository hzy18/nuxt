module.exports = { 
    router:{
        // 自定义路由规则
        linkActiveClass:"active",
        
        extendRoutes(routes,resolve){
            //清除默认路由
            routes.splice(0)
            routes.push(...[
                {
                    path:'/',
                    // redirect: '',
                    component:resolve(__dirname,'pages/layout'),
                    children:[
                        {
                            path:"",
                            name:"home",
                            component:resolve(__dirname,'pages/home'),
                        },
                        {
                            name:"login",
                            path:"/login",
                            component:resolve(__dirname,'pages/login'),
                        },
                        {
                            name:"register",
                            path:"/register",
                            component:resolve(__dirname,'pages/login'),
                        },
                        {
                            name:"profile",
                            path:"/profile/:username",
                            component:resolve(__dirname,'pages/profile'),
                        },
                        {
                            name:"setting",
                            path:"/setting",
                            component:resolve(__dirname,'pages/setting'),
                        },
                        {
                            name:"editor",
                            path:"/editor",
                            component:resolve(__dirname,'pages/editor'),
                        },
                        {
                            name:"article",
                            path:"/article/:slug",
                            component:resolve(__dirname,'pages/article'),
                        },
                    ]
                }
            ])
            // routes.push({
            //     name:"hello",
            //     path:"/hello",
            //     component:resolve(__dirname,'pages/about.vue')
            // })
          }
    },
    plugins:['~/plugin/request.js','~/plugin/day.js'],
    server:{
        host:"0.0.0.0",
        port:80
    },
}