import './css/style.css';
import beauty from './wq.jpg';
import print from './print.js';

const oBtn = document.createElement('button');
oBtn.textContent = 'Click me and check the console';
oBtn.onclick = print;

function createElement(){
    const oDiv = document.createElement('div');
    oDiv.style.width = '150px';
    oDiv.style.height = '100px';
    oDiv.classList.add('bg');
    return oDiv;
}

const Img = new Image(250,200);
Img.src = beauty;

document.body.appendChild(createElement());
document.body.appendChild(Img);
document.body.appendChild(oBtn);