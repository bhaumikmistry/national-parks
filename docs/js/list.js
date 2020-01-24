
console.log("list js");

document.getElementById("park-list").addEventListener("click",function(e) {
    // e.target is our targeted element.
    if(e.target && e.target.nodeName == "A") {
        console.log(e.target.id + " was clicked");
    }
});

data=[]
var arr = []
var link = 'https://raw.githubusercontent.com/bhaumikmistry/receipts-to-the-moon/master/docs/json/list.json'
$.getJSON(link, function( data ) {
    var arr=Object.entries(data); // this turns data into an array arr
    console.log(data)
    console.log(arr)
});    
