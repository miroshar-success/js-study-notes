import './css/style.css';

function createElement(){
    const oDiv = document.createElement('div');
    oDiv.style.width = '100px';
    oDiv.style.height = '100px';
    oDiv.classList.add('bg');
    return oDiv;
}

document.body.appendChild(createElement());