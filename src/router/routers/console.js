import Layout from "@/layout/Layout"
export default 
    {
        path:"/dashboard",
        redirect:"/dashboard/console",
        component:Layout,
        meta:{
          title:"Dashboard",
          icon:'menu',
        },
        children:[{
          path:"console",
          component:()=>import("@/views/dashboard/console"),
          meta:{
            title:"主控台"
          }
        }]
        
      }
