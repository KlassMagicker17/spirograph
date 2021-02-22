var cvs = document.getElementById('board');
var c = cvs.getContext('2d');
cvs.height = innerHeight;
cvs.width = innerWidth;
var bigGear = 55;
var smallGear = 300;
var a = 30;
var angle = 0;
var lineArr = [];
var t = 0;
var color = 0;
var colorIncrement = 0.2;
var timeIncrement = 0.2;
var mode = 'inside';
function draw(xp, yp) {
    c.fillStyle = 'hsla(0,0%,0%,2%)';
    c.fillRect(0, 0, cvs.width, cvs.height);
    let x, y;
    if(mode == 'inside') {
        x = (smallGear - bigGear) * Math.cos(bigGear / smallGear * t) + a * Math.cos((1 - bigGear / smallGear) * t) + cvs.width / 2
        y = (smallGear - bigGear) * Math.sin(bigGear / smallGear * t) + a * Math.sin((1 - bigGear / smallGear) * t) + cvs.height / 2
    } else {
        x = (smallGear - bigGear) * Math.cos(bigGear / smallGear * t) + a * Math.cos((1 + bigGear / smallGear) * t) + cvs.width / 2
        y = (smallGear - bigGear) * Math.sin(bigGear / smallGear * t) + a * Math.sin((1 + bigGear / smallGear) * t) + cvs.height / 2
    }
    c.fillStyle = c.strokeStyle = `hsla(${color},50%,50%,100%)`;
    c.lineWidth = 2;
    c.beginPath();
    c.arc(x, y, 1, 0, Math.PI * 2);
    c.fill();
    c.beginPath();
    c.moveTo(x, y);
    c.lineTo(xp, yp);
    c.stroke();
    t += timeIncrement;
    color += colorIncrement;
    if (color >= 360) {
        color = 0;
    }
    requestAnimationFrame(() => {
        draw(x, y);
    });
}
function rerun() {
    c.fillStyle = 'black';
    c.fillRect(0,0,cvs.width,cvs.height);
    bigGear = document.getElementById('R').value;
    smallGear = document.getElementById('r').value;
    a = document.getElementById('a').value;
    colorIncrement = Number(document.getElementById('colorIncrement').value);
    timeIncrement = Number(document.getElementById('timeIncrement').value);
    mode = document.getElementById('mode').value;
    c.fillStyle = 'black';
    c.fillRect(0,0,cvs.width,cvs.height);

}

var sliderList = document.getElementsByClassName('slider');
for (let i = 0; i < sliderList.length; i++) {
    sliderList[i].addEventListener('input', e => {
        let preSibling = sliderList[i].previousElementSibling;
        sliderList[i].previousElementSibling.innerHTML = `${sliderList[i].previousElementSibling.getAttribute('data-title')} ${sliderList[i].value}`;
    })
}
draw();