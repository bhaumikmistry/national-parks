console.clear();

function selectedParkByUser(park_name)
{
  data=[]
  var arr = []
  var link = 'https://raw.githubusercontent.com/bhaumikmistry/national-parks/master/docs/json/'
  var file_name = park_name + ".json";
  console.log(file_name);
  $.getJSON(link+file_name, function( data ) {
    var arr=Object.entries(data); // this turns data into an array arr
    console.log(arr[0]);
    addSvgElement(arr[0]);

    //initPaint();
    initData();
    startDrawingPath();

  }).fail(function(){
    console.log("error with file "+file_name);
  });  
}

function addSvgElement(arr){
  var list = arr[1];
  console.log(list);

  var holder = document.getElementById("svg_holder");
  while(holder.firstChild)
  {
    holder.removeChild(holder.firstChild);
  }

  var div = document.createElement("svg");

  for(var i=0;i<list.length;i++)
  {
    var item = list[i];
    div.setAttribute("viewBox", "0 0 500 500"); 
    div.setAttribute("width","500");
    div.setAttribute("height","500");

    //var path = document.createElement("path");
    var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute("d",item.d);
    path.setAttribute("id",item.id);
    path.setAttribute("stroke-width","");
    path.setAttribute("stroke","");
    path.setAttribute("fill",item.fill);


    div.appendChild(path);
  }
  holder.appendChild(div)

  initPaint(list);

}

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

// var distancePerPoint = 3;
// var drawFPS = 30;

// var origs;
// var points;
// var timer;
// var canvas;
// var ctx
// var origs_length;
// var origs_path_count;
// var orig


// function initData()
// {
//   origs = document.querySelectorAll('path');
//   points;
//   timer;
//   canvas = document.querySelector('#top');
//   ctx = canvas.getContext('2d');
//   origs_length = origs.length; 
//   origs_path_count = 0;
//   orig = origs[origs_path_count];
//   startDrawingPath();
// }




// function startDrawingPath() {
//   clearCanvas();
//   points = [];
//   ctx.lineWidth = 0.5;
//     ctx.strokeStyle = '#000';
//   timer = setInterval(buildPath, 330 / drawFPS);
// }

// function redrawCanvas() {
//   ctx.beginPath();
//   ctx.moveTo(points[0].x, points[0].y);
//   ctx.lineWidth = 2;
//   for (var i = 1; i < points.length; i++) {
//       ctx.lineTo(points[i].x, points[i].y);
//   }
//   ctx.stroke();
// }

// function clearCanvas() {
//   ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
// }

// function stopDrawingPath() {
//   clearInterval(timer);
// }

// /** Assumes that 'orig' is an SVG path */
// function buildPath() {
//   var nextPoint = points.length * distancePerPoint;
//   console.log(nextPoint);
//   console.log(orig);
//   if(!orig){
//     return;
//     stopDrawingPath();
//   }
//   var pathLength = orig.getTotalLength();
//   if (nextPoint < pathLength) {
//       points.push(orig.getPointAtLength(nextPoint));
//       redrawCanvas();
//   }else{
//     origs_path_count+=1;
//     orig = origs[origs_path_count]
//     points = [];
//     if(origs_path_count>=origs_length)
//     {
//       stopDrawingPath();
//     }
//   }
// }