import axios from "@/utils/serve"

//获取所有活动信息
export const getActives = params => axios.get("/lessons", {
  params: {
    ...params,
    _sort: "id",//按id排序
    _order: "desc"
  }
})

//添加活动
export const addActive = data => axios.post("/lessons", data)

//删除活动信息 delete请求
export const deleteActive = id => axios.delete(`/lessons/${id}`)

//更新 patch/put
export const patchActive=(id,data)=>axios.patch(`/lessons/${id}`,data)