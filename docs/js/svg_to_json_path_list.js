
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
  temp_data.strokewidth = "#00000";
  temp_data.fill = origs[i].attributes.fill.value;
  console.log(temp_data);
  list_to_save.list.push(temp_data);
  console.log(temp_data.d);
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
