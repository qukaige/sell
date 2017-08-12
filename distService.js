//测试

// localhost:8000?id=1   请带上id

var express = require('express');
var app = express();
var router = express.Router();


router.get('/',function(req,res,next){
  req.url('/index.html')
})


var data = require('./data.json')
var seller = data.seller
var goods = data.goods
var ratings = data.ratings
router.get('/seller',function(req,res){
  res.json({
    errno:0,
    data:seller
  })
})
router.get('/goods',function(req,res){
  res.json({
    errno:0,
    data:goods
  })
})
router.get('/ratings',function(req,res){
  res.json({
    errno:0,
    data:ratings
  })
})
app.use('/api',router)
app.use(express.static('./dist'))

var server = app.listen(8000,function(){
  var host = server.address().address
  var port = server.address().port
  console.log("qkg",host,port);
});
module.exports = app;
