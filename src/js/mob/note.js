import toast from './toast.js'
import '../../css/note.scss'
import waterfall from './waterfall.js'

function Note(data) {
  this.getData(data)
  this.createNote()
  this.setStyle()
  this.bindEvent()
}
Note.prototype = {
  colors: [
    ['#ea9b35', '#efb04e'],
    ['#dd598b', '#e672a2'],
    ['#eee34b', '#f2eb67'],
    ['#c24226', '#d15a39'],
    ['#c1c341', '#d0d25c'],
    ['#3f78c3', '#5591d2']
  ],
  defaultData: {
    id: '',
    $ct: $('.note-ct'),
    text: 'input here'
  },
  getData: function (data) {
    this.data = $.extend({}, this.defaultData, data || {})
    if (this.data.id) this.id = this.data.id
  },
  createNote: function () {
    this.$note = $(`<div class="note">
      <div class="note-head"><span class="delete">&times;</span></div>
      <div class="note-main" contenteditable="true"></div>
      </div>`)
    this.$note.find('.note-main').text(this.data.text)
    this.data.$ct.append(this.$note)
  },
  setStyle: function () {
    var i = Math.floor(Math.random() * 6)
    this.$note.find('.note-head').css('background', this.colors[i][0])
    this.$note.find('.note-main').css('background', this.colors[i][1])
  },
  bindEvent: function () {
    var _this = this
    var $noteHead = this.$note.find('.note-head')
    var $noteMain = this.$note.find('.note-main')
    var $note = this.$note

    // $noteHead.on('mousedown', function (e) {
    //   var evtX = e.pageX - $note.offset().left,   //evtX 计算事件的触发点在 dialog内部到 dialog 的左边缘的距离
    //     evtY = e.pageY - $note.offset().top;
    //   $note.addClass('moving').data('evtPos', { x: evtX, y: evtY }); //把事件到 dialog 边缘的距离保存下来
    // })
    // $noteHead.on('mouseup', function () {
    //   $note.removeClass('moving').removeData('pos');
    // });

    // $('body').on('mousemove', function (e) {
    //   $('.moving').length && $('.moving').offset({
    //     top: e.pageY - $('.moving').data('evtPos').y,    // 当用户鼠标移动时，根据鼠标的位置和前面保存的距离，计算 dialog 的绝对位置
    //     left: e.pageX - $('.moving').data('evtPos').x
    //   });
    // });
    $noteHead.find('.delete').on('click',function(){
      if(!_this.id){
        $note.remove()
      }else{
        $.post('/api/note/delete',{id:_this.id}).done(function(ret){
          if(ret.status === 0){
            toast('删除成功！')
            $note.remove()
          }else{
            toast('删除失败！')
          }
        })
      }
    })

    $noteHead.on('mousedown', function (e) {
      var mouseX = e.pageX - _this.$note.offset().left
      var mouseY = e.pageY - _this.$note.offset().top
      $note.addClass('moving').data('mouse', { X: mouseX, Y: mouseY })
    })
    $(window).on('mousemove', function (e) {
      if ($note.hasClass('moving')) {
        $('.moving').offset({
          left: e.pageX - $note.data('mouse').X,
          top: e.pageY - $note.data('mouse').Y
        })
      }
    })
    $(window).on('mouseup', function (e) {
      $note.removeClass('moving').removeData('mouse')
    })
    $noteMain.on('focus', function () {
      if ($noteMain.text() === 'input here') { $noteMain.text('') }
      $noteMain.data('before', $noteMain.text())
    })
    $noteMain.on('blur', function () {
      if ($noteMain.data('before') !== $noteMain.text()) {
        if(_this.id){
          _this.editNote({id:_this.id,text:$noteMain.text()})
        }else{
          _this.addNote($noteMain.text())
        }
      }
    })
  },
  addNote: function (text) {
    var _this = this
    $.post('/api/note/add',{text}).done(function(ret){
      if(ret.status === 0){
        _this.id = ret.id
        waterfall($('.note-ct'))        
        toast('添加成功！')
      }else{
        if(ret.err){
          toast(err)
        }else{
          toast('添加失败！')
        }
      }
    })
  },
  editNote:function(data){
    var _this = this
    $.post('/api/note/edit',{
      id: data.id,
      text: data.text
    }).done(function(ret){
      if(ret.status === 0){
        toast('修改成功！')
      }else{
        toast('修改失败！')
      }
    })
  }

}

export default (data) => {
  new Note(data)
}