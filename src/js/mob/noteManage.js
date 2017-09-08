import note from './note.js'
import toast from './toast.js'
import waterfall from './waterfall.js'

function noteManage (data){
  this.init(data)
  this.sort()
}
noteManage.prototype.init = function(data){
  if(data){
    $('.note-ct').empty()
    data.map((element)=>{
      note(element)
    })
  }
  toast('初始化成功！')
}
noteManage.prototype.add = function(data){
  note()
}
noteManage.prototype.sort = function(){
  waterfall($('.note-ct'))
}

export default noteManage