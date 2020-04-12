/*context.fillStyle = "red";
context.fillRect(10,10,100,50);
context.strokeStyle = "blue";
context.strokeRect(205, 5, 50, 50);
context.lineWidth = 5;
context.strokeRect(135, 5, 50, 50);
var cx = document.querySelector("canvas").getContext("2d");
cx.beginPath();
for (var y = 100; y < 200; y += 10) {
cx.moveTo(10, y);
cx.lineTo(90, y);
}
cx.stroke();
cx.beginPath();
cx.moveTo(150, 110);
cx.lineTo(110, 170);
cx.lineTo(190, 170);
cx.fill();
cx.beginPath();
cx.moveTo(200, 300);
cx.quadraticCurveTo(300, 200, 400, 300);
cx.lineTo(300, 200);
cx.closePath();
cx.stroke();

cx.moveTo(300, 90);
cx.bezierCurveTo(300, 10, 390, 10, 350, 90);
cx.lineTo(390, 10);
cx.lineTo(300, 10);
cx.closePath();
cx.stroke();

cx.beginPath();
cx.moveTo(400, 10);
cx.arcTo(490, 10, 490, 90, 20);
cx.moveTo(400, 10);
cx.arcTo(490, 10, 490, 90, 80);
cx.stroke();

cx.beginPath();
// center=(50,50) radius=40 angle=0 to 7
cx.arc(600, 50, 40, 0, 7);
// center=(150,50) radius=40 angle=0 to ½π
cx.arc(750, 50, 40, 0, 0.5 * Math.PI);
cx.stroke(); */

var canvas = document.querySelector("canvas");
var context = canvas.getContext("2d");

function Trapeze(x1,y1,d1,d2,h) {
    context.beginPath();
    context.moveTo(x1,y1);
    context.lineTo(x1+d1,y1);
    context.lineTo(x1+d1+(d2-d1)/2, y1+h);
    context.lineTo(x1-(d2-d1)/2, y1+h);
    context.closePath();
    context.stroke();
}

function redRhombus(x1,y1,a, color) {
    context.beginPath();
    context.fillStyle = color;
    context.moveTo(x1,y1);
    context.lineTo(x1+Math.sqrt(2*(a**2))/2, y1+Math.sqrt(2*(a**2))/2);
    context.lineTo(x1, y1+Math.sqrt(2*(a**2)));
    context.lineTo(x1-Math.sqrt(2*(a**2))/2, y1+Math.sqrt(2*(a**2))/2);
    context.fill();
    context.closePath();
}

function Zigzag(x1,y1,count,x2,y2) {
    var x = x2;
    var c = 0;
    context.beginPath();
    context.moveTo(x1,y1);
    for (var y = y1; y <=y2*count; y += y2) {
        c++;
        context.lineTo(x, y+y2);
        if(c%2 != 0)
            x = x1;
        else
            x = x2;
    }
    context.stroke();
    context.closePath();
}

function Spiral(x1,y1) {
    context.beginPath();
    context.moveTo(x1,y1);
    var step = 60;
    var increment = 2*Math.PI/step;       
    var angle = increment;

    while( angle < 10*Math.PI) {
      var x = x1 + angle * Math.cos(angle); 
      var y = y1 + angle * Math.sin(angle); 
      context.lineTo(x, y);
      angle = angle + increment;
    }
    context.stroke();
    context.closePath();
}

function Star (x1,y1) {
    context.beginPath();
    context.moveTo(x1,y1);
    context.fillStyle = "yellow";
    var controlX = x1+40;
    var controlY = y1;
    var x = x1+10;
    var y = y1-30;
    context.quadraticCurveTo(controlX, controlY, x, y);
    x +=30;
    y -=10;
    context.quadraticCurveTo(controlX, controlY, x, y);
    x +=30;
    y +=10;
    context.quadraticCurveTo(controlX, controlY, x, y);
    x +=10;
    y +=30;
    context.quadraticCurveTo(controlX, controlY, x, y);
    x -=10;
    y +=30;
    context.quadraticCurveTo(controlX, controlY, x, y);
    x -=30;
    y +=10;
    context.quadraticCurveTo(controlX, controlY, x, y);
    x -=30;
    y -=10;
    context.quadraticCurveTo(controlX, controlY, x, y);
    x =x1;
    y =y1;
    context.quadraticCurveTo(controlX, controlY, x, y);
    context.fill();
    context.stroke();
    context.closePath();

}

Trapeze(50,10,50,90,40);
redRhombus(200,10,40, "red");
Zigzag(300,10,12,400,10);
Spiral(500,50);
Star(600,50);


var results = [
    {name: "Удовлетворён", count: 1043, color: "lightblue"},
    {name: "Нейтральное", count: 563, color: "lightgreen"},
    {name: "Не удовлетворён", count: 510, color: "pink"},
    {name: "Без комментариев", count: 175, color: "silver"}
    ];

var cx = document.querySelector("canvas").getContext("2d");
var total = results.reduce(function(sum, choice) {
return sum + choice.count;
}, 0);

var currentAngle = -0.5 * Math.PI;
var centerX = 150, centerY = 250;
// Добавьте код для вывода меток
results.forEach(function(result) {
var sliceAngle = (result.count / total) * 2 * Math.PI;
cx.beginPath();
var pieRadius = Math.min(centerX, centerY);
var labelX = centerX + (pieRadius / 2) * Math.cos(currentAngle + sliceAngle/2);
var labelY = centerY + (pieRadius / 2) * Math.sin(currentAngle + sliceAngle/2);
cx.arc(centerX, centerY, 100,
currentAngle, currentAngle + sliceAngle);
currentAngle += sliceAngle;
cx.lineTo(centerX, centerY);
cx.fillStyle = result.color;
cx.fill();
cx.fillStyle = "black";
cx.font = "bold 10px Arial";
cx.fillText(result.name, labelX,labelY);
});


var x = 200;
var c = 1;
var lastTime = null;
function frame(time) {
if (lastTime != null)
updateAnimation(Math.min(100, time - lastTime) / 1000);
lastTime = time;
requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
function updateAnimation(step) {
// Ваш код
    var canvas = document.querySelector("canvas"); 
    var context = canvas.getContext("2d");
    context.beginPath();
    context.strokeStyle = "black";

    context.strokeRect(50,500,300,300);
    context.clearRect(51,501,299,299);
    context.arc(x, 650, 40, 0, 7);
    context.stroke();
    context.closePath();
    if(x+40 == 350)
        c = 0;
    if (x-40 == 50)
        c = 1;
    if (x+40 < 350 && c == 1)
        x+=1;
    else if (x-40 >50 && c == 0)
        x-=1;
}