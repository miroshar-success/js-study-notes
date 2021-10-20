import './style.css';
import img from './images/iu.jpeg';


function createElement(str){
  const element = document.createElement('div')
  element.textContent = str;
  return element;
}
document.body.appendChild(createElement('hello world'));

// 插入图片
const Img = new Image(200,200)
Img.src = img;
document.body.appendChild(Img);

// css中使用背景图片
let bgElement = createElement('');
bgElement.className = 'iu';
document.body.appendChild(bgElement);

