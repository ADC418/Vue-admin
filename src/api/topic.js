import axios from "@/utils/serve"

//获取所有文章信息
export const getTopics=(params)=>axios.get("/topics",{
    params:{
        ...params,
        _sort:"id",
        _order:"desc"
    }
})

//添加文章
export const addTopic=data=>axios.post("/topics",data)

//删除文章信息
export const deleteTopic=id=>axios.delete(`/topics/${id}`)

//更新文章
export const patchTopic=(id,data)=>axios.patch(`/topics/${id}`,data)