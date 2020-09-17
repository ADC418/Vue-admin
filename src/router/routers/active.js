import Layout from "@/layout/Layout"
export default  {
    path:"/active",
    redirect:"/active/list",
    component:Layout,
    meta:{
      title:"活动管理",
      // icon:"receiving"
    },
    children:[
      {
        path:"list",
        component:()=>import("@/views/active/activeList"),
        meta:{
          title:"活动列表"
        }
      },
      {
        path:"add",
        component:()=>import("@/views/active/activeAdd"),
        meta:{
          title:"新增活动"
        }
      },
    ]
  }