import axios from "@/utils/serve"

export const login = data => axios.post("/token", data)

//验证 token
export const auth=()=>axios.get("/auth")