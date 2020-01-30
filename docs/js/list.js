
data=[]
var arr = []
var link = 'https://raw.githubusercontent.com/bhaumikmistry/national-parks/master/docs/json/'
var file_name = 'parks.json'
$.getJSON(link+file_name, function( data ) {
    var arr=Object.entries(data); // this turns data into an array arr
    addList(arr[0][1]);
    addClickListener();
});    

function addList(list)
{
    console.log(list);
    console.log(list.length);

    var holder = document.getElementById("park-list");

    for(var i = 0; i < list.length; i++)
    {
        console.log("Creating item " + list[i].name);

        var li = document.createElement("li");
        var a = document.createElement("a");
        a.setAttribute("href","#");
        a.setAttribute("id",list[i].name);
        var text = document.createTextNode(list[i].name);
        a.appendChild(text);
        li.appendChild(a);

        holder.appendChild(li);
    }

    // var li = document.createElement("li");
    // var a = document.createElement("a");
    // a.setAttribute("href","#");
    // var text = document.createTextNode("");
    // a.appendChild(text);
    // li.appendChild(a);
    //holder.appendChild(li);
}

function addClickListener(){
    console.log("Adding click Listeners");
    document.getElementById("park-list").addEventListener("click",function(e) {
        // e.target is our targeted element.
        if(e.target && e.target.nodeName == "A") {
            console.log(e.target.id + " clicked");
            selectedParkByUser(e.target.id);
        }
    });
}