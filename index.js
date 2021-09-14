var cvs = document.getElementById('board');
var c = cvs.getContext('2d');
cvs.height = innerHeight;
cvs.width = innerWidth;
var cvsGear = document.getElementById('gearBoard');
var cg = cvsGear.getContext('2d');
cvsGear.height = innerHeight;
cvsGear.width = innerWidth;
var outerGear = 200;
var innerGear = 150;
var a = 150;
var angle = 0;
var lineArr = [];
var t = 0;
var color = 0;
var colorIncrement = 0.2;
var timeIncrement = 0.2;
var trailPersistence = 0.2;
var mode = 'inside';
var trail = true;
var settingChanged = false;
var gear = false;
var line = false;
function draw(xp, yp) {
    c.fillStyle = `hsla(0,0%,0%,${trailPersistence * 10}%)`;
    c.fillRect(0, 0, cvs.width, cvs.height);
    let x, y;
    if (mode == 'inside') {
        x = (outerGear - innerGear) * Math.cos(innerGear / outerGear * t) + (a * Math.cos((1 - innerGear / outerGear) * t)) + cvs.width / 2
        y = (outerGear - innerGear) * Math.sin(innerGear / outerGear * t) - (a * Math.sin((1 - innerGear / outerGear) * t)) + cvs.height / 2
    } else {
        x = ((outerGear + innerGear) * Math.cos(innerGear / outerGear * t)) - (a * Math.cos((1 + innerGear / outerGear) * t)) + cvs.width / 2
        y = ((outerGear + innerGear) * Math.sin(innerGear / outerGear * t)) - (a * Math.sin((1 + innerGear / outerGear) * t)) + cvs.height / 2
    }
    if (settingChanged) {
        c.strokeStyle = `hsla(${color},50%,50%,0%)`;
        settingChanged = false;
    } else {
        c.fillStyle = c.strokeStyle = `hsla(${color},50%,50%,100%)`;
    }
    cg.clearRect(0, 0, cvsGear.width, cvsGear.height);
    if (line) {
        cg.lineWidth = 2;
        cg.strokeStyle = cg.fillStyle = 'white';
        if(mode == 'inside') {
            cg.beginPath();
            cg.moveTo(cvs.width / 2, cvs.height / 2);
            cg.lineTo(x - (a * Math.cos((1 - innerGear / outerGear) * t)),
                y + (a * Math.sin((1 - innerGear / outerGear) * t)));
            cg.lineTo(x, y);
            cg.stroke();
            console.log('hi?')
        } else {
            cg.beginPath();
            cg.moveTo(cvs.width / 2, cvs.height / 2);
            cg.lineTo(x + (a * Math.cos((1 + innerGear / outerGear) * t)),
                y + (a * Math.sin((1 + innerGear / outerGear) * t)),
                innerGear, 0, Math.PI * 2);
            cg.lineTo(x, y);
            cg.stroke();
        }
    }
    if (gear) {
        cg.lineWidth = 2;
        cg.strokeStyle = cg.fillStyle = 'white';
        cg.beginPath();
        cg.arc(cvs.width / 2, cvs.height / 2, outerGear, 0, Math.PI * 2);
        cg.stroke();
        cg.beginPath();
        cg.arc(x, y, 5, 0, Math.PI * 2);
        cg.fill();
        if (mode == 'inside') {
            cg.beginPath();
            cg.arc(x - (a * Math.cos((1 - innerGear / outerGear) * t)),
                y + (a * Math.sin((1 - innerGear / outerGear) * t)),
                innerGear, 0, Math.PI * 2);
            cg.stroke();
        } else {
            cg.beginPath();
            cg.arc(x + (a * Math.cos((1 + innerGear / outerGear) * t)),
                y + (a * Math.sin((1 + innerGear / outerGear) * t)),
                innerGear, 0, Math.PI * 2);
            cg.stroke();
        }
    }
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
    settingChanged = true;
    c.fillStyle = 'black';
    c.fillRect(0, 0, cvs.width, cvs.height);
    innerGear = Number(document.getElementById('R').value);
    outerGear = Number(document.getElementById('r').value);
    a = document.getElementById('a').value;
    colorIncrement = Number(document.getElementById('colorIncrement').value);
    timeIncrement = Number(document.getElementById('timeIncrement').value);
    trailPersistence = Number(document.getElementById('trailPersistence').value);
    mode = document.getElementById('mode').value;
    gear = document.getElementById('gear').checked;
    line = document.getElementById('line').checked;
    c.fillStyle = 'black';
    c.fillRect(0, 0, cvs.width, cvs.height);
    t = 0;
}

var sliderList = document.getElementsByClassName('slider');
for (let i = 0; i < sliderList.length; i++) {
    sliderList[i].addEventListener('input', e => {
        let preSibling = sliderList[i].previousElementSibling;
        sliderList[i].previousElementSibling.innerHTML = `${sliderList[i].previousElementSibling.getAttribute('data-title')} ${sliderList[i].value}`;
    })
}
draw();