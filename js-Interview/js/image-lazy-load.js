// -------------- 图片懒加载 -----------------
const image_list = [
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F780da623-6677-4902-a061-40401ad5523a%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1691991398&t=bb390581b084761e71836c939ab1b00e',
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F24c1e1f2-8d71-4b4d-8d3e-49d5b762a3ae%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1691991398&t=318484b40787c719b6ef1da742f419e2',
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F39207812-e19e-4b8c-8f3e-edda4442f4d0%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1691991398&t=e93c0c2f79146045528a2cae6b6c315c',
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F97cee026-3391-4f67-9dc4-843f647d0757%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1691991398&t=e2891774939aa585d7074be678a80b6b',
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F381d284a-b560-448f-998c-e72cdc0d6cf8%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1691991398&t=f0a586d4b1ddd504a5aef55cdb51f7b3',
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw%2F6ad8a2f8-dfcf-4237-8939-5541cfbb843f%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1691991462&t=6b3ea4f4a86eaa065bb38602dfbcca63',
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Fb38c6d4a-84ac-49c2-bf43-540afdc3ae7d%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1691991467&t=519684925fd432d6d1ddc865cc5f04c0',
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F0625a25b-ae20-4fbf-87dd-2341d4df066d%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1691991467&t=3bffa0f8ed85ab8aa00c4534773f6e06',
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Ffc2d0889-ccfc-4613-9d5d-917ce0e35014%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1691991467&t=32cbb4ddc8091b766ff50d24a78952b5',
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Ff3ced685-bb1c-4072-a83c-52df1fc869ce%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1691991467&t=6de9ec32a751e609e5cc85a02cc094e7',
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202003%2F04%2F20200304010456_PkcZt.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1691991398&t=0cdd535d1cd32176f033303a7ba47543'
]

const createImageDomList = (list = []) => {
  list.forEach(url => {
    const img = document.createElement('img')
    img.src = 'https://cdn.onlinewebfonts.com/svg/img_514677.png'
    img.setAttribute('data-src', url)
    img.style.width = '100%'
    img.classList.add('image-item')
    document.body.appendChild(img)
  })
}
createImageDomList(image_list)

const lazyLoad = () => {
  const imageList = document.querySelectorAll('.image-item[data-src]')
  Array.from(imageList, (img) => {
    const { top } = img.getBoundingClientRect()
    console.log(top, window.innerHeight)
    if (top < window.innerHeight) {
      const url = img.getAttribute('data-src')
      // if (url) {
        img.setAttribute('src', url)
        img.removeAttribute('data-src')
      // }
    }
  })
}
lazyLoad()

window.addEventListener('scroll', lazyLoad, false)