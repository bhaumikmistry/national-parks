
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

let myMap = new Map();

var list_to_save = {
  "list":[]
}

for(var i=0; i<origs_length;i++)
{
  
  var temp_data = {
    "d" : "",
    "id" : "",
    "strokewidth" : "",
    "stroke" : "",
    "fill" : ""
  }
  temp_data.d = origs[i].attributes.d.value;
  temp_data.id = origs[i].attributes.id.value;
  console.log(temp_data);
  list_to_save.list.push(temp_data);

  myMap.set("#"+temp_data.id,i);

//   console.log(temp_data.d);
}

// console.log(list_to_save);
// console.log(myMap.keys());

/* Get all the <use></use> elements from the svg section,
iterate over all the elements and check for the 
available id in the map and get the item number in the
list to update the path with correct stroke color and width
*/
var uses = document.querySelectorAll('use');

for(var i=0;i<uses.length;i++)
{
    if(myMap.get(uses[i].href.baseVal)!=undefined)
    {
        //console.log("Valid key");
        var l = myMap.get(uses[i].href.baseVal);
        //console.log(l)
        list_to_save.list[l].stroke = uses[i].attributes.stroke.value;
        list_to_save.list[l].strokewidth = uses[i].attributes['stroke-width'].value;
        console.log(list_to_save.list[l]);
    }
}       

console.log(list_to_save.list);

function download(content, fileName, contentType) {
  var a = document.createElement("a");
  var file = new Blob([content], {type: contentType});
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}
//download(JSON.stringify(list_to_save), 'json.json', 'text/plain');
