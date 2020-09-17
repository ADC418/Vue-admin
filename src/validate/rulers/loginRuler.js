//登录的表单验证
export default{
        username: [
          { required: true, message: "请输入用户名", tigger: "blur" },
          {
            validator:(rule, value, callback)=> {
              //console.log(rule);
             // console.log(value); //value就是用户在输入框中输入的值
              const tag = /^[a-zA-Z0-9_]{5,15}$/;
              //js中的验证方法 test() 、match()  用于检测一个字符串是否匹配某个模式.
              if (value.match(tag)) {
                 callback();
              }else{
                callback(new Error("用户名最短5个字符最长不超过16个字符"))
              }
             
            }
          }
        ],
        password: [
          { required: true, message: "请输入密码", tigger: "blur" },
          {
            validator(rule,value,callback){
              const tag=/^[a-zA-Z\d_]{4,}$/
              if(value.match(tag)){
                callback()
              }else{
                callback(new Error("密码是4位"))
              }
            }
          }
          ]
      }
