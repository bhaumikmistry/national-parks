console.clear();

var list_path = {
  "list" : [
    {
      "d" : "M367.19 109.38L346.39 105.96",
      "id" : "hTd6BERaX",
      "strokewidth" : "0",
      "stroke" : "#000000",
      "fill" : "none"
    },
    {
      "d" : "M328.13 117.19C323.61 101.69 319.36 101.2 315.35 115.73",
      "id" : "hTd6Bsdsdsd",
      "strokewidth" : "0",
      "stroke" : "#000000",
      "fill" : "none"
    }
  ]
}

var arr=Object.entries(list_path); // this turns data into an array arr

console.log(arr);
console.log(arr[0][1][0].d);
var item = arr[0][1][0];

var holder = document.getElementById("svg_holder");

var div = document.createElement("svg");
div.setAttribute("viewBox", "0 0 500 500"); 
div.setAttribute("width","500");
div.setAttribute("height","500");

//var path = document.createElement("path");
var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
path.setAttribute("d",item.d);
path.setAttribute("id",item.id);
path.setAttribute("stroke-width",item.strokewidth);
path.setAttribute("stroke",item.stroke);
path.setAttribute("fill",item.fill);

div.appendChild(path);

// viewBox="0 0 500 500" width="500" height="500"
holder.appendChild(div)


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

console.log(origs_length);
console.log(origs);

var list_to_save = {
  "list":[]
}

var data_to_save = {
  "d" : "",
  "id" : "",
  "strokewidth" : "",
  "stroke" : "",
  "fill" : ""
}

for(var i=0; i<origs_length;i++)
{
  var temp_data = data_to_save;
  temp_data.d = origs[i].attributes.d.value;
  temp_data.id = origs[i].attributes.id.value;
  temp_data.strokewidth = "#00000";
  temp_data.fill = origs[i].attributes.fill.value;
  list_to_save.list.push(data_to_save);
  console.log(temp_data);
}

console.log(list_to_save);

function download(content, fileName, contentType) {
  var a = document.createElement("a");
  var file = new Blob([content], {type: contentType});
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}
download(JSON.stringify(list_to_save), 'json.json', 'text/plain');

///startDrawingPath();

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
  console.log(nextPoint);
  console.log(orig);
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