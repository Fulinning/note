import '../../css/toast.scss'

function Toast(text, time = 1000) {
  this.text = text;
  this.time = time;
  this.init();
}

Toast.prototype.init = function () {
  var _this = this
  var toast = $(`<div class="toast">${_this.text}</div>`)
  $('body').append(toast)
  toast.fadeIn(300, function () {
    setTimeout(function () {
      toast.fadeOut(300, function () {
        toast.remove()
      })
    }, _this.time)
  })
}

export default (text, time) => {
  new Toast(text, time)
}