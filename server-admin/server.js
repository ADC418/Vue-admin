const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

const COS = require('cos-nodejs-sdk-v5');

const jwt = require('jsonwebtoken')
server.use(jsonServer.bodyParser)
/* router.render = (req, res) => {
  res.jsonp({
    code: 200,
    msg: "请求成功",
    data: res.locals.data
  })
} */

const cos = new COS({
  SecretId: 'AKIDawXsxlzCaqqoWwKAtThhfNp0uX2NiRFw',
  SecretKey: 'e3GtTm1zh8HApPjpfEWXIqFOV0ECwKUV'
});

const fs = require('fs')

const multer = require('multer')
 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './static/upload')
  },
  filename: function (req, file, cb) {
    cb(null, "pic_" + Date.now() + '.' + file.mimetype.split('/')[1])
  }
})
const upload = multer({storage})
server.use(upload.any())
server.use(middlewares)
server.post('/token', function (req, res, next) {
  // console.log(req.body)
  const {username, password} = req.body
  const token = jwt.sign({username}, 'auth', {
    expiresIn: '2h'
  })

  res.send({
    token,
    username
  })
})

server.post('/upload', function (req, res, next) {
  const file = req.files[0]
  cos.putObject({
    Bucket: 'kassing-1251951752',
    Region: 'ap-shanghai',
    Key: file.filename, 
    StorageClass: 'STANDARD',
    Body: fs.createReadStream(file.path), // 上传文件对象
    
  }, function(err, data) {
    // res.send(err || data);
    if (err) res.send(err)
    else res.send({
      code: data.statusCode,
      data: data.Location
    })
  })
})

server.use(function (req, res, next) {
  let token = req.headers.authorization || ""
  jwt.verify(token, 'auth', function (err, decode) {
    console.log(err)
    if (err) {
      res.status(401).send({
        msg: 'token出错'
      })
    } else {
      next()
    }
  })
})


server.get('/auth', function (req, res) {
  res.send({
    msg: '验证成功'
  })
})



server.use(router)
 

server.listen(3000, () => {
  console.log('JSON Server is running')
})