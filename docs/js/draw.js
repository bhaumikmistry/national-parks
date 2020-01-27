console.clear();

const PI = Math.PI,
PI2 = PI * 2,
RATE = 30,
CVS1 = document.querySelector('#top'),
CVS2 = document.querySelector('#bottom'),
CTX1 = CVS1.getContext('2d'),
CTX2 = CVS2.getContext('2d'),
CVS_DI = CVS1.width,
// How many cols/rows
COUNT = 8,
// Padding
PEN_PAD = CVS_DI * 0.025,
// Radius
PEN_RAD = CVS_DI / ((COUNT + 1) * 2),
// Stroke line width
STROKE = 1,
// Indicator radius
TIP_RAD = 2,
// Coloring
COLOR = '#000',
COLOR_OFF = '#343';

var distancePerPoint = 3;
var drawFPS = 30;

var origs = document.querySelectorAll('path');
var points;
var timer;
var canvas = document.querySelector('#top');
var ctx = canvas.getContext('2d');
var origs_length = origs.length; 
var origs_path_count = 0;

var orig = origs[origs_path_count];

startDrawingPath();

function startDrawingPath() {
  clearCanvas();
  points = [];
  ctx.lineWidth = 0.5;
    ctx.strokeStyle = '#000';
  timer = setInterval(buildPath, 330 / drawFPS);
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

/** Assumes that 'orig' is an SVG path */
function buildPath() {
  var nextPoint = points.length * distancePerPoint;
  if(!orig){
    return;
    stopDrawingPath();
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