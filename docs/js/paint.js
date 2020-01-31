

var origs;
var canvas;
var ctx;

function initPaint(list)
{
    console.log("Init Paint()");
    console.log(list);
    
    canvas = document.querySelector('#bottom');
    ctx = canvas.getContext('2d');

    ctx.lineWidth = 0.5;
    ctx.strokeStyle = '#DADADA';

    for(var i=0; i<list.length; i++)
    {    
        console.log(list[i].d);
        var path = new Path2D(list[i].d);
        ctx.lineWidth = 0.5;
        ctx.strokeStyle="#DADADA";
        ctx.stroke(path);
    }
}