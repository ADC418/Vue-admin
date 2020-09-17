import Layout from "@/layout/Layout"
export default {
    path:"/topic",
    redirect:"/topic/list",
    component:Layout,
    meta:{
      title:"文章管理",
      icon:"grape"
    },
    children:[
      {
        path:"list",
        component:()=>import("@/views/topic/topicList"),
        meta:{
          title:"文章列表"
        }
      },
      {
        path:"add",
        component:()=>import("@/views/topic/topicAdd"),
        meta:{
          title:"新增文章"
        }
      },
    ]
  }