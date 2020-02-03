

var origs;
var canvas;
var ctx;

var distancePerPoint = 3;
var drawFPS = 300;
var points = [];
var timer;

function initData()
{
    distancePerPoint = 3;
    drawFPS = 30;
    origs = document.querySelectorAll('path');
    canvas = document.querySelector('#top');
    ctx = canvas.getContext('2d');
    origs_length = origs.length; 
    origs_path_count = 0;
    orig = origs[origs_path_count];
}

function startDrawingPath() {
    clearCanvas();
    points = [];
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = '#365956';
    timer = setInterval(buildPath, 30 / drawFPS);
}
  
function redrawCanvas() {
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    ctx.lineWidth = 2;
    for (var i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.stroke();
}

function clearCanvas() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function stopDrawingPath() {
    clearInterval(timer);
}

function buildPath() {
    var nextPoint = points.length * distancePerPoint;
    if(!orig){
        stopDrawingPath();
        return;
    }
    var pathLength = orig.getTotalLength();
    if (nextPoint < pathLength) {
        points.push(orig.getPointAtLength(nextPoint));
        redrawCanvas();
    }else{
        origs_path_count+=1;
        orig = origs[origs_path_count]
        points = [];
    if(origs_path_count>=origs_length)
    {
        stopDrawingPath();
    }
    }
}
