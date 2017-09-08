var express = require('express');
var router = express.Router();
var note = require('../model/node.js');

/**
 * api/note/init 
 * res : {status,data:{id,text}}
 * 
 * api/note/add
 * req : text 
 * res : {status,id}
 * 
 * api/note/edit
 * req : {id,text}
 * res : {status}
 * 
 * api/note/delete
 * req: id
 * res: {status}
 */



/* GET users listing. */
router.post('/note/init', function(req, res, next) {
  if(!req.session.user){
    res.send({status:2})
    return
  }
  note.findAll({raw:true,where:{uid:req.session.user.id}}).then(function(data){
    res.send({status:0,data})
  }).catch(function(err){
    res.send({status:1})
  })
});
router.use('/note/add', function(req, res, next) {
  if(!req.session.user){
    res.send({status:1,err:'请先登录！'})
    return
  }
  note.create({text:req.body.text,uid:req.session.user.id}).then(function(data){
    res.send({status:0,id:data.id})
  })
});
router.post('/note/edit', function(req, res, next) {
  console.log(req)
  note.update({text:req.body.text},{where:{id:req.body.id,uid:req.session.user.id}}).then(function(){
    res.send({status:0})
  }).catch(function(){
    res.send({status:1})
  })
});
router.post('/note/delete', function(req, res, next) {
  note.destroy({where:{id:req.body.id,uid:req.session.user.id}}).then(function(){
    res.send({status:0})
  }).catch(function(){
    res.send({status:1})
  })
});
module.exports = router;
