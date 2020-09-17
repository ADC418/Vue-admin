import loginRuler from "@/validate/rulers/loginRuler"

//创建一个总的ruler.js文件，导出所有的规则，引入时，引用该文件即可

//导出多个时，不以变量导出（export const xx=xxx），需要加 {}

export {
    loginRuler
}