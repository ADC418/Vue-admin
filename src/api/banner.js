import axios from "@/utils/serve"

//获取所有轮播列表 get请求
export const getBanners=params=>axios.get("/banners",{
    params:{
        ...params,
        _sort:'id',//通过id排序
        _order:'desc',//递减  asc是递增

    },
    //固定写法      get请求中和params同级
    headers:{
        authorization:localStorage.getItem("token"),//单个请求
    }
})
  
//删除轮播列表 delete请求

export const deleteBanner=id=>axios.delete(`/banners/${id}`)

//添加轮播 post
export const addBanner=msg=>axios.post("/banners",msg)

//获取单个轮播数据
export const getBanner=id=>axios.get(`/banners/${id}`)

//修改轮播(更新) peatch
export const patchBanner=(id,data)=>axios.patch(`/banners/${id}`,data)