// ----------------------- 原型模式 -----------------------------
const LoopImages = function(list, container) {
  this.list = list
  this.container = container
}
LoopImages.prototype.createImage = function() {
  console.log('create...')
}
LoopImages.prototype.changeImage = function() {
  console.log('next image')
}
LoopImages.prototype.getImageLength = function() {
  return this.list.length
}

const SlideLoopImage = function(list, container) {
  LoopImages.call(this, list, container)
}
Object.setPrototypeOf(SlideLoopImage.prototype, LoopImages.prototype)
SlideLoopImage.prototype.changeImage = function() {
  console.log('slide change image...')
}

const slide = new SlideLoopImage(['1.jpg', '2.jpg', '3.jpg'], 'div')
console.log(slide, slide.getImageLength())
slide.changeImage()
slide.createImage()