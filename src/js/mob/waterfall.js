function Waterfall($ct) {
  this.$ct = $ct
  this.init()
  this.render()
}
Waterfall.prototype.init = function () {
  this.$item = this.$ct.children()
  this.nodeWidth = this.$item.outerWidth(true)
  this.nodeLength = parseInt($(window).width() / this.nodeWidth)
  this.nodeHeight = []
  for (var i = 0; i < this.nodeLength; i++) {
    this.nodeHeight.push(0)
  }
}
Waterfall.prototype.render = function () {
  this.$item.each((i, element) => {
    var minHeight = this.nodeHeight[0], minHeightIndex = 0
    this.nodeHeight.map((height, heightIndex) => {
      if (height < minHeight) {
        minHeight = height;
        minHeightIndex = heightIndex;
      }
    })
    $(element).css({display: 'absolute', left: minHeightIndex*this.nodeWidth, top: minHeight})
    this.nodeHeight[minHeightIndex] += $(element).outerHeight(true)
  })
}

export default ($ct)=>{
  new Waterfall($ct)
}