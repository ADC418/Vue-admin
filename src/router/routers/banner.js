import Layout from "@/layout/Layout"
export default  {
    path:"/banner",
    redirect:"/banner/list",
    component:Layout,
    meta:{
      title:"轮播管理",
      icon:"dessert"
    },
    children:[
      {
        path:"list",
        component:()=>import("@/views/banner/bannerList"),
        meta:{
          title:"轮播列表"
        }
      },
      {
        path:"add",
        component:()=>import("@/views/banner/bannerAdd"),
        meta:{
          title:"新增轮播"
        }
      },
    ]
  }