import toast from 'mob/toast.js'
import '../../css/normalize.scss'
import '../../css/main.scss'
import noteManage from '../mob/noteManage'


var manage

$.post('/api/note/init').done(function (ret) {
  if(ret.status === 2){
    $('.note-ct').empty()
    return
  }
  if (ret.status === 0) {
    manage = new noteManage(ret.data)
  } else {
    toast('初始化失败！')
  }
})



$('header .add').on('click', function (e) {
  e.preventDefault();
  if (manage) {
    manage.add()
  } else {
    toast('请先登录')
  }
})
$('header .sort').on('click', function (e) {
  e.preventDefault();
  if (manage) {
    manage.sort()
  } else {
    toast('请先登录')
  }
})